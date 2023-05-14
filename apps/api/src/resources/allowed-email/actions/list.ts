import { AppKoaContext, AppRouter } from 'types';

import { allowedEmailService } from 'resources/allowed-email';

const handler = async (ctx: AppKoaContext) => {
  const allowedEmails = await allowedEmailService.find({});

  ctx.body = allowedEmails?.results;
};

export default (router: AppRouter) => {
  router.get('/', handler);
};