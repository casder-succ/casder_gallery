import { NextPage } from 'next';
import Head from 'next/head';

import { imageApi } from 'resources/image';

import { CreatePictureModal } from './components';

const Pictures:NextPage = () => {
  const { data: pictures, isLoading } = imageApi.useList();

  if (isLoading || !pictures) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>
          Pictures item
        </title>
      </Head>

      <CreatePictureModal />
    </>
  );
};

export default Pictures;
