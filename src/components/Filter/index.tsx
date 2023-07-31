import React, { useState } from 'react';
import { Box, Stack, Typography, TextField } from '@mui/material';
import { Conference, DeadlineProps } from '../Conference';

interface FilterProps {
  deadlines: DeadlineProps[];
}

function FilterPage({ deadlines }: FilterProps) {
  const [filterText, setFilterText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredDeadlines: DeadlineProps[] = deadlines.filter(deadline =>
    Object.values(deadline).some(
      value => typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );
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
