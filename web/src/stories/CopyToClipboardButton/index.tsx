import { useState } from "react";
import { ButtonIcon } from "../ButtonIcon";
import { copyToClipboard } from "../../utils/web";
import { generateHtmlId } from "../../utils/uuid";
import Tooltip, { TooltipProps } from "../Tooltip";
import { PRIMARY } from "../../constants/colors";

function CopyToClipboardButton({
  content,
  color = PRIMARY,
  tooltip = "",
  label,
  size,
  tooltipPosition = "left",
  onCopyToClipboard,
}: Readonly<{
  content: string;
  color?: string;
  tooltip?: string;
  label?: string;
  onCopyToClipboard?: () => void;
  size?: string;
  tooltipPosition?: TooltipProps["position"];
}>) {
  const elementId = generateHtmlId();
  const [tooltipText, setTooltipText] = useState<string>(tooltip);

  return (
    <>
      {!!tooltipText && (
        <Tooltip
          position={tooltipPosition}
          tooltip={tooltipText}
          elementId={elementId}
        />
      )}
      <ButtonIcon
        id={elementId}
        icon={"copy"}
        color={color}
        className="m-copy-to-clipboard-button"
        label={label}
        iconSize={size}
        onClick={() => {
          setTooltipText("Copy that 👍");
          copyToClipboard(content);
          setTimeout(() => {
            setTooltipText(tooltip);
          }, 2000);
          typeof onCopyToClipboard === "function" && onCopyToClipboard();
        }}
      />
    </>
  );
}

export default CopyToClipboardButton;
