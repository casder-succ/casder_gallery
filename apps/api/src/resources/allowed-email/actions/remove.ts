import { AppKoaContext, AppRouter, Next } from 'types';

import { allowedEmailService } from 'resources/allowed-email';
import { userService } from 'resources/user';

type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<never, Request>, next: Next) {
  const isExists = await allowedEmailService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isExists, 'Email not found');

  await next();
}

async function handler(ctx: AppKoaContext<never, Request>) {
  const email = await allowedEmailService.findOne({ _id: ctx.request.params.id });

  if (email?.isRegistered) {
    await userService.deleteOne({ email: email.email });
  }

  await allowedEmailService.deleteOne({ _id: ctx.request.params.id });

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
