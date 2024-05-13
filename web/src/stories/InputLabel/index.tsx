import styled from "styled-components";
import HelpIcon from "../HelpIcon";
import LearnMore from "../LearnMore";
import { MontaraDocsPage } from "../../services/montara-docs.service";
import { primary, required } from "../../constants/colors";
import {
  DEFAULT_FONT_SIZE,
  LIGHT_BOLD,
  SMALL_SPACING,
} from "../../constants/style-units";

export type InputLabelProps = {
  inputId: string;
  labelText?: string;
  helpLinkTooltip?: string;
  type?: "bold" | "normal";
  isRequired?: boolean;
  learnMorePage?: MontaraDocsPage;
  noMargin?: boolean;
  className?: string;
};

const StyledInputLabel = styled.label<{ noMargin: boolean }>`
  display: block;
  margin-bottom: ${(props) => (props.noMargin ? "0" : SMALL_SPACING)};
  font-size: ${DEFAULT_FONT_SIZE};
  &.m-bold {
    font-weight: ${LIGHT_BOLD};
    color: ${primary};
  }
  .m-learn-more {
    display: inline-flex;
    margin-left: ${SMALL_SPACING};
  }
`;

function InputLabel({
  inputId,
  labelText,
  helpLinkTooltip = "",
  type = "bold",
  isRequired = false,

  learnMorePage,
  noMargin = false,
  className = "",
}: Readonly<InputLabelProps>) {
  return (
    <StyledInputLabel
      className={`m-input-label ${
        type === "bold" ? "m-bold" : "m-normal"
      } ${className}`}
      htmlFor={inputId}
      noMargin={noMargin}
    >
      {labelText}
      {!!isRequired && (
        <span style={{ color: required, marginLeft: "0.25rem" }}>*</span>
      )}
      {!!helpLinkTooltip && <HelpIcon helpLinkTooltip={helpLinkTooltip} />}
      {!!learnMorePage && <LearnMore path={learnMorePage} />}
    </StyledInputLabel>
  );
}

export default InputLabel;
