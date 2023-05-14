export enum ScopeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum LayoutType {
  MAIN = 'MAIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum RoutePath {
  Home = '/',

  Admins = '/admins',
  Pictures = '/pictures',

  SignIn = '/sign-in',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  [RoutePath.Home]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Admins]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Pictures]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },

  [RoutePath.SignIn]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },

  [RoutePath.NotFound]: {},
};
