import { z } from 'zod';

import config from 'config';
import { AppKoaContext, AppRouter, Next } from 'types';
import { validateMiddleware } from 'middlewares';

import { allowedEmailService } from 'resources/allowed-email';

const schema = z.object({
  email: z.string().email(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isExists = (await allowedEmailService.exists({ email })) || email === config.rootAdmin;

  ctx.assertError(!isExists, 'Email already exists');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { email } = ctx.validatedData;

  const allowedEmail = await allowedEmailService.insertOne({
    email,
  });

  ctx.body = allowedEmail;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), validator, handler);
};
