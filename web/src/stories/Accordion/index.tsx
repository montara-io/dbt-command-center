import {
  Accordion as PrimeReactAccordion,
  AccordionTab,
} from "primereact/accordion";
import HelpIcon from "../HelpIcon";
import styled from "styled-components";
import { isMobileDevice } from "../../utils/responsiveness";
import Loading from "../Loading";
import { GRAY_260, boxShadow } from "../../constants/colors";
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  MID_SPACING,
  SMALL_FONT_SIZE,
} from "../../constants/style-units";
export type AccordionProps = {
  headerText: string;
  headerTooltip?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  noContentPadding?: boolean;
  isLoading?: boolean;
};

const StyledAccordion = styled.div<{ noContentPadding: boolean }>`
  margin-bottom: 1.5rem;

  .p-accordion-header-link {
    background: ${GRAY_260} !important;
    padding: ${isMobileDevice() ? DEFAULT_SPACING : "0.75rem"} !important;
    .m-loading {
      display: inline-flex;
      padding-left: ${DEFAULT_SPACING};
    }
  }
  .p-accordion-header-text {
    display: flex;
    align-items: center;
    font-size: ${DEFAULT_FONT_SIZE};
    font-family: Poppins;
  }
  .p-accordion-toggle-icon {
    font-size: ${SMALL_FONT_SIZE} !important;
  }
  .p-accordion .p-accordion-content {
    padding: ${({ noContentPadding }) =>
      noContentPadding ? "0" : isMobileDevice() ? MID_SPACING : "0.5rem"};
  }
  .p-accordion
    .p-accordion-header:not(.p-disabled)
    .p-accordion-header-link:focus {
    box-shadow: 0 0 0 0.1rem ${boxShadow};
  }
`;

function Accordion({
  headerText,
  headerTooltip,
  children,
  isOpen = true,
  noContentPadding = false,
  isLoading = false,
}: Readonly<AccordionProps>) {
  return (
    <StyledAccordion
      noContentPadding={noContentPadding}
      className="m-accordion"
    >
      <PrimeReactAccordion activeIndex={isOpen ? 0 : null}>
        <AccordionTab
          header={
            <>
              <span>{headerText}</span>
              {!!headerTooltip && <HelpIcon helpLinkTooltip={headerTooltip} />}
              {!!isLoading && <Loading variant="spinner" width="1.6rem" />}
            </>
          }
        >
          {children}
        </AccordionTab>
      </PrimeReactAccordion>
    </StyledAccordion>
  );
}

export default Accordion;
