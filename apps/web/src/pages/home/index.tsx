import Head from 'next/head';
import { NextPage } from 'next';
import { Box } from '@mantine/core';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>

    <Box
      component="iframe"
      title="logo"
      src="https://casder-succ.github.io/gallery_logo/"
      width="100%"
      height="100%"
      sx={{
        marginTop: 8,
        border: 'none',
      }}
    />
  </>
);

export default Home;
