import styled from "styled-components";
import LogViewer from "../../stories/LogViewer";

type RunLogProps = {
  dbtLog: string;
};

const StyledRunLog = styled.div`
  .m-log-viewer {
    max-height: calc(100vh - 15rem);
  }
`;

function RunLog({ dbtLog }: Readonly<RunLogProps>) {
  return (
    <StyledRunLog>
      <LogViewer log={dbtLog ?? ""} />
    </StyledRunLog>
  );
}

export default RunLog;
