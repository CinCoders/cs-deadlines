import React from 'react';
import { Typography } from '@mui/material';
import { DeadlineProps } from '../Conference';
import Checkbox from '@mui/material/Checkbox';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { StyledTreeItemLabel } from './styles';
interface FilterProps {
  deadlines: DeadlineProps[];
  checkedValues: string[];
  onCheckedChange: (checked: string[]) => void;
}

const FilterByArea: React.FC<FilterProps> = ({ deadlines, checkedValues, onCheckedChange }) => {
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

  const toggleChecked = (currentCheckedValues: string[], nodeId: string): string[] => {
    const newCheckedValues = [...currentCheckedValues];
    const currentIndex = currentCheckedValues.indexOf(nodeId);
    if (currentIndex === -1) {
      newCheckedValues.push(nodeId);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    if (nodeId in treeData) {
      treeData[nodeId].forEach(subarea => {
        const childNodeId = `${nodeId}_${subarea}`;
        if (!newCheckedValues.includes(childNodeId) && newCheckedValues.includes(nodeId)) {
          newCheckedValues.push(childNodeId);
        } else if (newCheckedValues.includes(childNodeId) && !newCheckedValues.includes(nodeId)) {
          newCheckedValues.splice(newCheckedValues.indexOf(childNodeId), 1);
        }
        newCheckedValues.concat(toggleChecked(newCheckedValues, childNodeId));
      });
    }

    const parentIndex = nodeId.lastIndexOf('_');
    if (parentIndex !== -1) {
      const parent = nodeId.substring(0, parentIndex);
      const siblings = treeData[parent];
      const siblingsChecked = siblings.every(sibling => newCheckedValues.includes(sibling));

      if (siblingsChecked && !newCheckedValues.includes(parent)) {
        newCheckedValues.push(parent);
      } else if (!siblingsChecked && newCheckedValues.includes(parent)) {
        newCheckedValues.splice(newCheckedValues.indexOf(parent), 1);
      }
    }
    return newCheckedValues;
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    const newCheckedValues = toggleChecked(checkedValues, nodeId);
    onCheckedChange(newCheckedValues);
  };

  return (
    <div>
      <Typography variant='h6'>Filter by Areas</Typography>
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
                <StyledTreeItemLabel>
                  <Checkbox checked={checkedValues.includes(area)} onChange={e => handleCheckboxChange(e, area)} />
                  {area}
                </StyledTreeItemLabel>
              }
            >
              {treeData[area].map(subArea => {
                const childNodeId = `${area}_${subArea}`;
                return (
                  <TreeItem
                    key={childNodeId}
                    nodeId={childNodeId}
                    label={
                      <StyledTreeItemLabel>
                        <Checkbox
                          size='small'
                          checked={checkedValues.includes(childNodeId)}
                          onChange={e => handleCheckboxChange(e, childNodeId)}
                        />
                        {subArea}
                      </StyledTreeItemLabel>
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

export default FilterByArea;
