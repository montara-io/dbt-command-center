import styled from "styled-components";
import Tooltip from "../Tooltip";
import { SMALL_SPACING } from "../../constants/style-units";
import { generateHtmlId } from "../../utils/uuid";
import { isMobileDevice } from "../../utils/responsiveness";

export type HelpIconProps = {
  helpLinkTooltip: string;
  className?: string;
};

const StyledHelpIcon = styled.span`
  border-radius: 50%;
  width: 2.5rem;
  transition: all 0.2s ease-in-out;
  padding-left: ${SMALL_SPACING};
  img {
    height: 1rem;
    width: 1rem;
  }
`;

function HelpIcon({
  helpLinkTooltip,
  className = "",
}: Readonly<HelpIconProps>) {
  const elementId = generateHtmlId();
  if (isMobileDevice()) {
    return null;
  }
  return (
    <>
      <Tooltip tooltip={helpLinkTooltip} elementId={elementId} position="top" />
      <StyledHelpIcon className={`m-help-icon ${className}`} id={elementId}>
        <img
          src={"/assets/v2/help-modal-q-mark-small-dark.svg"}
          className="icon-q-mark"
          alt=""
        />
      </StyledHelpIcon>
    </>
  );
}

export default HelpIcon;
