import { FC } from 'react';
import router from 'next/router';

import { Button, Group, Image, ScrollArea, Stack, Text, Title } from '@mantine/core';

import { imageApi } from 'resources/image';

import { RoutePath } from 'routes';
import { push } from 'mixpanel-browser';

type PicturesListProps = {
  pictures: any[];
};

const PicturesList: FC<PicturesListProps> = ({ pictures }) => {
  const { mutate: remove, isLoading: isRemoving } = imageApi.useRemove();

  return (
    <ScrollArea>
      <Stack>
        {pictures.map((picture) => (
          <Stack sx={{
            padding: 10,
            borderRadius: 20,
            background: '#9AC8E9',
          }}
          >
            <Image
              src={picture.image}
              radius={10}
              sx={{ alignSelf: 'center' }}
            />

            <Title order={2} sx={{ fontSize: 36 }}>
              {picture.title}
            </Title>

            <Text sx={{ fontSize: 22 }}>
              {picture.description}
            </Text>

            <Group noWrap>
              <Button
                fullWidth
                onClick={() => router.push(RoutePath.Picture.replace('[pictureId]', picture._id))}
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

              <Button
                fullWidth
                onClick={() => remove(picture._id)}
                loading={isRemoving}
                sx={{
                  background: '#fff',
                  color: 'red',
                  borderRadius: 10,

                  '&:hover': {
                    background: '#fff !important',
                  },
                }}
              >
                Delete
              </Button>
            </Group>
          </Stack>
        ))}
      </Stack>
    </ScrollArea>
  );
};

export default PicturesList;
