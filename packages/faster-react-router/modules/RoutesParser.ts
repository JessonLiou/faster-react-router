import { MatchedRoute, UserConfigRoute } from "../types";

const URL_SEPARATOR = '/';

export class RoutesParser {
    pathMap: {[name: string]: UserConfigRoute} = {};

    constructor(routes: UserConfigRoute[]) {
        this.parse(routes);
    }

    addRoutes = (routes: UserConfigRoute[]) => {
        this.parse(routes);
    }

    parse = (routes: UserConfigRoute[], flush = false) => {
        if (flush) this.pathMap = {};

        routes.forEach((route: UserConfigRoute) => {
            if (!route.path) return;

            this.pathMap[route.path] = route;
            if (route.children && route.children.length) {
                this.parse(route.children);
            }
        })
    }

    getRouteByPath = (path: string) => {
        const route = this.pathMap[path] || null;
        if (!route) return null;

        return route;
    }

    getRealRouteByPath = (path: string) => {
        const route = this.pathMap[path] || null;
        if (!route) return null;

        if (route.redirect) {
            return this.getRealRouteByPath(route.redirect);
        }

        return route;
    }

    getMathchedRoutes = (path: string): MatchedRoute[] => {
        if (!path) return [];

        let pathArr = path.substr(1).split(URL_SEPARATOR);

        pathArr[0] = `${URL_SEPARATOR}${pathArr[0]}`;

        const result: MatchedRoute[] = [];

        for (let i = 0; i < pathArr.length; i++) {
            const parentPath = pathArr.slice(0, i + 1).join(URL_SEPARATOR);
            const parent: UserConfigRoute = this.getRealRouteByPath(parentPath);
            if (!parent) continue;

            result.push({
                path: parent.path,
                component: parent.component,
                meta: parent.meta || {}
            });
        }

        return result;
    }
}
