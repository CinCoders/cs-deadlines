import { Box, Stack } from '@mui/material';
import Conference, { ConferenceProps } from '../../components/Conference';
import Papa from 'papaparse';
// @ts-ignore
import TopDeadlines from '../../database/TopDeadlines.csv';
import { useEffect, useState } from 'react';

function compare(a: ConferenceProps, b: ConferenceProps) {
  if (a.submissionDeadline < b.submissionDeadline) {
    if (a.submissionDeadline < new Date()) {
      return 1;
    }
    return -1;
  }
  if (a.submissionDeadline > b.submissionDeadline) {
    if (b.submissionDeadline < new Date()) {
      return -1;
    }
    return 1;
  }
  return 0;
}

function Home() {
  const [conferences, setConferences] = useState<ConferenceProps[]>([]);

  useEffect(() => {
    Papa.parse(TopDeadlines, {
      download: true,
      complete: function (results) {
        console.log(results);
        const parsedConferences = (results.data as string[][]).map((deadline: string[]) => {
          return {
            conference: deadline[4],
            website: deadline[6],
            conferenceDetail: deadline[5],
            area: deadline[2],
            conferenceDates: deadline[7],
            location: deadline[8],
            submissionDeadline: new Date(deadline[12]),
            deadlineDetails: deadline[16]
          };
        });
        parsedConferences.splice(0, 1);
        parsedConferences.sort(compare);
        setConferences(parsedConferences);
      },
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={2} display='flex' alignItems='center'>
        {conferences.map(conference => (
          <Conference {...conference} />
        ))}
      </Stack>
    </Box>
  );
}

export default Home;
