import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import Countdown from "react-countdown";

export interface ConferenceProps {
  conference: string;
  website: string;
  conferenceDetail: string;
  area: string;
  conferenceDates: string;
  location: string;
  submissionDeadline: Date;
}

const Conference: React.FC<ConferenceProps> = ({
  conference,
  website,
  conferenceDetail,
  area,
  conferenceDates,
  location,
  submissionDeadline,
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
        <Typography variant="h5">
          {days} {days === 1 ? "day" : "days"}, {hours}
          {"h"}, {minutes}
          {"m"}, {seconds}
          {"s"}
        </Typography>
      );
    }

    return (
      <Typography variant="body2">
        A data limite de submissão já passou.
      </Typography>
    );
  };

  return (
    <Box display="flex" alignItems="center">
      <Stack spacing={1}>
        <Typography variant="h5">
          <Link href={website} color={"inherit"}>
            {conference}
          </Link>
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="body1">{conferenceDetail}</Typography>
          <Typography variant="body2">{area}</Typography>
          <Typography variant="body2">
            {conferenceDates} {location}
          </Typography>
        </Stack>
      </Stack>
      <Box ml={2}>
        <Countdown date={submissionDeadline} renderer={renderCountdown} />
        <Typography>
          Deadline:{" "}
          {submissionDeadline.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Conference;
