import { FC, memo, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Button,
  Modal,
  Stack,
  TextInput,
  Title,
  Text,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { sceneApi } from 'resources/scene';

import { useStyles } from './styles';

const schema = z.object({
  text: z.string(),
  zoom: z.string().regex(/\d+/),
});
type FormValues = z.infer<typeof schema>;

type Props = {
  opened: boolean;
  pictureId: string;
  onClose: () => void;
  data: {
    coordinates: {
      x: number;
      y: number;
    };
    fullCoordinates: {
      x: number;
      y: number;
    };
    convertedCoordinates: {
      x: number;
      y: number;
    };
  }
};

const CreateSceneModal: FC<Props> = ({ opened, data, pictureId, onClose }) => {
  const { classes } = useStyles();

  const { mutate: createScene, isLoading } = sceneApi.useCreate();

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

    console.log(data);

    createScene({
      pictureId,
      text: values.text,
      zoom: parseFloat(values.zoom),
      coordinates: data,
    }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened, reset]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      className={classes.modal}
    >
      <Button className={classes.closeButton} onClick={onClose}>
        <IconX size={14} />
      </Button>

      <Box component="form" onSubmit={handleSubmit(submit)}>
        <Stack className={classes.form}>
          <Title order={3} className={classes.title}>
            Add New Scene
          </Title>

          <Text>
            Add scene information for chosen coordinates
          </Text>

          <TextInput
            label="Scene text"
            size="lg"
            className={classes.input}
            {...register('text')}
            error={errors.text?.message}
          />

          <TextInput
            label="Scene zoom (no more 12)"
            size="lg"
            className={classes.input}
            {...register('zoom')}
            error={errors.zoom?.message}
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
  );
};

export default memo(CreateSceneModal);
