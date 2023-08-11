import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Drawer, Button, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Conference, DeadlineProps } from '../Conference';
import FilterByArea from '../FilterByArea';

interface FilterProps {
  deadlines: DeadlineProps[];
}

function FilterPage({ deadlines }: FilterProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');
  const [open, setOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  const handleCheckedChange = (checkedChangedValues: string[]) => {
    setCheckedValues(checkedChangedValues);
  };
  const getCheckedAreaNames = (): string[] => checkedValues.map(nodeId => nodeId.split('_')[1]);

  const filteredDeadlinesByText: DeadlineProps[] = deadlines.filter(deadline =>
    Object.values(deadline).some(
      value => typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const filteredDeadlines: DeadlineProps[] =
    checkedValues.length > 0
      ? filteredDeadlinesByText.filter(deadline => getCheckedAreaNames().includes(deadline.area))
      : filteredDeadlinesByText;

  const filtersBox = () => (
    <Box marginRight='1rem'>
      <TextField
        type='text'
        id='standard-basic'
        variant='outlined'
        value={filterText}
        onChange={handleInputChange}
        onKeyDown={e => {
          e.stopPropagation();
        }}
        placeholder='Type to filter'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '5px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            margin: '1rem 0',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            minHeight: '36px',
            fontSize: '14px',
          },
        }}
      />

      <FilterByArea deadlines={deadlines} checkedValues={checkedValues} onCheckedChange={handleCheckedChange} />
    </Box>
  );

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column' flexGrow='1'>
      <Box display={{ xs: 'block', md: 'none' }} marginBottom='0.5rem' justifyContent='center'>
        <Button onClick={toggleDrawer}>
          <FilterListIcon sx={{ marginRight: '0.5rem' }} /> Filters
        </Button>
        <Drawer anchor='left' open={open} onClose={toggleDrawer}>
          <Box role='presentation' onKeyDown={toggleDrawer} margin='1rem'>
            {filtersBox()}
          </Box>
        </Drawer>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant='h6' display='flex' alignItems='center'>
            <FilterListIcon sx={{ marginRight: '0.5rem' }} /> Filters
          </Typography>
          {filtersBox()}
        </Box>

        <Stack marginTop='15px' spacing={2} display='flex' alignItems='center' width='100%'>
          {filteredDeadlines.map(deadline => (
            <Conference key={deadline.deadlineId} {...deadline} />
          ))}
          {filteredDeadlines.length === 0 && <Typography>No results, try again!</Typography>}
        </Stack>
      </Box>
    </Box>
  );
}

export default FilterPage;
