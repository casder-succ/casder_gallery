import { routeUtil } from 'utils';

import list from './actions/list';
import remove from './actions/remove';
import create from './actions/create';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  list,
  remove,
  create,
]);

export default {
  publicRoutes,
  privateRoutes,
};
