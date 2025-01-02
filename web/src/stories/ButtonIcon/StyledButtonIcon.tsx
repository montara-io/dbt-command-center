import styled from "styled-components";
import { PRIMARY, NEUTRAL, white } from "../../constants/colors";
import {
  BUTTON_FONT_SIZE,
  DEFAULT_BORDER_RADIUS,
  SMALL_SPACING,
} from "../../constants/style-units";

export const StyledButtonIcon = styled.span<{
  isDisabled: boolean;
  hasLabel: boolean;
}>`
  .m-action-button {
    color: ${PRIMARY};
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
      color: ${PRIMARY};
    }
    &:disabled {
      background-color: ${white};
      color: ${NEUTRAL};
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
