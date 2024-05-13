import styled from "styled-components";
import { useEffect } from "react";
import Typography from "../../stories/Typography";
import LogViewer from "../../stories/LogViewer";
import { ButtonIcon } from "../../stories/ButtonIcon";
import { downloadTextFile } from "../../utils/web";
import {
  GenericStatus,
  GetRunLogsQueryResponse,
} from "@montara-io/core-data-types";

type RunLogProps = {
  isInProgressRun: boolean;
};

const StyledRunLog = styled.div`
  .m-error-wrapper {
    margin-bottom: 1.5rem;
  }
  .m-alert {
    max-width: 100%;
  }
`;

function RunLog({ isInProgressRun }: Readonly<RunLogProps>) {
  const runLog: GetRunLogsQueryResponse = {
    getRunLogs: {
      runId: "",
      logs: "logs",
      status: GenericStatus.in_progress,
    },
  };

  // const runData = MockRun;

  const isSuccessfulRun = runLog?.getRunLogs?.status !== GenericStatus.failed;

  useEffect(() => {
    let interval;
    if (runLog?.getRunLogs?.status === GenericStatus.in_progress) {
      interval = setInterval(() => {
        if (runLog?.getRunLogs?.status === GenericStatus.in_progress) {
          //TODO - make the actual query to get the logs
        }
      }, 2000);
    }

    return () => interval && clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runLog?.getRunLogs?.status]);

  return (
    <StyledRunLog>
      {isInProgressRun ? (
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Run is still in progress. Please wait for it to complete.
        </Typography>
      ) : (
        <>
          <div className="m-error-wrapper">
            {isSuccessfulRun ? (
              <Typography variant="h4">
                No errors found in this run 🎉
              </Typography>
            ) : (
              <>TODO</>
              // <RunErrors
              //   header={""}
              //   errors={getSingleRunErrorFromDbtRunErrors(
              //     runData?.getRunById?.errors
              //   )}
              //   showLineage={true}
              //   onModelClick={({ assetName }) => {
              //     onClose();
              //     navigate(
              //       getRoute({
              //         path: Route.DevelopModel,
              //         routeParams: {
              //           [RouteParam.ModelId]: assetName,
              //         },
              //       })
              //     );
              //   }}
              // />
            )}
          </div>

          <LogViewer log={runLog?.getRunLogs?.logs ?? ""} />

          {!!runLog?.getRunLogs?.logs && (
            <ButtonIcon
              icon={"download"}
              label="Download full log"
              onClick={() =>
                downloadTextFile({
                  filename: "run.log",
                  text: runLog?.getRunLogs?.logs || "",
                })
              }
            />
          )}
        </>
      )}
    </StyledRunLog>
  );
}

export default RunLog;
