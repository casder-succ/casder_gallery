import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Stack,
  Text,
} from '@mantine/core';

import { GoogleIcon } from 'public/icons';

import config from 'config';

import { useStyles } from './styles';

const SignUp: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack className={classes.root}>
        <Stack className={classes.content}>
          <Text className={classes.info}>
            Welcome to Casder&apos;s gallery!
          </Text>

          <Stack align="center" spacing={8}>
            <Button
              component="a"
              size="md"
              leftIcon={<GoogleIcon size={18} />}
              href={`${config.apiUrl}/account/sign-in/google/auth?type=stand`}
              className={classes.googleButton}
            >
              Sign in with Google
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
