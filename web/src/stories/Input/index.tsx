import { InputText } from "primereact/inputtext";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import ButtonLink from "../ButtonLink";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { isMobileDevice } from "../../utils/responsiveness";
import Typography from "../Typography";
import { ButtonIcon } from "../ButtonIcon";
import {
  DEFAULT_FONT_SIZE,
  INPUT_HEIGHT,
  SMALL_FONT_SIZE,
  SMALL_SPACING,
} from "../../constants/style-units";
import { GRAY_230, BORDER, PRIMARY } from "../../constants/colors";

export type InputProps = {
  id: string;
  type?: "text" | "password" | "email";
  label?: string;
  value?: string;
  errorMessage?: string;
  onChange?: (e: {
    target: {
      value: string;
    };
  }) => void;
  helpLinkTooltip?: string;
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  sideLinkText?: string;
  onSideLinkClick?: () => void;
  isMinimized?: boolean;
  className?: string;
  isHorizontal?: boolean;
  focusOnMount?: boolean;
  isClearable?: boolean;
};

const StyledInput = styled.div<{ hasText: boolean }>`
  .m-input-wrapper-horizontal {
    display: flex;
    align-items: center;
    gap: ${SMALL_SPACING};
    height: ${INPUT_HEIGHT};
    .m-input-label {
      width: ${isMobileDevice() ? "19rem" : "100%"};
      margin-bottom: 0;
    }
  }
  .p-inputtext {
    width: 100%;
    font-family: inherit;
    font-size: ${DEFAULT_FONT_SIZE};
    border: 1px solid ${GRAY_230};
    color: ${PRIMARY};
    outline: none;
    height: ${INPUT_HEIGHT};
    min-width: 10rem;
    padding-left: ${isMobileDevice() ? "1rem" : "0.5rem"};
    &.m-minimized {
      padding: ${SMALL_SPACING};
    }

    &:enabled {
      &:hover {
        border-color: ${BORDER};
      }

      &:focus {
        box-shadow: none;
        border-color: ${BORDER};
      }
    }
  }

  input[type="password"] {
    letter-spacing: ${({ hasText }) => (hasText ? "1px" : "inherit")};
  }
  small {
    margin-top: ${SMALL_SPACING};
  }
  .m-button-link button {
    font-size: ${SMALL_FONT_SIZE} !important;
  }
  .m-input-footer {
    margin-top: ${isMobileDevice() ? SMALL_SPACING : 0};
  }
`;

function Input({
  errorMessage,
  id,
  label,
  onChange,
  type,
  value,
  helpLinkTooltip,
  placeholder,
  helperText,
  isRequired,
  isDisabled,
  sideLinkText,
  onSideLinkClick,
  isMinimized,
  className = "",
  isHorizontal = false,
  focusOnMount,
  isClearable = false,
}: Readonly<InputProps>) {
  const elementToFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnMount && elementToFocus?.current) {
      elementToFocus?.current?.focus();
    }
  }, [focusOnMount]);

  return (
    <StyledInput
      className={`p-field m-basic-input ${className} `}
      hasText={!!value}
    >
      <div
        className={`m-input-wrapper ${
          isHorizontal ? "m-input-wrapper-horizontal" : ""
        }`}
      >
        {!!id && !!label && (
          <InputLabel
            inputId={id}
            labelText={label}
            helpLinkTooltip={helpLinkTooltip}
            isRequired={isRequired}
          />
        )}
        <span className="m-flex-align-center">
          <InputText
            id={id}
            type={type || "text"}
            aria-describedby={id + "-help"}
            value={value}
            onChange={(e: never) => onChange && onChange(e)}
            placeholder={placeholder}
            disabled={isDisabled}
            data-private={true}
            className={isMinimized ? "m-minimized" : ""}
            ref={elementToFocus}
          />
          {!!isClearable && value && (
            <ButtonIcon
              icon="times"
              color={PRIMARY}
              onClick={() =>
                typeof onChange === "function" &&
                onChange({ target: { value: "" } })
              }
            />
          )}
        </span>
      </div>
      <div className="m-input-footer">
        {!!helperText && (
          <Typography variant="small-text">{helperText}</Typography>
        )}
        {!!errorMessage && <InputError errorMessage={errorMessage} />}
        {!!sideLinkText && typeof onSideLinkClick === "function" && (
          <ButtonLink onClick={onSideLinkClick} label={sideLinkText} />
        )}
      </div>
    </StyledInput>
  );
}

export default Input;
