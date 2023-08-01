import React from 'react';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { StyledTreeItemLabel } from './styles';

interface FilterByAreaDeadlineProps {
  greatArea: string;
  area: string;
}
interface FilterProps {
  deadlines: FilterByAreaDeadlineProps[];
  checkedValues: string[];
  onCheckedChange: (checked: string[]) => void;
}

function FilterByArea({ deadlines, checkedValues, onCheckedChange }: FilterProps) {
  const createTreeData = (deadlinesValue: FilterByAreaDeadlineProps[]) => {
    const treeData = new Map<string, string[]>();
    deadlinesValue.forEach(deadline => {
      const { greatArea, area } = deadline;
      if (!treeData.has(greatArea)) {
        treeData.set(greatArea, []);
      }
      if (!treeData.get(greatArea)?.includes(area)) {
        treeData.get(greatArea)?.push(area);
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

    if (treeData.has(nodeId)) {
      treeData.get(nodeId)?.forEach(subarea => {
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
      const siblings = treeData.get(parent);
      const siblingsChecked = siblings?.every(sibling => newCheckedValues.includes(sibling));

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
        {treeData.size > 0 &&
          Array.from(treeData).map(([greatArea, areas]) => (
            <TreeItem
              key={greatArea}
              nodeId={greatArea}
              label={
                <StyledTreeItemLabel>
                  <Checkbox
                    checked={checkedValues.includes(greatArea)}
                    onChange={e => handleCheckboxChange(e, greatArea)}
                  />
                  {greatArea}
                </StyledTreeItemLabel>
              }
            >
              {areas.map(area => {
                const childNodeId = `${greatArea}_${area}`;
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
                        {area}
                      </StyledTreeItemLabel>
                    }
                  />
                );
              })}
            </TreeItem>
          ))}
      </TreeView>
    </div>
  );
}

export default FilterByArea;
