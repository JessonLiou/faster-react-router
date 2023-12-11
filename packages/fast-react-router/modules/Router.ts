import { HistoryType, Location, MatchedRoute, Route, RouteAfterGuardFn, RouteBeforeGuardFn, RouterMoreOptions, RouterOptions, UserConfigRoute } from "../types/index";
import { createBrowserHistory, createHashHistory } from "history";
import { RoutesParser } from "./RoutesParser";

let idSeed = 1;

class Router {
    mode: HistoryType = HistoryType.HASH;

    basename: string = '';

    name: string = '';

    routes: UserConfigRoute[] = [];

    beforeEachGuards: RouteBeforeGuardFn[] = [];

    afterUpdateGuards: RouteAfterGuardFn[] = [];

    beforeResolveGuards: RouteAfterGuardFn[] = [];

    afterEachGuards: RouteAfterGuardFn[] = [];

    history: any;

    routesParser: RoutesParser;

    routeChangeListeners: Function[] = [];

    protected id: number;

    currentLocation: Location;

    constructor(options: RouterOptions) {
        this.id = idSeed++;

        this._initRouter(options);
    }

    _initRouter(options: RouterOptions) {
        // Step 1: normalize options.
        let { name, mode } = options;
        if (name != null) this.name = name;
        if (mode != null) this.mode = mode;
        this.routesParser = new RoutesParser(options.routes || []);

        // Step 2: create history by mode.
        if (!options.history) {
            const historyOptions = {};
            switch (this.mode) {
                case HistoryType.BROWSER:
                    this.history = createBrowserHistory(historyOptions);
                    break;
                default: this.history = createHashHistory(historyOptions);
            }
        } else {
            this.history = options.history;
        }

        // Step 3: listen history change.
        this.history.listen(this.historyListener);
    }

    tryToRedirect = () => {
        const route: UserConfigRoute | null = this.routesParser.getRouteByPath(this.history.location.pathname);

        if (route && route.redirect) {
            this.history.replace(route.redirect);

            return true;
        }

        return false;
    }

    getCurrentRoute = (): Route | null => {
        if (this.tryToRedirect()) return null;

        const route = this.matchRoute(this.history.location);
        return route;
    }

    matchRoute = (location: Location): Route => {
        const matchedRoutes: MatchedRoute[] = this.routesParser.getMathchedRoutes(location.pathname);

        let topMatchedRoute: MatchedRoute | null = null;
        let tmpMatchedRoute: MatchedRoute | null = null;
        matchedRoutes.forEach((route: MatchedRoute) => {
            if (!topMatchedRoute) {
                topMatchedRoute = route;
            } else if (tmpMatchedRoute) {
                tmpMatchedRoute.child = route;
            }

            tmpMatchedRoute = route;
        });

        const route: Route = {
          pathname: location.pathname,
          search: location.search,
          matched: topMatchedRoute,
        }

        return route;
    }

    historyListener = (location: Location) => {
        if (this.currentLocation && this.currentLocation.pathname === location.pathname) return;

        this.currentLocation = location;

        if (this.tryToRedirect()) return;

        const route = this.matchRoute(location);
        this.emitRouteChange(route);
    }

    use({ routes }: RouterMoreOptions) {
        if (routes) {
            this.routes = routes ? routes : [];

            this.routesParser.addRoutes(routes);
        }
    }

    emitRouteChange = (to: Route) => {
        this.routeChangeListeners.forEach((listener: Function) => {
            listener(to);
        });
    }

    beforeEach(guard: RouteBeforeGuardFn) {
        if (!guard || typeof guard !== 'function') return;
        const i = this.beforeEachGuards.indexOf(guard);
        if (~i) this.beforeEachGuards.splice(i, 1);
        guard.global = true;
        this.beforeEachGuards.push(guard);
    }

    addRouteChangeListener = (listener: Function) => {
        if (!listener || typeof listener !== 'function') return;
        const i = this.routeChangeListeners.indexOf(listener);
        if (~i) this.routeChangeListeners.splice(i, 1);
        this.routeChangeListeners.push(listener);
    }
}

export default Router;
