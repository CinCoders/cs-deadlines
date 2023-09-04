import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Drawer, Button, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Conference, DeadlineProps } from '../Conference';
import FilterByArea from '../FilterByArea';

interface FilterProps {
  deadlines: DeadlineProps[];
}
// function Icon() {
//   return (
//     <span
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'Center',
//         alignItems: 'Center',
//         // marginLeft: '5px',
//       }}
//     >
//       <ArrowDropUpIcon
//         sx={{
//           position: 'absolute',
//           bottom: '-20px',
//           left: '50%',
//           // transform: 'translateX(-10%)',
//           // zIndex: sortDescending ? 1 : 0,
//         }}
//       />
//       <ArrowDropDownIcon sx={{ position: 'absolute', top: '5px', left: '50%' }} />
//     </span>
//   );
// }
function FilterPage({ deadlines }: FilterProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');
  const [open, setOpen] = useState(false);
  const [sortTree, setSortTree] = useState(0);

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

  const toggleSort = () => {
    setSortTree(prevSortTree => (prevSortTree + 1) % 3);
    console.log(sortTree);
  };

  const iconUpStyle = {
    color: sortTree === 1 ? 'black' : 'gray',
    position: 'absolute' as const,
    bottom: '-18px',
    left: '50%',
  };
  const iconDownStyle = {
    color: sortTree === 2 ? 'black' : 'gray',
    position: 'absolute' as const,
    top: '6px',
    left: '50%',
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
        fullWidth
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
          inputProps: {
            style: {
              padding: '6px 0',
            },
          },
        }}
      />
      <div style={{ display: 'flex' }}>
        {' '}
        <Typography variant='body1'>Filter by Area</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton sx={{ padding: '0' }} onClick={toggleSort}>
            {/* {sortTree ? ( */}
            <ArrowDropUpIcon fontSize='small' style={iconUpStyle} />
            <ArrowDropDownIcon fontSize='small' style={iconDownStyle} />
            {/* // )} */}
          </IconButton>
        </div>
      </div>
      <FilterByArea
        deadlines={deadlines}
        checkedValues={checkedValues}
        onCheckedChange={handleCheckedChange}
        sortTree={sortTree}
      />
    </Box>
  );

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column' flexGrow='1'>
      <Box display={{ xs: 'block', md: 'none' }} marginTop='0.5rem' justifyContent='center'>
        <Button onClick={toggleDrawer}>
          <FilterListIcon sx={{ marginRight: '0.5rem' }} /> Filters
        </Button>
        <Drawer anchor='left' open={open} onClose={toggleDrawer}>
          <Box role='presentation' onKeyDown={toggleDrawer} margin='1rem'>
            {filtersBox()}
          </Box>
        </Drawer>
      </Box>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }}>
        <Box display={{ xs: 'none', md: 'block' }} width='300px'>
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
