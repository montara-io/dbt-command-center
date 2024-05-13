import HelpIcon from "../HelpIcon";
import styled from "styled-components";
import { STATUS_TO_CONFIG } from "./helpers";
import Loading from "../Loading";
import { SMALL_FONT_SIZE } from "../../constants/style-units";
import { primary } from "../../constants/colors";
import { GenericStatus } from "@montara-io/core-data-types";

export interface TagProps {
  status?: GenericStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  helpLinkTooltip?: string;
  className?: string;
  preventUppercase?: boolean;
  isLoading?: boolean;
}

const StyledTag = styled.div<{
  background: string;
  hasHelpIcon: boolean;
  preventUppercase: boolean;
}>`
  outline: none;
  font-family: inherit;
  display: inline-flex;
  gap: var(--small-spacing);
  outline: 0;
  padding: ${(props) =>
    props.hasHelpIcon
      ? `0.75rem var(--small-spacing)`
      : "var(--small-spacing) var(--default-spacing)"};

  margin: 0 4px;
  font-size: var(--smaller-font-size) important!;
  box-sizing: border-box;
  background: ${(props) => props.background || "#e0e0e0"};
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  white-space: nowrap;
  border-radius: 12px;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  height: 18px;
  text-transform: ${(props) => (props.preventUppercase ? "none" : "uppercase")};

  .m-tag-label {
    font-size: var(--smaller-font-size) !important;
    color: ${primary};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 0.04rem;
  }
  .m-help-icon {
    border-radius: 0;
    width: 2rem;
    padding-left: 0;
  }
  .m-loading {
    padding: 0;
  }
`;

function Tag({
  className,
  children,
  status = GenericStatus.success,
  helpLinkTooltip,
  preventUppercase = false,
  isLoading = false,
}: Readonly<TagProps>) {
  const { background, text } = STATUS_TO_CONFIG[status];

  return (
    <StyledTag
      preventUppercase={preventUppercase}
      hasHelpIcon={!!helpLinkTooltip}
      background={background}
      className={`m-tag${className ? " " + className : ""}`}
    >
      <span className="m-tag-label">{children || text}</span>
      {(!!isLoading || !!helpLinkTooltip) && (
        <div className="m-flex-align-center">
          {!!isLoading && <Loading variant="spinner" width={SMALL_FONT_SIZE} />}
          {!!helpLinkTooltip && <HelpIcon helpLinkTooltip={helpLinkTooltip} />}
        </div>
      )}
    </StyledTag>
  );
}

export default Tag;
