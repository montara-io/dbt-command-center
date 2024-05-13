import styled from 'styled-components';
import Popover from '../Popover';
import { Button } from 'primereact/button';
import { blue, gray200 } from '../../styles/colors';
import Icon, { IconType } from '../Icon';
import { DEFAULT_FONT_SIZE, SMALL_SPACING } from '../../styles/style-units';

type ButtonLinkProps = {
  label: string;
  onClick: () => void;
  tooltip?: string;
  fontSize?: string;
  className?: string;
  isDisabled?: boolean;
  icon?: IconType;
  color?: string;
};

const StyledButtonLink = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${SMALL_SPACING};
  .p-button {
    width: auto;
    color: ${({ color }) => color};
    outline: none;
    font-size: ${DEFAULT_FONT_SIZE};
    font-family: inherit;
    padding: ${SMALL_SPACING} 0;
    .p-button-label {
      font-weight: 500;
    }
    &:enabled:hover {
      color: ${({ color }) => color};
    }
    &:disabled {
      color: ${gray200};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
    &.p-button-link:enabled:focus,
    &.p-button-link:not(button):not(a):not(.p-disabled):focus {
      box-shadow: none;
    }
  }
  .m-icon {
    cursor: pointer;
  }
  .p-button-icon-left {
    display: none;
  }
`;

function ButtonLink({
  label,
  onClick,
  tooltip,
  fontSize = DEFAULT_FONT_SIZE,
  className = '',
  isDisabled,
  icon,
  color = blue,
}: ButtonLinkProps) {
  const innerButton = (
    <StyledButtonLink className="m-button-link" color={color}>
      <Button
        style={{
          fontSize,
        }}
        onClick={onClick}
        label={label}
        type="button"
        className={`p-button-link ${className}`}
        disabled={!!isDisabled}
        icon={icon}
      />
      {!!icon && (
        <Icon onClick={onClick} iconName={icon} size={fontSize || DEFAULT_FONT_SIZE} color={blue} />
      )}
    </StyledButtonLink>
  );
  return tooltip ? <Popover content={tooltip}>{innerButton}</Popover> : innerButton;
}

export default ButtonLink;
