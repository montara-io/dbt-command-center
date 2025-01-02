import { forwardRef } from "react";
import { Toast as PToast, ToastPositionType } from "primereact/toast";
import styled from "styled-components";
import { isMobileDevice } from "../../utils/responsiveness";
import {
  BOLD,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  MID_SPACING,
  SMALL_FONT_SIZE,
} from "../../constants/style-units";
import {
  ERROR_BACKGROUND,
  PRIMARY,
  SUCCESS_BACKGROUND,
  white,
} from "../../constants/colors";

export type ToastProps = {
  position: ToastPositionType;
};

const StyledToast = styled.div`
  .p-toast {
    width: fit-content;
    min-width: ${isMobileDevice() ? "60vw" : "20rem"};
    font-family: inherit;
    opacity: 1;
    z-index: 2147483002 !important;
  }

  .p-toast .p-toast-message.p-toast-message-error {
    border: transparent;
  }

  .p-toast .p-toast-message .p-toast-message-content {
    padding: ${isMobileDevice()
      ? `${DEFAULT_SPACING} 0 ${DEFAULT_SPACING} ${MID_SPACING} `
      : "12px 0px 13px 1rem"};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    width: 100%;
  }
  .p-toast-message-content {
    display: flex;
    align-items: center;
  }

  .p-toast .p-toast-message {
    min-width: ${isMobileDevice() ? "50vw" : "20rem"};
    color: ${PRIMARY};
    font-size: ${DEFAULT_FONT_SIZE};
    font-weight: 400;
    border-radius: ${DEFAULT_BORDER_RADIUS};
    width: fit-content;
  }

  .p-toast-message-error {
    background-color: ${ERROR_BACKGROUND} !important;
    color: ${PRIMARY};
  }

  .p-toast .p-toast-message.p-toast-message-success {
    background-color: ${SUCCESS_BACKGROUND};
    border: none;
  }

  .p-toast .p-toast-message .p-toast-message-content .p-toast-message-text {
    margin: 0rem;
  }

  .p-toast-message-icon.pi.pi-times {
    display: none;
  }

  .p-toast-message-icon.pi.pi-check {
    display: none;
  }

  .p-toast .p-toast-message .p-toast-icon-close {
    background-color: ${white};
    width: ${DEFAULT_FONT_SIZE};
    height: ${DEFAULT_FONT_SIZE};
    margin: 0px ${DEFAULT_SPACING} 0px ${MID_SPACING};
  }

  .p-toast .p-toast-message .p-toast-message-content .p-toast-summary {
    font-weight: 400;
  }

  .pi {
    font-size: calc(${SMALL_FONT_SIZE} - 0.15rem);
    font-weight: ${BOLD};
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Toast = forwardRef<any, ToastProps>(({ position }, ref) => {
  return (
    <StyledToast className="m-toast">
      <PToast ref={ref} position={position} />
    </StyledToast>
  );
});

export default Toast;
