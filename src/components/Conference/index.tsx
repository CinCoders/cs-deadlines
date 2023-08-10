import { Box, Link, Stack, Typography } from '@mui/material';
import Countdown from 'react-countdown';
import {
  StyledTitleTypography,
  StyledDeadlineTypography,
  StyledTimeTypography,
  StyledDatesTypography,
  StyledLocationLink,
  // StyledLocationTypography,
} from './styles';

export interface DeadlineProps {
  deadlineId: string;
  conference: string;
  website: string;
  conferenceDetail: string;
  greatArea: string;
  area: string;
  conferenceDates: string;
  location: string;
  submissionDeadline: Date;
  deadlineDetails: string;
}

export function Conference({
  deadlineId,
  conference,
  website,
  conferenceDetail,
  greatArea,
  area,
  conferenceDates,
  location,
  submissionDeadline,
  deadlineDetails,
}: DeadlineProps) {
  const renderCountdown = () => {
    const now = new Date();
    const timeDiff = submissionDeadline.getTime() - now.getTime();

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      return (
        <StyledTimeTypography variant='h5'>
          {days}
          {days === 1 ? 'day, ' : 'days, '}
          {hours}
          {'h, '}
          {minutes}
          {'m, '}
          {seconds}s
        </StyledTimeTypography>
      );
    }

    return <Typography variant='body2'>The submission deadline has passed.</Typography>;
  };

  return (
    <Box
      id={deadlineId}
      display='flex'
      maxWidth='1200px'
      width='100%'
      alignItems='center'
      boxShadow={4}
      p={3}
      borderRadius={8}
      flexWrap='wrap'
      gap='2vw'
      sx={{
        '&::after': {
          boxSizing: 'inherit',
        },
        '&::before': {
          boxSizing: 'inherit',
        },
      }}
    >
      <Stack
        spacing={1}
        id='deadlineDetails'
        justifyContent='space-between'
        display='flex'
        alignItems='center'
        flexDirection='row'
        width='100%'
      >
        <Stack minWidth='50%'>
          <StyledTitleTypography variant='h5'>
            <Link href={website} color='inherit' target='_blank'>
              {conference}
            </Link>
          </StyledTitleTypography>
          <Stack spacing={0.5}>
            <Typography variant='body1' flexWrap='wrap'>
              {conferenceDetail}
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              {`${greatArea} - ${area}`}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={0.5} minWidth='20%'>
          <StyledDatesTypography variant='body1'>{conferenceDates}</StyledDatesTypography>
          <Typography textAlign='end'>
            <StyledLocationLink variant='body1' target='_blank' href={`http://maps.google.com/?q=${location}`}>
              {location}
            </StyledLocationLink>
          </Typography>
        </Stack>
        <Stack display='flex' justifyContent='flex-end' minWidth='30%' paddingLeft='30px'>
          <Countdown date={submissionDeadline} renderer={renderCountdown} />
          <StyledDeadlineTypography>{deadlineDetails}</StyledDeadlineTypography>
        </Stack>
      </Stack>
    </Box>
  );
}
