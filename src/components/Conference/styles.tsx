import { styled, Typography } from '@mui/material';

export const StyledTimeTypography = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  '@media (min-width: 900px)': {
    fontSize: '1.5rem',
  },
});

export const StyledDeadlineTypography = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#ff6961',
  '@media (min-width: 900px)': {
    fontSize: '1.2rem',
  },
});
