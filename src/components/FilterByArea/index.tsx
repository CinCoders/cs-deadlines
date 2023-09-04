import React, { useState } from 'react';
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
  sortTree: number;
}

function FilterByArea({ deadlines, checkedValues, onCheckedChange, sortTree }: FilterProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

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

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
      return;
    }
    if (!expanded.includes(nodeIds[0])) {
      setExpanded(nodeIds);
    } else {
      setExpanded(expanded.filter(nodeId => nodeIds.includes(nodeId)));
    }
  };

  let sortedTreeData;
  if (sortTree === 0) {
    sortedTreeData = Array.from(treeData);
  } else if (sortTree === 1) {
    sortedTreeData = Array.from(treeData).sort((a, b) => a[0].localeCompare(b[0]));
  } else {
    sortedTreeData = Array.from(treeData).sort((a, b) => b[0].localeCompare(a[0]));
  }

  return (
    <TreeView
      aria-label='area-navigation system'
      defaultCollapseIcon={<ExpandMoreIcon sx={{ margin: '6px' }} />}
      defaultExpandIcon={<ChevronRightIcon sx={{ margin: '6px' }} />}
      multiSelect
      expanded={expanded}
      onNodeToggle={handleToggle}
    >
      {treeData.size > 0 &&
        sortedTreeData.map(([greatArea, areas]) => {
          let sortedAreas;
          if (sortTree === 0) {
            sortedAreas = Array.from(areas);
          } else if (sortTree === 1) {
            sortedAreas = Array.from(areas).sort((a, b) => a[0].localeCompare(b[0]));
          } else {
            sortedAreas = Array.from(areas).sort((a, b) => b[0].localeCompare(a[0]));
          }

          const parentChecked = areas.every(area => checkedValues.includes(`${greatArea}_${area}`));
          const parentIndeterminate =
            areas.some(area => checkedValues.includes(`${greatArea}_${area}`)) && !parentChecked;

          return (
            <TreeItem
              key={greatArea}
              nodeId={greatArea}
              label={
                <StyledTreeItemLabel>
                  <Checkbox
                    checked={parentChecked}
                    indeterminate={parentIndeterminate}
                    onChange={e => handleCheckboxChange(e, greatArea)}
                  />
                  {greatArea}
                </StyledTreeItemLabel>
              }
            >
              {sortedAreas.map(area => {
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
          );
        })}
    </TreeView>
  );
}

export default FilterByArea;
