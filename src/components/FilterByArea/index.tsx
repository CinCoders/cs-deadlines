import React, { useEffect, useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import Conference, { DeadlineProps } from '../Conference';
import Checkbox from '@mui/material/Checkbox';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface FilterProps {
  deadlines: DeadlineProps[];
  checked: string[];
  onCheckedChange: (checked: string[]) => void;
}

export const FilterByArea: React.FC<FilterProps> = ({ deadlines, checked, onCheckedChange }) => {
  const createTreeData = (deadlines: DeadlineProps[]) => {
    const treeData: { [key: string]: string[] } = {};
    deadlines.forEach(deadline => {
      const { greatArea, subArea } = deadline;
      // const nodeId = `${greatArea}-${subArea}`;
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

  const toggleChecked = (currentChecked: string[], nodeId: string): string[] => {
    const newChecked = [...currentChecked];
    const currentIndex = currentChecked.indexOf(nodeId);
    if (currentIndex === -1) {
      newChecked.push(nodeId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (nodeId in treeData) {
      treeData[nodeId].forEach(subarea => {
        const childNodeId = `${nodeId}-${subarea}`;
        if (!newChecked.includes(childNodeId) && newChecked.includes(nodeId)) {
          newChecked.push(childNodeId);
        } else if (newChecked.includes(childNodeId) && !newChecked.includes(nodeId)) {
          newChecked.splice(newChecked.indexOf(childNodeId), 1);
        }
        newChecked.concat(toggleChecked(newChecked, childNodeId));
      });
    }

    const parentIndex = nodeId.lastIndexOf('-');
    if (parentIndex !== -1) {
      const parent = nodeId.substring(0, parentIndex);
      const siblings = treeData[parent];
      const siblingsChecked = siblings.every(sibling => newChecked.includes(sibling));
      if (siblingsChecked && !newChecked.includes(parent)) {
        newChecked.push(parent);
      } else if (!siblingsChecked && newChecked.includes(parent)) {
        newChecked.splice(newChecked.indexOf(parent), 1);
      }
    }
    // if (!currentSelected) {
    return newChecked;
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    const newChecked = toggleChecked(checked, nodeId);
    // console.log({ nodeId });
    onCheckedChange(newChecked);
    console.log(newChecked);
  };

  return (
    <div>
      <Typography variant='h6'>Filters - Areas</Typography>
      <TreeView
        aria-label='area-navigation system'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {Object.keys(treeData).map(area => {
          return (
            <TreeItem
              key={area}
              nodeId={area}
              label={
                <>
                  <Checkbox checked={checked.includes(area)} onChange={e => handleCheckboxChange(e, area)} />
                  {area}
                </>
              }
            >
              {treeData[area].map(subArea => {
                const childNodeId = `${area}-${subArea}`;
                return (
                  <TreeItem
                    key={childNodeId}
                    nodeId={childNodeId}
                    label={
                      <>
                        <Checkbox
                          checked={checked.includes(childNodeId)}
                          onChange={e => handleCheckboxChange(e, childNodeId)}
                        />
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
