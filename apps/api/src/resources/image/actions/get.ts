import { AppKoaContext, AppRouter, Next } from 'types';

import { imageService } from 'resources/image';

type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<never, Request>, next: Next) {
  const { id } = ctx.request.params;

  const isExists = await imageService.exists({
    _id: id,
  });

  ctx.assertError(isExists, 'Image not found');

  await next();
}

async function handler(ctx: AppKoaContext<never, Request>) {
  const { id } = ctx.request.params;
  
  const image = await imageService.findOne({
    _id: id,
  });

  ctx.body = image;
}

export default (router: AppRouter) => {
  router.get('/:id', validator, handler);
};
