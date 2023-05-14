import { AppKoaContext, AppRouter } from 'types';

import { imageService } from 'resources/image';

async function handler(ctx: AppKoaContext) {
  const images = await imageService.find({});

  ctx.body = images?.results ?? [];
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
