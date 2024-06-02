import styled from "styled-components";
import LogViewer from "../../stories/LogViewer";
import { AnalyticsEvent, trackEvent } from "../../services/analytics";
import { useEffect } from "react";

type RunLogProps = {
  dbtLog: string;
};

const StyledRunLog = styled.div``;

function RunLog({ dbtLog }: Readonly<RunLogProps>) {
  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunLogs,
    });
  }, []);
  return (
    <StyledRunLog>
      <LogViewer log={dbtLog ?? ""} />
    </StyledRunLog>
  );
}

export default RunLog;
