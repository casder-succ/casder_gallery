import { FC, memo, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import {
  FileButton,
  Box,
  Button,
  Modal,
  Stack,
  TextInput,
  Title, Image, Text,
} from '@mantine/core';
import { IconAlertCircle, IconX } from '@tabler/icons-react';

import { imageApi } from 'resources/image';

import { useStyles } from './styles';

const ACCEPTED_FILES = ['image/png', 'image/jpeg', 'image/jpg'];

const schema = z.object({
  title: z.string()
    .min(1, 'Field is required')
    .max(50, 'Name should not exceed 50 characters'),
  description: z.string()
    .min(1, 'Field is required')
    .max(500, 'Ingredients should not exceed 500 characters'),
});
type FormValues = z.infer<typeof schema>;

type FileState = {
  entity?: File | null;
  error?: string | null;
};

const CreatePictureModal: FC = () => {
  const { classes } = useStyles();

  const [file, setFile] = useState<FileState>({
    entity: null,
    error: null,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: createItem, isLoading } = imageApi.useCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const submit = () => {
    const values = watch();

    if (!file.entity) {
      setFile({ error: 'Please select a file' });
      return;
    }

    setFile({
      entity: file.entity,
      error: null,
    });

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('file', file.entity);

    createItem(formData, {
      onSuccess: () => {
        close();
      },
    });
  };

  const onFileUpload = (inputFile: File) => {
    if (!ACCEPTED_FILES.includes(inputFile.type)) {
      return showNotification({
        title: 'Invalid file type',
        message: 'Please upload a file with .png, .jpeg or .jpg extension.',
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }

    setFile({ entity: inputFile, error: null });
  };

  useEffect(() => {
    if (!opened) {
      reset();
      setFile({ entity: null, error: null });
    }
  }, [opened, reset]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        className={classes.modal}
      >
        <Button className={classes.closeButton} onClick={close}>
          <IconX size={14} />
        </Button>

        <Box component="form" onSubmit={handleSubmit(submit)}>
          <Stack className={classes.form}>
            <Title order={3} className={classes.title}>
              Add New Image
            </Title>

            <Stack>
              {!file.entity && (
                <FileButton
                  accept="image/png,image/jpeg"
                  onChange={onFileUpload}
                >
                  {(props) => (
                    <Button
                      {...props}
                      className={classes.fileButton}
                    >
                      Upload you image in one click
                    </Button>
                  )}
                </FileButton>
              )}

              {file.entity && (
                <Image
                  src={URL.createObjectURL(file.entity)}
                  alt="Image"
                  className={classes.image}
                />
              )}

              {file.error && (
                <Text className={classes.error}>
                  {file.error}
                </Text>
              )}
            </Stack>

            <TextInput
              label="Image title"
              size="lg"
              className={classes.input}
              {...register('title')}
              error={errors.title?.message}
            />

            <TextInput
              label="Image description"
              size="lg"
              className={classes.input}
              {...register('description')}
              error={errors.title?.message}
            />

            <Button
              loading={isLoading}
              type="submit"
              fullWidth
              className={classes.fileButton}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button className={classes.openButton} onClick={open}>
        Add new image
      </Button>
    </>
  );
};

export default memo(CreatePictureModal);
