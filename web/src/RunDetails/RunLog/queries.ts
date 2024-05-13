import { gql } from '@apollo/client';
import { GenericStatus } from '../../../../utils/enums';

export const GET_RUN_LOGS_QUERY = gql`
  query GetRunLogs($runId: String!, $projectId: String!) {
    getRunLogs(runId: $runId, projectId: $projectId) {
      runId
      logs
      status
    }
  }
`;

export type GetRunLogsQueryResponse = {
  getRunLogs: {
    runId: string;
    logs: string;
    status: GenericStatus;
  };
};

export type GetRunLogsQueryVariables = {
  runId: string;
  projectId: string;
};
