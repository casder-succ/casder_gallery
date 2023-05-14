import { AppKoaContext, AppRouter } from 'types';

import { sceneService } from 'resources/scene';

async function handler(ctx: AppKoaContext) {
  const { pictureId } = ctx.request.query;
  
  const images = await sceneService.find({
    pictureId,
  });

  ctx.body = images?.results ?? [];
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
