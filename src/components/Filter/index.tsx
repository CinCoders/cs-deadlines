import React, { useState } from 'react';
import Conference, { ConferenceProps } from '../Conference';

import { Box, Stack, Input, Typography } from '@mui/material';
import { useEffect } from 'react';

interface FilterProps {
  conferences: ConferenceProps[];
}

const FilterPage: React.FC<FilterProps> = ({ conferences }) => {
  const [filterText, setFilterText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredConferences: ConferenceProps[] = conferences.filter(conference =>
    Object.values(conference).some(
      value => typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );
  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Input type='text' value={filterText} onChange={handleInputChange} placeholder='Digite para filtrar' />
      <Stack marginTop='15px' spacing={2} display='flex' alignItems='center' width='100%'>
        {filteredConferences.map(conference => {
          return <Conference key={`${conference.conference} = ${conference.submissionDeadline}`} {...conference} />;
        })}
        {filteredConferences.length === 0 && <Typography>No results, try again!</Typography>}
      </Stack>
    </Box>
  );
};

export default FilterPage;
