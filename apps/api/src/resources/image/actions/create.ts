import path from 'path';
import { z } from 'zod';
import multer from '@koa/multer';

import { AppKoaContext, AppRouter, Next } from 'types';
import { validateMiddleware } from 'middlewares';
import { cloudStorageService } from 'services';

import { imageService } from 'resources/image';

const upload = multer();

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { file } = ctx.request;

  ctx.assertError(file, 'File is required');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { file } = ctx.request;
  const { title, description } = ctx.validatedData;

  const fileExt = path.extname(file.originalname);
  const fileTitle = title.replace(/\s+/g, '_');
  const fileName = `${Date.now().toString(16)}_${fileTitle}${fileExt}`;

  const { Location } = await cloudStorageService.uploadPublic(fileName, file);

  const image = await imageService.insertOne({
    title,
    description,
    image: Location,
  });

  ctx.body = image;
}

export default (router: AppRouter) => {
  router.post(
    '/',
    upload.single('file'),
    validateMiddleware(schema),
    validator,
    handler,
  );
};
