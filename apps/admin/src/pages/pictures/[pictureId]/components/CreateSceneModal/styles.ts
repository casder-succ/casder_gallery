import { createStyles } from '@mantine/core';

// @ts-ignore
export const useStyles = createStyles(() => ({
  modal: {
    position: 'relative',

    '& .mantine-Modal-body': {
      padding: '30px 85px 40px',
    },
    '& .mantine-Modal-content': {
      overflow: 'unset',
    },
  },
  title: {
    fontWeight: 700,
    fontSize: 22,
    color: 'rgba(37, 37, 37, 1)',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 14,
    height: 14,
    padding: 0,
    color: 'rgba(37, 37, 37, 1)',
    background: 'none',

    '&:hover': {
      background: 'none',
    },
  },
  form: {
    minWidth: 475,
    alignItems: 'center',
    gap: 30,
  },
  fileButton: {
    background: '#0B5351',

    '&:hover': {
      background: '#0B5351 !important',
    },
  },
  openButton: {
    background: '#0B5351',

    '&:hover': {
      background: '#0B5351 !important',
    },
  },
  badge: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    borderRadius: '50%',
    boxShadow: '0 0px 5px 0px #000',
  },
  input: {
    width: '100%',

    '& label.mantine-InputWrapper-label': {
      fontSize: 14,
      fontWeight: 400,
      color: 'rgba(148, 148, 150, 1) !important',
    },
    '& input.mantine-Input-input': {
      borderColor: 'rgba(148, 148, 150, 1) !important',
    },
  },
  image: {
    '&, & *': {
      height: '100% !important',
    },
  },
  error: {
    color: '#fa5252',
    fontSize: 16,
  },
}));
