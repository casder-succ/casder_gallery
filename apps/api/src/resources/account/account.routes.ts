import { routeUtil } from 'utils';

import get from './actions/get';
import google from './actions/google';

const publicRoutes = routeUtil.getRoutes([
  google,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
]);

export default {
  publicRoutes,
  privateRoutes,
};
