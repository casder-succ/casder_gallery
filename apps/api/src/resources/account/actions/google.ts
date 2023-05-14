import config from 'config';

import { googleService, authService } from 'services';
import { AppRouter, AppKoaContext, Next } from 'types';

import { userService } from 'resources/user';
import { allowedEmailService } from 'resources/allowed-email';

type ValidatedData = {
  given_name: string;
  family_name: string;
  email: string;
  picture: string
};

const getOAuthUrl = async (ctx: AppKoaContext) => {
  const isValidCredentials = config.google.clientId || config.google.clientSecret;

  ctx.assertClientError(isValidCredentials, {
    global: 'Setup Google Oauth credentials on API',
  });

  ctx.redirect(googleService.oAuthURL);
};

const validator = async (ctx: AppKoaContext<ValidatedData>, next: Next) => {
  const { code } = ctx.request.query;

  const { isValid, payload } = await googleService.
    exchangeCodeForToken(code as string) as { isValid: boolean, payload: ValidatedData };

  ctx.assertError(isValid, `Exchange code for token error: ${payload}`);

  const isAllowed = await allowedEmailService.exists({
    email: payload.email,
  });

  ctx.assertError(isAllowed || config.rootAdmin === payload.email, 'Email is not allowed');

  ctx.validatedData = payload;

  await next();
};

const signInGoogleWithCode = async (ctx: AppKoaContext<ValidatedData>) => {
  const payload = ctx.validatedData;

  const  user = await userService.findOne({ email: payload.email });

  if (user) {
    await Promise.all([
      userService.updateLastRequest(user._id),
      authService.setTokens(ctx, user._id),
    ]);

    return ctx.redirect(config.adminUrl);
  }

  const newUser = await userService.insertOne({
    firstName: payload.given_name,
    lastName: payload.family_name,
    fullName: `${payload.given_name} ${payload.family_name}`,
    email: payload.email,
    avatarUrl: payload.picture,
  });

  if (newUser) {
    await Promise.all([
      userService.updateLastRequest(newUser._id),
      authService.setTokens(ctx, newUser._id),
      allowedEmailService.updateOne({ email: newUser.email }, () => ({ isRegistered: true })),
    ]);
  }

  ctx.redirect(config.adminUrl);
};

export default (router: AppRouter) => {
  router.get('/sign-in/google/auth', getOAuthUrl);
  router.get('/sign-in/google', validator, signInGoogleWithCode);
};
