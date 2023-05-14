import { NextPage } from 'next';
import Head from 'next/head';

import { Button, Group, Loader, ScrollArea, Stack, TextInput, Text } from '@mantine/core';

import { allowedEmailApi } from 'resources/allowed-email';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

const Admins: NextPage = () => {
  const [email, setEmail] = useState<string>('');

  const { data: allowedEmails, isLoading } = allowedEmailApi.useList();

  const { mutate: createEmail, isLoading: isCreateLoading } = allowedEmailApi.useCreate();
  const { mutate: deleteEmail, isLoading: isDeleteLoading } = allowedEmailApi.useRemove();

  const onCreate = () => {
    createEmail({ email }, {
      onSuccess: () => {
        setEmail('');
        showNotification({
          title: 'Success',
          message: 'Email was added',
          color: 'green',
        });
      },
      onError: () => {
        showNotification({
          title: 'Error',
          message: 'Something went wrong',
          color: 'red',
        });
      },
    });
  };

  const onDelete = (id: string) => {
    deleteEmail(id, {
      onSuccess: () => {
        showNotification({
          title: 'Success',
          message: 'Email was removed',
          color: 'green',
        });
      },
      onError: () => {
        showNotification({
          title: 'Error',
          message: 'Something went wrong',
          color: 'red',
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>
          Admins list
        </title>
      </Head>

      <Stack>
        <Group>
          <TextInput
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />

          <Button
            onClick={onCreate}
            loading={isCreateLoading}
            sx={{
              background: '#4E8098',
            }}
          >
            Add new email
          </Button>
        </Group>

        {isLoading && <Loader />}

        {allowedEmails && (
          <ScrollArea>
            <Stack>
              {allowedEmails.map((emailItem: any) => (
                <Group
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    backgroundColor: '#6FA1C0',
                    borderRadius: 10,
                    color: 'white',
                  }}
                >
                  <Text sx={{ minWidth: 150 }}>
                    {emailItem.email}
                  </Text>

                  <Text>
                    {emailItem.isRegistered ? 'Registered' : 'Not registered'}
                  </Text>

                  <Button
                    size="sm"
                    onClick={() => onDelete(emailItem._id)}
                    loading={isDeleteLoading}
                    sx={{
                      color: 'red',
                      backgroundColor: 'white',

                      '&:hover': {
                        background: 'white !important',
                        backgroundColor: 'white',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Stack>
    </>
  );
};

export default Admins;
