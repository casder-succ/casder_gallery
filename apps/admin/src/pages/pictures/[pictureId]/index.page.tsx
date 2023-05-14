import { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import { Box, Button, Divider, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { RoutePath } from 'routes';

import { imageApi } from 'resources/image';

import { CreateSceneModal } from './components';

let viewer: any = null;

const Picture:NextPage = () => {
  const { pictureId } = router.query;

  const [opened, setOpened] = useState(false);
  const [data, setData] = useState({
    coordinates: { x: 0, y: 0 },
    fullCoordinates: { x: 0, y: 0 },
    convertedCoordinates: { x: 0, y: 0 },
  });

  const { data: picture, isLoading } = imageApi.useGet(pictureId as string);

  useEffect(() => {
    if (!viewer && picture) {
      // @ts-ignore
      viewer = window.OpenSeadragon({
        id: 'openseadragon',
        prefixUrl: `${picture.directory}/`,
        tileSources: picture.tileSource,
        zoomPerClick: 0,
      });
    }

    return () => {
      viewer?.destroy();
      viewer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  useEffect(() => {
    if (viewer) {
      viewer.addHandler('canvas-click', (event: any) => {
        const webPoint = event.position;
        const viewportPoint = viewer.viewport.pointFromPixel(webPoint);
        const imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

        setData({
          coordinates: {
            x: Math.round(webPoint.x),
            y: Math.round(webPoint.y),
          },
          fullCoordinates: {
            x: Math.round(imagePoint.x),
            y: Math.round(imagePoint.y),
          },
          convertedCoordinates: {
            x: Math.round(viewportPoint.x),
            y: Math.round(viewportPoint.y),
          },
        });

        setOpened(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewer]);

  if (isLoading || !picture) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {picture?.title}
        </title>
      </Head>

      <Stack sx={{ height: '100%' }}>
        <Title>
          {picture.title}
        </Title>

        <Text sx={{ fontSize: 18 }}>
          {picture.description}
        </Text>

        <Divider />

        <Group
          sx={{
            justifyContent: 'space-between',
          }}
          noWrap
        >
          <Text>
            To create scene just click on point
          </Text>

          <Button
            size="sm"
            sx={{
              background: '#0B5351',

              '&:hover': {
                background: '#0B5351 !important',
              },
            }}
            onClick={() => router.push(RoutePath.Scenes.replace('[pictureId]', pictureId as string))}
          >
            Check created scenes
          </Button>
        </Group>

        <Box
          id="openseadragon"
          sx={{
            height: 350,
            width: 800,
          }}
        />
      </Stack>

      <CreateSceneModal
        opened={opened}
        data={data}
        pictureId={pictureId as string}
        onClose={() => setOpened(false)}
      />
    </>
  );
};

export default Picture;
