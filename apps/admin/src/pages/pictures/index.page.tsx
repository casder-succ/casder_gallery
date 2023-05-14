import { NextPage } from 'next';
import Head from 'next/head';

const Pictures:NextPage = () => {
  const a = 1;

  return (
    <>
      <Head>
        <title>
          Pictures item
        </title>
      </Head>

      <div>
        {a}
      </div>
    </>
  );
};

export default Pictures;
