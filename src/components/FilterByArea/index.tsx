import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Conference, { DeadlineProps } from '../Conference';
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';

interface FilterProps {
  deadlines: DeadlineProps[];
}

export const FilterByArea: React.FC<FilterProps> = ({ deadlines }) => {
  return (
    <div>
      <Typography>Filters</Typography>
    </div>
  );
};
