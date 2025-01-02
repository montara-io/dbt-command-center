import { Button as PButton } from "primereact/button";
import classNames from "classnames";
import { IconType } from "../Icon";
import Popover from "../Popover";
import HelpIcon from "../HelpIcon";
import styled from "styled-components";
import { isDesktopDevice, isMobileDevice } from "../../utils/responsiveness";
import NotificationDot from "../NotificationDot";
import {
  BOLD,
  BUTTON_FONT_SIZE_LARGE,
  DEFAULT_SPACING,
  SMALL_SPACING,
  TINY_SPACING,
} from "../../constants/style-units";
import { PRIMARY, white } from "../../constants/colors";
import Loading from "../Loading";

const StyledMidButton = styled.div`
  .p-button {
    height: ${isMobileDevice() ? "6.5rem" : "2rem"};
    min-width: ${isMobileDevice() ? "25rem" : "auto"};
    align-items: center;
    .p-button-icon-left {
      margin-right: 0;
    }
  }
  .m-mid-button {
    font-size: ${BUTTON_FONT_SIZE_LARGE};
  }
  .p-button.m-mid-button {
    color: ${white};
    background-color: ${PRIMARY};
    border: none;
    border-radius: 5px;
    outline: none;
    font-family: inherit;
    padding: ${TINY_SPACING} ${DEFAULT_SPACING};
    font-weight: ${BOLD};
    white-space: nowrap;
    display: flex;
    gap: ${SMALL_SPACING};

    &:enabled:hover {
      background-color: ${PRIMARY};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
    .p-progressbar {
      width: 2rem;
      margin: 0 1.5rem;
    }
  }

  .p-button.m-mid-button-light {
    color: ${PRIMARY};
    background-color: ${white};
    border: none;
    border-radius: 5px;
    outline: none;
    font-family: inherit;
    padding: 0.25rem 1rem;
    font-weight: 500;
    white-space: nowrap;

    &:enabled:hover {
      color: ${PRIMARY};
      background-color: ${white};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

export type MidButtonProps = {
  id: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => any;
  isLight?: boolean;
  isRound?: boolean;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: IconType;
  tooltip?: string | JSX.Element;
  background?: string;
  helpLinkTooltip?: string;
  dotBackground?: string;
};

function MidButton({
  onClick,
  isLight,
  isRound = false,
  id,
  label,
  isDisabled = false,
  className,

  isLoading,
  icon,
  tooltip,
  background,
  helpLinkTooltip,
  dotBackground,
}: MidButtonProps) {
  const buttonContent = (
    <StyledMidButton>
      <PButton
        icon={icon && isDesktopDevice() ? `pi pi-${icon}` : undefined}
        disabled={isDisabled}
        id={id}
        label={label}
        className={classNames(
          `m-mid-button m-mid-button${isLight ? `-light` : ""}`,
          { "p-button-rounded": isRound },
          className
        )}
        style={{ backgroundColor: background }}
        onClick={(e) => {
          e.persist();
          typeof onClick === "function" && onClick(e);
        }}
      >
        {isLoading && <Loading />}
        {!!dotBackground && <NotificationDot dotBackground={dotBackground} />}
      </PButton>
      {!!helpLinkTooltip && <HelpIcon helpLinkTooltip={helpLinkTooltip} />}
    </StyledMidButton>
  );
  return tooltip ? (
    <Popover content={tooltip}>{buttonContent}</Popover>
  ) : (
    buttonContent
  );
}

export default MidButton;
