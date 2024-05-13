import styled from "styled-components";
import { blue } from "../../constants/colors";

export const StyledButtonIcon = styled.span<{
  isDisabled: boolean;
  hasLabel: boolean;
}>`
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
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
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
