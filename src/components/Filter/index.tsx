import React, { useState } from 'react';
import Conference, { DeadlineProps } from '../Conference';

import { Box, Stack, Input, Typography } from '@mui/material';

interface FilterProps {
  deadlines: DeadlineProps[];
}

const FilterPage: React.FC<FilterProps> = ({ deadlines }) => {
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
    <Box width='100%' display='flex' flexDirection='column'>
      <Input type='text' value={filterText} onChange={handleInputChange} placeholder='Digite para filtrar' />
      <Stack marginTop='15px' spacing={2} display='flex' alignItems='center' width='100%'>
        {filteredDeadlines.map(deadline => {
          return <Conference key={deadline.deadlineId} {...deadline} />;
        })}
        {filteredDeadlines.length === 0 && <Typography>No results, try again!</Typography>}
      </Stack>
    </Box>
  );
};

export default FilterPage;
