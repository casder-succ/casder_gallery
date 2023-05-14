import { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import { Button, Divider, Group, Loader, Stack, Text, Title } from '@mantine/core';

import { imageApi } from 'resources/image';
import { sceneApi } from 'resources/scene';

const Scenes: NextPage = () => {
  const { pictureId } = router.query;

  const { data: picture, isLoading } = imageApi.useGet(pictureId as string);
  const { data: scenes, isLoading: scenesLoading } = sceneApi.useList(pictureId as string);

  const { mutate: removeScene, isLoading: removeSceneLoading } = sceneApi.useRemove();

  if (isLoading || scenesLoading || !picture || !scenes) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {picture?.title}
          {' '}
          scenes
        </title>
      </Head>

      <Stack sx={{ height: '100%' }}>
        <Title>
          {picture.title}
        </Title>

        <Divider />

        <Stack>
          {scenes.map((scene: any) => (
            <Group
              key={scene._id}
              noWrap
              sx={{
                padding: 10,
                brad: 10,
                background: '#9AC8E9',
                justifyContent: 'space-between',
              }}
            >
              <Text
                sx={{
                  minWidth: 250,
                }}
              >
                {scene.text}
              </Text>

              <Button
                size="sm"
                loading={removeSceneLoading}
                onClick={() => removeScene(scene._id)}
                sx={{
                  color: 'red',
                  background: '#fff',

                  '&:hover': {
                    color: 'red',
                    background: '#fff !important',
                  },
                }}
              >
                Delete
              </Button>
            </Group>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Scenes;
