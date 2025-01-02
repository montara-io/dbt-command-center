import styled from "styled-components";
import { copyToClipboard, downloadTextFile } from "../../utils/web";
import { ButtonIcon } from "../ButtonIcon";
import { PRIMARY, white } from "../../constants/colors";

type LogViewerProps = {
  log: string;
  header?: string;
};

const StyledLogViewer = styled.div`
  .m-log-viewer-content {
    position: relative;
  }
  pre {
    background: ${PRIMARY};
    color: ${white};
    width: 100%;
    overflow: auto;
    margin: 0;
    padding: 1.5rem 0.5rem;
  }
  .m-log-viewer-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

function LogViewer({ log, header }: Readonly<LogViewerProps>) {
  return (
    <StyledLogViewer className="m-log-viewer">
      {!!header && <h3>{header}</h3>}
      <div className="m-log-viewer-content">
        <pre>{log}</pre>
        <div className="m-flex-align-center m-log-viewer-actions">
          <ButtonIcon
            icon={"copy"}
            backgroundColor={white}
            tooltip="Copy log to clipboard"
            onClick={() => copyToClipboard(log)}
          />
          <ButtonIcon
            icon={"download"}
            label="Download"
            backgroundColor={white}
            onClick={() => downloadTextFile({ filename: "run.log", text: log })}
          />
        </div>
      </div>
    </StyledLogViewer>
  );
}

export default LogViewer;
