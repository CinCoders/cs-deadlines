import { styled } from '@mui/material';

export const FilterContainer = styled('div')({
  // display: 'flex',
  // flexDirection: 'row',
  display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'space-between' /* Distribute items evenly along the main axis */,
  width: '100%',
  // justifyContent: 'center',
  '@media (min-width: 900px)': {
    // display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: '20px',
    width: '100%',
  },
});

export const FilterByAreaContainer = styled('div')({
  // flexGrow: 1,
  // height: '3.5rem',
  // display: 'flex',
  // alignItems: 'end',
  // display: 'flex',
  // justifyContent: 'center',
  // width: '100%',
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'flex',
    width: '20%',
    justifyContent: 'flex-start',
    marginRight: '20px',
  },
});
