import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';

import { Button, Image, Loader, ScrollArea, Stack, Text, Title } from '@mantine/core';

import { RoutePath } from 'routes';

import { imageApi } from 'resources/image';

const Gallery: NextPage = () => {
  const { data: images, isLoading } = imageApi.useList();

  if (isLoading || !images) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>

      <ScrollArea sx={{
        height: '100%',
      }}
      >
        <Stack sx={{
          height: '100%',
          padding: 100,
        }}
        >
          {images.map((image: any) => (
            <Stack sx={{
              padding: 10,
              borderRadius: 20,
              background: '#9AC8E9',
            }}
            >
              <Image
                src={image.image}
                radius={10}
                sx={{ alignSelf: 'center' }}
              />

              <Title order={2} sx={{ fontSize: 36 }}>
                {image.title}
              </Title>

              <Text sx={{ fontSize: 22 }}>
                {image.description}
              </Text>

              <Button
                fullWidth
                onClick={() => router.push(RoutePath.Picture.replace('[id]', image._id))}
                sx={{
                  background: '#fff',
                  color: '#092327',
                  borderRadius: 10,

                  '&:hover': {
                    background: '#fff !important',
                  },
                }}
              >
                Visit
              </Button>
            </Stack>
          ))}
        </Stack>
      </ScrollArea>
    </>
  );
};

export default Gallery;
