import { Intent, PopoverPosition } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { ReactNode } from "react";
import Icon from "../Icon";
import { DEFAULT_FONT_SIZE } from "../../constants/style-units";

export type PopoverProps = {
  content: string | JSX.Element;
  children: ReactNode;
  isDisabled?: boolean;
  intent?: Intent;
  isOpen?: boolean;
  isActive?: boolean;
  position?: PopoverPosition;
  className?: string;
  portalClassName?: string;
  closable?: boolean;
  onDismiss?: () => void;
};

function Popover({
  children,
  content,
  isDisabled,
  intent,
  isOpen,
  isActive = true,
  position,
  className = "",
  portalClassName = "",
  closable = false,
  onDismiss,
}: PopoverProps) {
  return (
    <Tooltip2
      portalClassName={portalClassName}
      content={
        closable ? (
          <div style={{ position: "relative", paddingRight: "1rem" }}>
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
              onClick={() => {
                typeof onDismiss === "function" && onDismiss();
              }}
            >
              <Icon iconName="times" size={DEFAULT_FONT_SIZE} />
            </span>

            {content}
          </div>
        ) : (
          content
        )
      }
      disabled={isDisabled}
      intent={intent}
      minimal={!content && !children}
      interactionKind={isActive ? "hover" : undefined}
      isOpen={isOpen}
      position={position}
      className={`m-popover ${className}`}
    >
      {children}
    </Tooltip2>
  );
}

export default Popover;
