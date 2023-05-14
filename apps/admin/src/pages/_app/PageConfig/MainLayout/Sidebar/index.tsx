import { memo, FC } from 'react';

import {
  Navbar as LayoutNavbar,
  Stack,
} from '@mantine/core';
import { Link } from 'components';

import { RoutePath } from 'routes';

import { accountApi } from 'resources/account';

const Navbar: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutNavbar width={{ base: 200 }}>
      <Stack
        sx={{
          padding: '60px 30px',
        }}
      >
        <Link href={RoutePath.Admins}>
          Admins
        </Link>

        <Link href={RoutePath.Pictures}>
          Gallery items
        </Link>
      </Stack>
    </LayoutNavbar>
  );
};

export default memo(Navbar);
