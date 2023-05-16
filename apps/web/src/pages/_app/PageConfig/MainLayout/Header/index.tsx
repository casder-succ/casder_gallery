import { memo, FC } from 'react';
import { RoutePath } from 'routes';
import {
  Header as LayoutHeader,
  Container, Button, Image, Group,
} from '@mantine/core';

import router from 'next/router';

const Header: FC = () => (
  <LayoutHeader height="72px">
    <Container
      sx={() => ({
        minHeight: '72px',
        padding: '0 32px',
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0B5351',
        flexWrap: 'nowrap',
      })}
      fluid
    >
      <Button
        onClick={() => {
          router.push(RoutePath.Home);
        }}
        radius={0}
        sx={{
          height: '72px',
          background: 'none',

          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1) !important',
          },
        }}
      >
        <Group
          sx={{
            height: '72px',
          }}
        >
          <Image
            width={40}
            height={40}
            src="/favicon.png"
          />

          Gallery
        </Group>
      </Button>

      <Group
        sx={{
          height: '72px',
        }}
        noWrap
      >
        <Button
          onClick={() => {
            window.location.href = 'http://localhost:3003';
          }}
          radius={0}
          sx={{
            height: '72px',
            background: 'none',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1) !important',
            },
          }}
        >
          Go to admin panel
        </Button>

        <Button
          onClick={() => {
            router.push(RoutePath.Gallery);
          }}
          radius={0}
          sx={{
            height: '72px',
            background: 'none',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1) !important',
            },
          }}
        >
          Go to gallery
        </Button>

        <Button
          onClick={() => {
            router.push(RoutePath.About);
          }}
          radius={0}
          sx={{
            height: '72px',
            background: 'none',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1) !important',
            },
          }}
        >
          About us
        </Button>
      </Group>
    </Container>
  </LayoutHeader>
);

export default memo(Header);
