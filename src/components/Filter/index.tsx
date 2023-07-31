import React, { useState } from 'react';
import { Box, Stack, Typography, TextField } from '@mui/material';
import { Conference } from '../Conference';

interface FilterDeadlineProps {
  deadlineId: string;
  conference: string;
  website: string;
  conferenceDetail: string;
  area: string;
  conferenceDates: string;
  location: string;
  submissionDeadline: Date;
  deadlineDetails: string;
  subArea: string;
}
interface FilterProps {
  deadlines: FilterDeadlineProps[];
  checkedValues: string[];
}

function FilterPage({ deadlines, checkedValues }: FilterProps) {
  const [filterText, setFilterText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const getCheckedAreaNames = (): string[] => checkedValues.map(nodeId => nodeId.split('_')[1]);

  const filteredDeadlinesByText: FilterDeadlineProps[] = deadlines.filter(deadline =>
    Object.values(deadline).some(
      value => typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );

  const filteredDeadlines: FilterDeadlineProps[] =
    checkedValues.length > 0
      ? filteredDeadlinesByText.filter(deadline => getCheckedAreaNames().includes(deadline.subArea))
      : filteredDeadlinesByText;

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column' flexGrow='1'>
      <TextField
        type='text'
        id='standard-basic'
        label='Filter'
        variant='standard'
        value={filterText}
        onChange={handleInputChange}
        placeholder='Type to filter'
      />
      <Stack marginTop='15px' spacing={2} display='flex' alignItems='center' width='100%'>
        {filteredDeadlines.map(deadline => (
          <Conference key={deadline.deadlineId} {...deadline} />
        ))}
        {filteredDeadlines.length === 0 && <Typography>No results, try again!</Typography>}
      </Stack>
    </Box>
  );
}

export default FilterPage;
