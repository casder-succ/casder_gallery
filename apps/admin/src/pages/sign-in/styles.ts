import { createStyles } from '@mantine/core';

export const useStyles = createStyles(({ white }) => ({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: 240,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  info: {
    color: white,
    fontWeight: 400,
    fontSize: 19,
    textAlign: 'center',
  },
  googleButton: {
    fontFamily: 'Roboto, sans-serif',
    width: '100%',
    backgroundColor: white,
    color: '#092327',
    fontWeight: 500,
    fontSize: 14,
    border: 'none',
    height: 40,

    '&:hover': {
      backgroundColor: '#f5f5f5 !important',
    },
  },
  signup: {
    color: white,
    fontSize: 12,
    fontWeight: 200,
    display: 'flex',
    gap: 4,
  },
  signupAction: {
    color: white,
    fontWeight: 500,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));
