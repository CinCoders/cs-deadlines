import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Countdown from 'react-countdown';

export interface DeadlineProps {
  deadlineId: string;
  conference: string;
  website: string;
  conferenceDetail: string;
  area: string;
  conferenceDates: string;
  location: string;
  submissionDeadline: Date;
  deadlineDetails: string;
}

export const Conference: React.FC<DeadlineProps> = ({
  conference,
  website,
  conferenceDetail,
  area,
  conferenceDates,
  location,
  submissionDeadline,
  deadlineDetails,
}) => {
  const renderCountdown = () => {
    const now = new Date();
    const timeDiff = submissionDeadline.getTime() - now.getTime();

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      return (
        <Typography variant='h5'>
          {days} {days === 1 ? 'day' : 'days'}, {hours}
          {'h'}, {minutes}
          {'m'}, {seconds}
          {'s'}
        </Typography>
      );
    }

    return <Typography variant='body2'>A data limite de submissão já passou.</Typography>;
  };

  return (
    <Box
      display='flex'
      width='80%'
      alignItems='center'
      justifyContent='space-between'
      boxShadow={4}
      p={3}
      borderRadius={8}
      gap='1vw'
    >
      <Stack spacing={1} width='50%'>
        <Typography variant='h5'>
          <Link href={website} color={'inherit'} target='_blank'>
            {conference}
          </Link>
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant='body1'>{conferenceDetail}</Typography>
          <Typography variant='body2' fontWeight='bold'>
            {area}
          </Typography>
        </Stack>
      </Stack>
      <Stack width='50%' justifyContent='space-between' display='flex' alignItems='center' flexDirection='row'>
        <Stack spacing={0.5}>
          <Countdown date={submissionDeadline} renderer={renderCountdown} />
          <Typography color='#ff6961' fontWeight='bold'>
            {deadlineDetails}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography textAlign='end' variant='body1'>
            {conferenceDates}
          </Typography>
          <Typography textAlign='end'>
            <Link variant='body1' target='_blank' href={`http://maps.google.com/?q=${location}`}>
              {location}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Conference;
