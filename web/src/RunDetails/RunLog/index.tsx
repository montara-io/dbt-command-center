import styled from "styled-components";
import LogViewer from "../../stories/LogViewer";

type RunLogProps = {
  dbtLog: string;
};

const StyledRunLog = styled.div``;

function RunLog({ dbtLog }: Readonly<RunLogProps>) {
  return (
    <StyledRunLog>
      <LogViewer log={dbtLog ?? ""} />
    </StyledRunLog>
  );
}

export default RunLog;
