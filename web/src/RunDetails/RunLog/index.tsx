import { useQuery } from '@apollo/client';

import { GET_RUN_LOGS_QUERY, GetRunLogsQueryResponse, GetRunLogsQueryVariables } from './queries';

import styled from 'styled-components';
import { useEffect } from 'react';
import { RootState } from '../../../../redux/stores';
import { useSelector } from 'react-redux';
import { useGetRunById } from '../../../../hooks/useRuns';
import { GenericStatus } from '../../../../utils/enums';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../stories/Loading';
import SomethingWentWrong from '../../../../pages/SomethingWentWrong';
import RunErrors from '../../../common/RunErrors';
import { getSingleRunErrorFromDbtRunErrors } from '../../../common/RunErrors/helpers';
import { getRoute } from '../../../../services/router/router.service';
import { Route, RouteParam } from '../../../../constants/Routes';
import Typography from '../../../../stories/Typography';
import { ButtonIcon } from '../../../../stories/ButtonIcon';
import { downloadTextFile } from '../../../../utils/web';
import LogViewer from '../../../../stories/LogViewer';
import { isProduction } from '../../../../services/env';

type RunLogProps = {
  onClose: any;
  runId: string;
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

function RunLog({ onClose, runId, isInProgressRun }: Readonly<RunLogProps>) {
  const navigate = useNavigate();
  const projectId = useSelector((state: RootState) => state.project.projectId || '');
  const isSuperuser = useSelector((state: RootState) => state?.user?.isSuperuser);
  const {
    data: runLog,
    loading: runLogLoading,
    error: runLogError,
    refetch,
  } = useQuery<GetRunLogsQueryResponse, GetRunLogsQueryVariables>(GET_RUN_LOGS_QUERY, {
    variables: {
      runId,
      projectId,
    },
    fetchPolicy: 'no-cache',
  });

  const {
    loading: getRunLoading,
    data: runData,
    error: getRunError,
    refetch: getRunByIdRefetch,
  } = useGetRunById(runId);

  const isSuccessfulRun = runLog?.getRunLogs?.status !== GenericStatus.failed;

  useEffect(() => {
    let interval;
    if (runLog?.getRunLogs?.status === GenericStatus.in_progress) {
      interval = setInterval(() => {
        if (runLog?.getRunLogs?.status === GenericStatus.in_progress) {
          refetch();
          getRunByIdRefetch();
        }
      }, 2000);
    }

    return () => interval && clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runLog?.getRunLogs?.status]);

  return (
    <StyledRunLog>
      {isInProgressRun ? (
        <Typography variant="h2" style={{ textAlign: 'center' }}>
          Run is still in progress. Please wait for it to complete.
        </Typography>
      ) : runLogLoading ||
        getRunLoading ||
        (!runLog?.getRunLogs?.logs && runLog?.getRunLogs.status === GenericStatus.in_progress) ? (
        <Loading loadingText="Loading" />
      ) : runLogError || !runLog?.getRunLogs?.logs || getRunError ? (
        <SomethingWentWrong errors={[getRunError, runLogError]} />
      ) : (
        <>
          <div className="m-error-wrapper">
            {isSuccessfulRun ? (
              <Typography variant="h4">No errors found in this run 🎉</Typography>
            ) : (
              <RunErrors
                header={''}
                errors={getSingleRunErrorFromDbtRunErrors(runData?.getRunById?.errors)}
                showLineage={true}
                onModelClick={({ assetName }) => {
                  onClose();
                  navigate(
                    getRoute({
                      path: Route.DevelopModel,
                      routeParams: {
                        [RouteParam.ModelId]: assetName,
                      },
                    }),
                  );
                }}
              />
            )}
          </div>
          {(!!isSuperuser || !isProduction()) && <LogViewer log={runLog?.getRunLogs?.logs ?? ''} />}
          {!!runLog?.getRunLogs?.logs && (
            <ButtonIcon
              icon={'download'}
              label="Download full log"
              onClick={() =>
                downloadTextFile({
                  filename: 'run.log',
                  text: runLog?.getRunLogs?.logs || '',
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
