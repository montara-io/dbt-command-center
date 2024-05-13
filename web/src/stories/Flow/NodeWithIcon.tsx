import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import Icon, { IconType } from '../Icon';
import {
  BOLD,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SPACING,
  SMALLER_FONT_SIZE,
  SMALL_FONT_SIZE,
  SMALL_SPACING,
  TINY_SPACING,
} from '../../styles/style-units';
import Typography from '../Typography';
import Menu from '../Menu';
import { BORDER, alertInfo, blue, primary } from '../../styles/colors';
import { FlowNode, NodeMenuId } from './helpers';
import { isMobileDevice } from '../../utils/responsiveness';
import Tag from '../Tag';
import { GenericStatus } from '../../utils/enums';

const ImageDimensions = SMALLER_FONT_SIZE;

const NodeMenuIdToConfig: Record<NodeMenuId, { label: string; icon: IconType }> = {
  [NodeMenuId.HighlightLineage]: { label: 'Highlight lineage', icon: 'search' },
  [NodeMenuId.RemoveHighlight]: { label: 'Remove highlight', icon: 'search-off' },
  [NodeMenuId.AddUpstream]: { label: 'Add upstream', icon: 'angle-double-left' },
  [NodeMenuId.AddDownstream]: { label: 'Add downstream', icon: 'angle-double-right' },
  [NodeMenuId.RemoveDownstream]: { label: 'Remove downstream', icon: 'route-off' },
  [NodeMenuId.ShowError]: { label: 'Show error', icon: 'exclamation-circle' },
  [NodeMenuId.FilterLineage]: { label: 'Filter lineage', icon: 'filter' },
  [NodeMenuId.ViewModel]: { label: 'View model', icon: 'box' },
};

const StyledNodeWithIcon = styled.div<{
  isChecked: boolean;
  isDisabled: boolean;
  isHighlighted: boolean;
  isCurrent: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${SMALL_SPACING};
  border: ${({ isHighlighted, isCurrent }) => {
    return isHighlighted ? `2px solid ${blue}` : `1px solid ${isCurrent ? primary : BORDER}`;
  }};
  font-weight: ${({ isHighlighted, isCurrent }) => {
    return isHighlighted ? BOLD : isCurrent ? BOLD : 'normal';
  }};
  .m-node-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  transition: opacity 0.3s;
  padding: ${`${SMALL_SPACING} ${
    isMobileDevice() ? SMALL_SPACING : DEFAULT_SPACING
  } ${SMALL_SPACING} ${isMobileDevice() ? SMALL_SPACING : DEFAULT_SPACING}`};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${SMALLER_FONT_SIZE};
  gap: ${TINY_SPACING};
  background-color: ${({ isChecked }) => (isChecked ? alertInfo : 'inherit')};
  img {
    height: ${ImageDimensions};
    width: ${ImageDimensions};
  }

  .m-node-name {
    max-width: 10rem;
  }
  .MuiButtonBase-root {
    padding: 0;
  }

  .m-node-tags-wrapper {
    display: flex;
    align-items: center;
    gap: ${SMALL_SPACING};
    flex-wrap: wrap;
  }
`;

function NodeWithIcon({
  data: {
    label,
    iconPath,
    icon,
    isChecked = false,
    menuItems = [],
    onNodeMenuClick,
    isDisabled = false,
    tags,
    isHighlighted = false,
    isCurrent = false,
  },
}: Readonly<{ data: FlowNode }>) {
  return (
    <StyledNodeWithIcon
      className="m-node-with-icon"
      isChecked={isChecked}
      isDisabled={isDisabled}
      isHighlighted={isHighlighted}
      isCurrent={isCurrent}
    >
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <div className="m-node-top-row">
        <div className="m-flex-align-center">
          {!!iconPath && <img src={iconPath} alt="icon" />}
          {!!icon && <Icon iconName={icon} size={SMALLER_FONT_SIZE} />}
          <Typography
            className="m-node-name"
            style={{ margin: 0, fontSize: SMALLER_FONT_SIZE }}
            tooltip={label}
            isEllipsis={true}
            tooltipPosition="top"
          >
            {label}
          </Typography>
        </div>

        <Menu
          menuItems={[isHighlighted ? NodeMenuId.RemoveHighlight : NodeMenuId.HighlightLineage]
            .concat(menuItems)
            .filter((m) => (isCurrent ? m !== NodeMenuId.ViewModel : true))
            .map((menuId) => ({
              label: NodeMenuIdToConfig[menuId].label,
              icon: NodeMenuIdToConfig[menuId].icon,
              onClick: () => typeof onNodeMenuClick === 'function' && onNodeMenuClick(menuId),
            }))}
          iconSize={SMALL_FONT_SIZE}
          iconName="ellipsis-h"
        />
      </div>
      {!!tags?.length && (
        <div className="m-node-tags-wrapper">
          {tags.map((tag) => (
            <Tag status={GenericStatus.neutral} preventUppercase key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <Handle type="source" position={Position.Right} id="a" isConnectable={false} />
    </StyledNodeWithIcon>
  );
}

export default memo(NodeWithIcon);
