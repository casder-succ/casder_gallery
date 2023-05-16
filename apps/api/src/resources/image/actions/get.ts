import { AppKoaContext, AppRouter, Next } from 'types';

import { DATABASE_DOCUMENTS } from 'app.constants';

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

  ctx.assertClientError(isExists, {
    message: 'Image not found',
  }, 404);

  await next();
}

async function handler(ctx: AppKoaContext<never, Request>) {
  const { id } = ctx.request.params;
  
  const [image] = await imageService.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: DATABASE_DOCUMENTS.SCENES,
        localField: '_id',
        foreignField: 'pictureId',
        as: 'scenes',
      },
    },
  ]);

  ctx.body = image;
}

export default (router: AppRouter) => {
  router.get('/:id', validator, handler);
};
