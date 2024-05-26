import {
  DEFAULT_FONT_SIZE,
  HUGE_FONT_SIZE,
  LARGER_FONT_SIZE,
  LARGE_FONT_SIZE,
  LIGHT_BOLD,
  MID_FONT_SIZE,
  SMALL_FONT_SIZE,
} from "../../constants/style-units";
import { isMobileDevice } from "../../utils/responsiveness";
import { generateHtmlId } from "../../utils/uuid";
import Icon, { IconType } from "../Icon";
import Tooltip, { TooltipProps } from "../Tooltip";

export type TypographyProps = {
  variant?: "title" | "h1" | "h2" | "h3" | "h4" | "normal-text" | "small-text";
  icon?: IconType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  style?: React.CSSProperties;
  className?: string;
  tooltip?: string;
  tooltipPosition?: TooltipProps["position"];
  isEllipsis?: boolean;
  id?: string;
};

function Typography({
  id,
  variant = "normal-text",
  icon,
  children,
  style = {},
  className = "",
  tooltip,
  tooltipPosition,
  isEllipsis = false,
}: Readonly<TypographyProps>) {
  const elementId = id || generateHtmlId();
  switch (variant) {
    case "title":
      return (
        <h1
          style={{
            textAlign: "center",
            fontSize: HUGE_FONT_SIZE,
            fontWeight: LIGHT_BOLD,
            ...style,
          }}
          className={`m-typography ${className}`}
        >
          {children}
        </h1>
      );

    case "h1":
      return (
        <h1
          style={{
            fontSize: isMobileDevice() ? LARGER_FONT_SIZE : undefined,
            ...style,
          }}
          className={`m-typography ${className}`}
        >
          {icon && <Icon iconName={icon} />}
          {children}
        </h1>
      );

    case "h2":
      return (
        <h2
          style={{ fontSize: LARGE_FONT_SIZE, ...style }}
          className={`m-typography ${className}`}
        >
          {icon && (
            <>
              <Icon iconName={icon} />
              &nbsp;
            </>
          )}
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: isMobileDevice() ? "2.25rem" : "inherit",
            ...style,
          }}
          className={`m-typography ${className}`}
        >
          {icon && (
            <>
              <Icon iconName={icon} />
              &nbsp;
            </>
          )}
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          style={{ fontSize: MID_FONT_SIZE, ...style }}
          className={`m-typography ${className} ${
            icon ? "m-flex-align-center" : ""
          }`}
        >
          {icon && <Icon iconName={icon} size={MID_FONT_SIZE} />}
          {children}
        </h4>
      );

    case "normal-text":
      return (
        <>
          {!!tooltip && (
            <Tooltip
              isEllipsis={true}
              tooltip={tooltip}
              elementId={elementId}
              position={tooltipPosition}
            />
          )}
          <p
            style={{
              margin: "0.5rem 0",
              fontSize: DEFAULT_FONT_SIZE,
              overflow: isEllipsis ? "hidden" : undefined,
              textOverflow: isEllipsis ? "ellipsis" : undefined,
              whiteSpace: isEllipsis ? "nowrap" : undefined,
              ...style,
            }}
            className={`m-typography ${className}`}
            id={elementId}
          >
            {icon && (
              <>
                <Icon iconName={icon} />
                &nbsp;
              </>
            )}
            {children}
          </p>
        </>
      );

    case "small-text":
      return (
        <small
          style={{
            fontSize: isMobileDevice() ? SMALL_FONT_SIZE : undefined,
            ...style,
          }}
          className={`m-typography ${className}`}
        >
          {icon && (
            <>
              <Icon iconName={icon} />
              &nbsp;
            </>
          )}
          {children}
        </small>
      );
  }
}

export default Typography;
