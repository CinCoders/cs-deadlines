import React, { useEffect } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Conference, { DeadlineProps } from '../Conference';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface FilterProps {
  deadlines: DeadlineProps[];
}

interface SubArea {
  id: string;
  name: string;
}

interface Area {
  name: string;
  subAreas: SubArea[];
}

export const FilterByArea: React.FC<FilterProps> = ({ deadlines }) => {
  const uniqueAreas = new Set<string>();
  const uniqueSubAreas = new Set<string>();

  // deadlines.forEach(deadline => {
  //   uniqueAreas.add(deadline.greatArea);
  //   uniqueSubAreas.add(deadline.subArea);
  // });

  return (
    <div>
      <Typography variant='h6'>Filters - Areas</Typography>
      <TreeView
        aria-label='area-navigation system'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {deadlines.map(deadline => {
          const uniqueSubAreas = new Set<string>();
          if (!uniqueAreas.has(deadline.greatArea)) {
            uniqueAreas.add(deadline.greatArea);
            if (!uniqueSubAreas.has(deadline.subArea)) {
              uniqueSubAreas.add(deadline.subArea);
            }
            return (
              <TreeItem key={deadline.greatArea} nodeId={deadline.greatArea} label={deadline.greatArea}>
                <TreeItem key={deadline.subArea} nodeId={deadline.subArea} label={deadline.subArea} />
              </TreeItem>
            );
            // iterate through areas return unique values
            // iterate through subareas return unique values
            // return treeview with areas and subareas
          }
          return null;
        })}
      </TreeView>
    </div>
  );
};
