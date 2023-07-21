import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Conference, { DeadlineProps } from '../Conference';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface FilterProps {
  deadlines: DeadlineProps[];
}

export const FilterByArea: React.FC<FilterProps> = ({ deadlines }) => {
  const uniqueAreas = new Set<string>();
  //   deadlines.forEach(deadline => {
  //     areas.add(deadline.area);
  //   });

  return (
    <div>
      <Typography variant='h6'>Filters - Areas</Typography>
      <TreeView
        aria-label='area-navigation system'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {deadlines.map(deadline => {
          if (!uniqueAreas.has(deadline.areaID)) {
            uniqueAreas.add(deadline.areaID);
            // return <TreeItem key={deadline.areaID} nodeId={deadline.areaID} label={deadline.greatArea} />;
          }
          console.log(uniqueAreas);
          return <TreeItem nodeId={deadline.areaID} label={deadline.greatArea} />;
        })}
      </TreeView>
    </div>
  );
};
