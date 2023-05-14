import { AppKoaContext, AppRouter, Next } from 'types';

import { sceneService } from 'resources/scene';

type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<never, Request>, next: Next) {
  const { id } = ctx.request.params;

  const isExists = await sceneService.exists({
    _id: id,
  });

  ctx.assertError(isExists, 'Scene not found');

  await next();
}

async function handler(ctx: AppKoaContext<never, Request>) {
  const { id } = ctx.request.params;

  const scene = await sceneService.deleteOne({
    _id: id,
  });

  ctx.body = scene;
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
