import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { MainContext } from "../../Main";
import Toast from "../../stories/Toast";

const StyledToastWrapper = styled.div`
  position: absolute;
`;

function ToastWrapper() {
  const [mainState] = useContext(MainContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toastRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    mainState.toasts?.length &&
      mainState.toasts.forEach(({ severity, summary, id }) => {
        toastRef?.current?.show({
          id,
          severity,
          summary,
        });
      });
  }, [mainState.toasts]);

  const renderToasts = () => {
    return <Toast ref={toastRef} position={"bottom-right"} />;
  };

  return <StyledToastWrapper>{renderToasts()}</StyledToastWrapper>;
}

export default ToastWrapper;
