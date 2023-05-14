import { routeUtil } from 'utils';

import create from './actions/create';
import remove from './actions/remove';
import list from './actions/list';

const publicRoutes = routeUtil.getRoutes([
]);

const privateRoutes = routeUtil.getRoutes([
  list,
  create,
  remove,
]);

export default {
  publicRoutes,
  privateRoutes,
};
