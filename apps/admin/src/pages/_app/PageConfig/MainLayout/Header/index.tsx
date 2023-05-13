import { memo, FC } from 'react';

import {
  Header as LayoutHeader,
  Container, Title, Avatar,
} from '@mantine/core';

import { accountApi } from 'resources/account';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutHeader height="72px">
      <Container
        sx={() => ({
          minHeight: '72px',
          padding: '0 32px',
          display: 'flex',
          flex: '1 1 auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#092327',
        })}
        fluid
      >
        <Title
          order={2}
          sx={{
            color: '#fff',
          }}
        >
          Casder&apos;s gallery
        </Title>

        <Avatar
          sx={{
            '.mantine-Avatar-placeholder': {
              backgroundColor: '#9AC8E9',
              color: '#4E8098',
            },
          }}
          radius="xl"
        >
          {account.firstName.charAt(0)}
          {account.lastName.charAt(0)}
        </Avatar>
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
