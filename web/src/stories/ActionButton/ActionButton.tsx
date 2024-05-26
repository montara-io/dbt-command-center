import { Button, ButtonPositionType } from "primereact/button";
import TooltipOptions from "primereact/tooltip/tooltipoptions";
import Icon, { IconType } from "../Icon";
import { BUTTON_FONT_SIZE } from "../../constants/style-units";

export type ActionButtonProps = {
  id?: string;
  label?: string;
  disabled?: boolean;
  icon?: IconType;
  iconSize?: string;
  iconPos?: ButtonPositionType;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  onClick?: (e: unknown) => void;
  onMouseEnter?: (e) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  backgroundColor?: string;
  color?: string;
  style?: React.CSSProperties;
};

function ActionButton({
  children,
  id,
  label,
  disabled,
  icon,
  iconPos,
  tooltip,
  tooltipOptions,
  onClick,
  onMouseEnter,
  backgroundColor,
  color,
  iconSize = BUTTON_FONT_SIZE,
  style,
}: Readonly<ActionButtonProps>) {
  return (
    <Button
      id={id}
      label={label}
      disabled={disabled}
      className={"m-action-button primary-button primary"}
      icon={icon ? <Icon iconName={icon} size={iconSize} /> : undefined}
      iconPos={iconPos}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
      style={{ ...style, backgroundColor, color }}
      onClick={(e) => {
        e.persist(); // persist prevent "Warning: This synthetic event is reused for performance reasons" error
        onClick && onClick(e);
      }}
      onMouseEnter={(e) => {
        e.persist(); // persist prevent "Warning: This synthetic event is reused for performance reasons" error
        onMouseEnter && onMouseEnter(e);
      }}
    >
      {children}
    </Button>
  );
}

export default ActionButton;
