import React, { useEffect } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Conference, { DeadlineProps } from '../Conference';
import Checkbox from '@mui/material/Checkbox';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface FilterProps {
  deadlines: DeadlineProps[];
}

export const FilterByArea: React.FC<FilterProps> = ({ deadlines }) => {
  const createTreeData = (deadlines: DeadlineProps[]) => {
    const treeData: { [key: string]: string[] } = {};
    deadlines.forEach(deadline => {
      const { greatArea, subArea } = deadline;
      if (!treeData[greatArea]) {
        treeData[greatArea] = [];
      }
      if (!treeData[greatArea].includes(subArea)) {
        treeData[greatArea].push(subArea);
      }
    });
    return treeData;
  };
  const treeData = createTreeData(deadlines);

  return (
    <div>
      <Typography variant='h6'>Filters - Areas</Typography>
      <TreeView
        aria-label='area-navigation system'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {Object.keys(treeData).map(area => {
          return (
            <TreeItem key={area} nodeId={area} label={area}>
              {treeData[area].map(subArea => {
                return (
                  <TreeItem
                    key={subArea}
                    nodeId={subArea}
                    label={
                      <>
                        {/* <Checkbox
                          checked={selectedNodes.indexOf(nodes.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          onClick={event => handleNodeSelect(event, nodes.id)}
                        /> */}
                        {subArea}
                      </>
                    }
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </div>
  );
};
