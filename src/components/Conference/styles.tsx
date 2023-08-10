import { Link, styled, Typography } from '@mui/material';

export const StyledTimeTypography = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  '@media (min-width: 900px)': {
    fontSize: '1.5rem',
  },
});

export const StyledDeadlineTypography = styled(Typography)({
  fontSize: '0.8rem',
  fontWeight: 'bold',
  color: '#ff6961',
  '@media (min-width: 900px)': {
    fontSize: '1rem',
  },
});

export const StyledTitleTypography = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  '@media (min-width: 900px)': {
    fontSize: '1.5rem',
  },
});

export const StyledDatesTypography = styled(Typography)({
  fontSize: '0.8rem',
  textAlign: 'end',
  '@media (min-width: 900px)': {
    fontSize: '1rem',
  },
});

export const StyledLocationLink = styled(Link)({
  fontSize: '0.8rem',
  textAlign: 'end',
  '@media (min-width: 900px)': {
    fontSize: '1rem',
  },
});
