import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';

import { sceneService } from 'resources/scene';

const schema = z.object({
  pictureId: z.string(),
  text: z.string(),
  zoom: z.number(),
  coordinates: z.object({
    coordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    fullCoordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    convertedCoordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
  }),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { coordinates, zoom, text, pictureId } = ctx.validatedData;

  const scene = await sceneService.insertOne({
    pictureId,
    text,
    zoom,
    coordinates,
  });

  ctx.body = scene;
}

export default (router: AppRouter) => {
  router.post(
    '/',
    validateMiddleware(schema),
    handler,
  );
};
