import ActionButton from "../ActionButton/ActionButton";
import { IconType } from "../Icon";
import Popover from "../Popover";
import { PopoverPosition } from "@blueprintjs/core";
import Loading from "../Loading";
import { StyledButtonIcon } from "./StyledButtonIcon";
import { generateHtmlId } from "../../utils/uuid";
import { LARGE_FONT_SIZE } from "../../constants/style-units";

export type ButtonIconProps = {
  icon: IconType;
  onClick?: (e: unknown) => void;
  label?: string;
  backgroundColor?: string;
  color?: string;
  isDisabled?: boolean;
  className?: string;
  id?: string;
  tooltip?: string | JSX.Element;
  isTooltipShown?: boolean;
  tooltipPosition?: PopoverPosition;
  iconSize?: string;
  isLoading?: boolean;
  loadingText?: string;
  style?: React.CSSProperties;
};

export const ButtonIcon = ({
  label,
  icon,
  onClick,
  backgroundColor,
  color,
  isDisabled = false,
  id = generateHtmlId(),
  className = "",
  tooltip,
  isTooltipShown = true,
  tooltipPosition = "top",
  iconSize,
  isLoading,
  loadingText,
  style,
}: ButtonIconProps) => {
  const actionButtonContent = (
    <ActionButton
      id={id}
      backgroundColor={backgroundColor}
      color={color}
      label={label}
      icon={icon}
      iconSize={iconSize}
      iconPos={"left"}
      onClick={(e) => {
        typeof onClick === "function" && onClick(e);
      }}
      style={style}
      disabled={isDisabled}
    />
  );

  return (
    <StyledButtonIcon
      className={`m-button-icon ${className}`}
      isDisabled={isDisabled}
      hasLabel={!!label}
    >
      {isLoading ? (
        <Loading
          loadingText={loadingText}
          variant="spinner"
          width={LARGE_FONT_SIZE}
        />
      ) : !!tooltip && !!isTooltipShown ? (
        <Popover
          content={tooltip}
          isActive={isTooltipShown}
          position={tooltipPosition}
        >
          {actionButtonContent}
        </Popover>
      ) : (
        actionButtonContent
      )}
    </StyledButtonIcon>
  );
};
