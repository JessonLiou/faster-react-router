import Router from "../modules/Router";

export enum RouteGuardType {
  BEFORE_LEAVE = 'beforeLeave',
  AFTER_LEAVE = 'afterLeave',
}

export type Location = {
  pathname: string,
  [key: string]: any,
};

export enum HistoryType {
  HASH = 'hash',
  BROWSER = 'browser',
  MEMORY = 'memory'
}

export interface RouteQuery {
  redirect?: string,
  [key: string]: any;
}

export interface RouteParams {
  [key: string]: any;
}

export interface MatchedRoute {
  path: string,
  meta?: RouteMeta,
  component?: ReactAllComponentType,
  child?: MatchedRoute,
}

export interface MatchedRouteArray extends Array<MatchedRoute> {
}

export interface Route {
  pathname: string,
  search: string,
  isReplace?: boolean,
  matched: MatchedRoute | null,
}

export interface RouterOptions {
  name?: string,
  basename?: string,
  mode?: HistoryType,
  routes?: UserConfigRoute[],
  history?: any,
  fallback?: string | FallbackRoute,
}

export interface CommonRoute {
  path: string,
  name?: string,
  redirect?: string,
  [key: string]: any
}

export interface FallbackRoute {
  name?: string,
  redirect?: string,
  component?: ReactAllComponentType,
  meta?: RouteMeta,
  [key: string]: any
}

export interface RouteMeta {
  [key: string]: any;
}

export type ReactAllComponentType<P = any> = React.ComponentType<P>|React.ForwardRefExoticComponent<P>;

export interface UserConfigRoute extends CommonRoute {
  exact?: boolean,

  children?: Array<UserConfigRoute>,
  component?: ReactAllComponentType,
  meta?: RouteMeta,
  child?: UserConfigRoute,
}

export type RouteChangePayload = {
  to: Route
};

export interface RouterMoreOptions {
  routes?: UserConfigRoute[],
}

export type RouteNextFn = (ok?: Function, ...args: any[]) => void;

export interface RouteBeforeGuardFn {
  (to: Route, from: Route | null, next: RouteNextFn, options?: { route?: MatchedRoute, router?: Router }): void;
  instance?: any,
  route?: MatchedRoute;
  global?: boolean;
}

export interface RouteAfterGuardFn {
  (to: Route, from: Route | null, route?: MatchedRoute): void;
  instance?: any,
  route?: MatchedRoute;
  global?: boolean;
  update?: boolean;
}

export type RouterViewRenderFn = (route: UserConfigRoute | null) => ReactAllComponentType;

export interface RouterParserOptions {
  fallback?: string | FallbackRoute,
}
