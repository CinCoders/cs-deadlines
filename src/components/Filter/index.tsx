import React, { useState, useContext } from 'react';
import Conference, { DeadlineProps } from '../Conference';
import { Box, Stack, Typography, TextField } from '@mui/material';
import { CheckedContext, CheckedContextType } from '../../contexts/CheckedContext';

interface FilterProps {
  deadlines: DeadlineProps[];
}

const FilterPage: React.FC<FilterProps> = ({ deadlines }) => {
  const { checked } = useContext(CheckedContext) as CheckedContextType;
  const [filterText, setFilterText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const getCheckedAreaNames = (): string[] => {
    return checked.map(nodeId => nodeId.split('_')[1]);
  };

  const filteredDeadlinesByText: DeadlineProps[] = deadlines.filter(deadline =>
    Object.values(deadline).some(
      value => typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );

  const filteredDeadlines: DeadlineProps[] =
    checked.length > 0
      ? filteredDeadlinesByText.filter(deadline => getCheckedAreaNames().includes(deadline.subArea))
      : filteredDeadlinesByText;

  return (
    <Box width='100%' display='flex' flexDirection='column'>
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
        {filteredDeadlines.map(deadline => {
          return <Conference key={deadline.deadlineId} {...deadline} />;
        })}
        {filteredDeadlines.length === 0 && <Typography>No results, try again!</Typography>}
      </Stack>
    </Box>
  );
};

export default FilterPage;
