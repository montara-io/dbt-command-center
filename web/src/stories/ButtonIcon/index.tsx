import ActionButton from '../ActionButton/ActionButton';
import { IconType } from '../Icon';
import { generateHtmlId } from '../../utils/uuid';
import Popover from '../Popover';
import { PopoverPosition } from '@blueprintjs/core';
import styled from 'styled-components';
import {
  BUTTON_FONT_SIZE,
  DEFAULT_BORDER_RADIUS,
  LARGE_FONT_SIZE,
  SMALL_SPACING,
} from '../../styles/style-units';
import Loading from '../Loading';
import {
  ReleasedFeature,
  setFeatureAnnouncementViewed,
} from '../../services/feature-announcements';
import FeatureAnnouncementPopover from '../../components/common/FeatureAnnouncement/FeatureAnnouncementPopover';
import { blue, gray200, white } from '../../styles/colors';

export type ButtonIconProps = {
  icon: IconType;
  onClick?: (e: any) => void;
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
  featureAnnouncement?: ReleasedFeature;
  style?: React.CSSProperties;
};

const StyledButtonIcon = styled.span<{ isDisabled: boolean; hasLabel: boolean }>`
  .m-action-button {
    color: ${blue};
    border: none;
    border-radius: ${DEFAULT_BORDER_RADIUS};
    outline: none;
    font-family: inherit;
    font-weight: 500;
    height: inherit;
    width: auto;
    background: transparent;
    padding: ${SMALL_SPACING};
    display: flex;
    gap: ${({ hasLabel }) => (hasLabel ? SMALL_SPACING : 0)};
    &:enabled:hover {
      background-color: ${white};
      color: ${blue};
    }
    &:disabled {
      background-color: ${white};
      color: ${gray200};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  button {
    font-size: ${BUTTON_FONT_SIZE} !important;
  }

  .p-button-label {
    font-family: Poppins !important;
  }
  .m-icon {
    line-height: 1.2;
  }
`;

export const ButtonIcon = ({
  label,
  icon,
  onClick,
  backgroundColor,
  color,
  isDisabled = false,
  id = generateHtmlId(),
  className = '',
  tooltip,
  isTooltipShown = true,
  tooltipPosition = 'top',
  iconSize,
  isLoading,
  loadingText,
  featureAnnouncement,
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
      iconPos={'left'}
      onClick={(e) => {
        !!featureAnnouncement && setFeatureAnnouncementViewed(featureAnnouncement);
        typeof onClick === 'function' && onClick(e);
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
        <Loading loadingText={loadingText} variant="spinner" width={LARGE_FONT_SIZE} />
      ) : featureAnnouncement ? (
        <FeatureAnnouncementPopover releasedFeature={featureAnnouncement}>
          {actionButtonContent}
        </FeatureAnnouncementPopover>
      ) : !!tooltip && !!isTooltipShown ? (
        <Popover content={tooltip} isActive={isTooltipShown} position={tooltipPosition}>
          {actionButtonContent}
        </Popover>
      ) : (
        actionButtonContent
      )}
    </StyledButtonIcon>
  );
};
