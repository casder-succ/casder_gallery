import { routeUtil } from 'utils';

import create from './actions/create';
import list from './actions/list';
import get from './actions/get';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([
  list,
  get,
]);

const privateRoutes = routeUtil.getRoutes([
  create,
  remove,
]);

export default {
  publicRoutes,
  privateRoutes,
};
