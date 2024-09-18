import React from "react";

import Router from "./Router";
import { MatchedRoute, Route, RouteGuardType, RouterViewRenderFn, UserConfigRoute } from "../types";
import { isFunction } from "./utils";
import RouterContext from "./RouterContext";

interface RouterViewProps {
    router: Router,
    viewRender?: RouterViewRenderFn;
}

interface RouterViewState {
    currentRoute: UserConfigRoute | null,
}

class RouterView extends React.Component<RouterViewProps, RouterViewState> {
    router: Router;
    routeCompRef: {current?: any} = React.createRef();
    _reactInternalFiber: any;
    _routerViewFlag: boolean = true;
    _isTop: boolean = true;

    constructor(props: RouterViewProps) {
        super(props);

        this.router = props.router;

        this.state = {
            currentRoute: null,
        };

        this.router.addRouteChangeListener(this.routeChange);
    }

    componentDidMount () {
        const to: Route | null = this.router.getCurrentRoute();

        if (!to) return;

        this.routeChange(to);
    }

    routeChange = (to: Route) => {
        const currentRouteComp: any = this.routeCompRef.current;

        // handle nested routes
        let depth = 0;

        let parent = this._reactInternalFiber ? this._reactInternalFiber.return : this.__v.__;
        while (parent) {
            if ((parent.stateNode || parent.__c)?._routerViewFlag) depth++;

            parent = parent.return || parent.__;
        }

        this._isTop = !depth;

        let currentMatched: MatchedRoute | null | undefined = null;

        let tmpMatched: MatchedRoute | null | undefined = null;
        for (let i = 0; i <= depth; i++) {
            if (!to.matched) break;

            tmpMatched = tmpMatched ? tmpMatched.child : to.matched;

            if (i === depth) {
                currentMatched = tmpMatched;
            }
        }

        const next = () => {
            this.setState({
                currentRoute: Object.assign({}, to, { matched: currentMatched }),
            }, () => {
                this.handleRouteGuard(currentRouteComp, RouteGuardType.AFTER_LEAVE, null, to);
            });
        }

        this.handleRouteGuard(currentRouteComp, RouteGuardType.BEFORE_LEAVE, next, to);
    }

    handleRouteGuard = (
        target: any,
        type: RouteGuardType,
        next: Function | null | undefined,
        ...args
    ) => {
        if (!target) {
            next && next();
            return;
        }

        if (!isFunction(target[type])) {
            next && next();
            return;
        };

        target[type](...args, next);
    }

    render() {
        const { currentRoute } = this.state;
        const { viewRender } = this.props;

        let viewContent: any = null;

        if (viewRender) {
            viewContent = viewRender(currentRoute);
        } else if (currentRoute && currentRoute.matched && currentRoute.matched.component) {
            const RouteComponent = currentRoute.matched.component;
            viewContent = <RouteComponent ref={this.routeCompRef} />
        }

        if (this._isTop) {
            return (
                <RouterContext.Provider
                    value={{
                        router: this.router,
                        location: currentRoute,
                    }}
                >
                    {viewContent}
                </RouterContext.Provider>
            );
        }

        return viewContent;
    }
}
export default RouterView;
