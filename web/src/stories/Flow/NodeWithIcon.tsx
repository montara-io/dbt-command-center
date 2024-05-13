import { memo } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import Icon from "../Icon";
import Typography from "../Typography";
import { FlowNode } from "./helpers";
import { isMobileDevice } from "../../utils/responsiveness";
import Tag from "../Tag";
import {
  BOLD,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SPACING,
  SMALLER_FONT_SIZE,
  SMALL_SPACING,
  TINY_SPACING,
} from "../../constants/style-units";
import { BORDER, alertInfo, blue, primary } from "../../constants/colors";
import { GenericStatus } from "@montara-io/core-data-types";

const ImageDimensions = SMALLER_FONT_SIZE;

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
    return isHighlighted
      ? `2px solid ${blue}`
      : `1px solid ${isCurrent ? primary : BORDER}`;
  }};
  font-weight: ${({ isHighlighted, isCurrent }) => {
    return isHighlighted ? BOLD : isCurrent ? BOLD : "normal";
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
  background-color: ${({ isChecked }) => (isChecked ? alertInfo : "inherit")};
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

        {/* <Menu
          menuItems={[
            isHighlighted
              ? NodeMenuId.RemoveHighlight
              : NodeMenuId.HighlightLineage,
          ]
            .concat(menuItems)
            .filter((m) => (isCurrent ? m !== NodeMenuId.ViewModel : true))
            .map((menuId) => ({
              label: NodeMenuIdToConfig[menuId].label,
              icon: NodeMenuIdToConfig[menuId].icon,
              onClick: () =>
                typeof onNodeMenuClick === "function" &&
                onNodeMenuClick(menuId),
            }))}
          iconSize={SMALL_FONT_SIZE}
          iconName="ellipsis-h"
        /> */}
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

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={false}
      />
    </StyledNodeWithIcon>
  );
}

const MemoizedNodeWithIcon = memo(NodeWithIcon);

export default MemoizedNodeWithIcon;
