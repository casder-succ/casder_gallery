import { NextPage } from 'next';
import Head from 'next/head';

import { Loader, Stack } from '@mantine/core';

import { imageApi } from 'resources/image';

import { CreatePictureModal, PicturesList } from './components';

const Pictures:NextPage = () => {
  const { data: pictures, isLoading } = imageApi.useList();

  if (isLoading || !pictures) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          Pictures item
        </title>
      </Head>

      <Stack sx={{ height: '100%' }}>
        <CreatePictureModal />

        <PicturesList pictures={pictures} />
      </Stack>
    </>
  );
};

export default Pictures;
