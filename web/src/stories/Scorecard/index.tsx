import styled from 'styled-components';
import { gray220 } from '../../styles/colors';
import Card from '../Card';
import Loading from '../Loading';
import {
  BOLD,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  MID_SPACING,
  SMALL_SPACING,
  TINY_SPACING,
} from '../../styles/style-units';
import Typography from '../Typography';
import Tag from '../Tag';
import { GenericStatus } from '../../utils/enums';
import { ReactNode, useState } from 'react';
import { isMobileDevice } from '../../utils/responsiveness';
import Icon, { IconType } from '../Icon';
import EllipsisText from '../Typography/EllipsisText';
import CopyToClipboardButton from '../CopyToClipboardButton';
import { NOT_AVAILABLE_DASH, NOT_AVAILABLE_TEXT } from '../../constants';
import HelpIcon from '../HelpIcon';

export interface ScorecardProps {
  items: {
    label: string;
    icon?: IconType;
    value: string | number | GenericStatus | ReactNode;
    isTag?: boolean;
    isTagLoading?: boolean;
    color?: string;
    onClick?: () => void;
    isCopyable?: boolean;
    hideOnMobile?: boolean;
    isHidden?: boolean;
    customElement?: ReactNode;
    helpTooltip?: string;
  }[];
  isLoading?: boolean;
  header?: string;
  subheader?: string;
  emptyText: string;
  className?: string;
}

const StyledScorecard = styled.div`
  margin-bottom: ${DEFAULT_SPACING};
  width: ${isMobileDevice() ? '100%' : 'fit-content'};
  .m-scorecard-header {
    margin-bottom: ${DEFAULT_SPACING};
  }
  .m-card {
    padding: ${SMALL_SPACING};
    margin-bottom: ${MID_SPACING};
    .m-scorecard-item {
      &:not(:last-child) {
        padding-right: ${DEFAULT_SPACING};
        border-right: 2px solid ${gray220};
      }
      &:not(:first-child) {
        padding-left: ${DEFAULT_SPACING};
      }
    }
    .m-scorecard-label {
      font-weight: ${BOLD};
    }
    .m-scorecard-label,
    .m-scorecard-value {
      font-size: ${DEFAULT_FONT_SIZE};
    }
    .m-scorecard-value {
      display: inline-flex;
      align-items: center;
      gap: ${TINY_SPACING};
    }
  }
  .m-loading {
    display: inline-flex;
    padding: ${TINY_SPACING};
  }
  .m-scorecard-value-string {
    display: inline-flex;
    align-items: center;
    gap: 0;
    .m-scorecard-value-ellipsis {
      max-width: 12rem;
    }
  }
`;

const EMPTY_VALUES = [NOT_AVAILABLE_DASH, NOT_AVAILABLE_TEXT];

function StringScorecardValue({
  value,
  helpTooltip,
  isCopyable,
}: Readonly<{ value: string; helpTooltip?: string; isCopyable: boolean }>) {
  const [isCopyButtonVisible, setIsCopyButtonVisible] = useState(false);
  return (
    <span
      className="m-scorecard-value-string"
      onMouseEnter={(e) => {
        isCopyable && setIsCopyButtonVisible(true);
      }}
      onMouseLeave={(e) => {
        isCopyable && setIsCopyButtonVisible(false);
      }}
    >
      <EllipsisText tooltipPosition="top" className="m-scorecard-value-ellipsis">
        {value}
      </EllipsisText>
      {!!helpTooltip && <HelpIcon helpLinkTooltip={helpTooltip} />}
      {!!isCopyButtonVisible && !EMPTY_VALUES.includes(value) && (
        <CopyToClipboardButton tooltip="Copy to clipboard" tooltipPosition="top" content={value} />
      )}
    </span>
  );
}

function Scorecard({
  header,
  subheader,
  items,
  isLoading,
  emptyText,
  className = '',
}: Readonly<ScorecardProps>) {
  return (
    <StyledScorecard className={`m-scorecard ${className}`}>
      {!!header && (
        <Typography
          variant={isMobileDevice() ? 'h4' : 'h3'}
          style={{ marginBottom: SMALL_SPACING, marginTop: DEFAULT_SPACING }}
          className="m-scorecard-header"
        >
          {header}
        </Typography>
      )}
      {!!subheader && <Typography>{subheader}</Typography>}
      {isLoading ? (
        <Loading />
      ) : items?.length ? (
        <Card>
          {items
            .filter((i) => (isMobileDevice() ? !i?.hideOnMobile : !i.isHidden))
            .map((item) => (
              <span key={item?.label} className="m-scorecard-item">
                <span className="m-scorecard-label">
                  {!!item.icon && (
                    <>
                      <Icon iconName={item.icon} size={DEFAULT_FONT_SIZE} />
                      &nbsp;
                    </>
                  )}
                  {item.label}:
                </span>
                &nbsp;
                <span className="m-scorecard-value">
                  {item.isTag ? (
                    <Tag status={item.value as GenericStatus} isLoading={item.isTagLoading} />
                  ) : (
                    <span
                      style={{
                        color: item.color,
                        textDecoration:
                          typeof item?.onClick === 'function' ? 'underline' : undefined,
                        cursor: typeof item?.onClick === 'function' ? 'pointer' : undefined,
                      }}
                      onClick={item?.onClick}
                    >
                      {typeof item.value === 'string' ? (
                        <StringScorecardValue
                          helpTooltip={item.helpTooltip}
                          value={item.value}
                          isCopyable={!!item.isCopyable}
                        />
                      ) : (
                        item.value
                      )}
                    </span>
                  )}
                  {!!item.customElement && item.customElement}
                </span>
              </span>
            ))}
        </Card>
      ) : (
        emptyText
      )}
    </StyledScorecard>
  );
}

export default Scorecard;
