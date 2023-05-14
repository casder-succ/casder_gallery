import Head from 'next/head';
import { NextPage } from 'next';

import { Stack, Title } from '@mantine/core';

import { accountApi } from 'resources/account';

const Home: NextPage = () => {
  const { data: account } = accountApi.useGet();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Stack
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>
          Welcome to Casder&apos;s gallery,
          {' '}
          {account?.fullName}
        </Title>
      </Stack>
    </>
  );
};

export default Home;
