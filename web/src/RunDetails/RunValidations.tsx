import styled from 'styled-components';

import Typography from '../../../stories/Typography';
import { useGetModelRunsTestDetails } from '../../../hooks/useRunTests';
import GqlElement from '../../common/GqlElement';
import RunValidationsTable from './RunValidationTable';
import { CHECK, required } from '../../../styles/colors';
import { RunEnvironment } from '@montara-io/core-data-types';

type RunTestsProps = {
  runId: string;
  runEnvironment: RunEnvironment;
  isInProgressRun: boolean;
  onErrorClick: () => void;
  onClose: () => void;
};

const StyledRunValidations = styled.div`
  .m-icon {
    width: fit-content;
  }
  .p-accordion-content {
    padding: 0 !important;
  }
  .m-with-faulty-records {
    color: ${required};
  }
  .m-without-faulty-records {
    color: ${CHECK};
  }
`;

function RunValidations({
  runId,
  runEnvironment,
  isInProgressRun,
  onErrorClick,
  onClose,
}: Readonly<RunTestsProps>) {
  const {
    error: runTestsError,
    loading: runTestsLoading,
    data: runTestsData,
  } = useGetModelRunsTestDetails({
    runId,
    runEnvironment,
  });

  return (
    <StyledRunValidations>
      <GqlElement
        loadingText="Loading validations"
        error={runTestsError}
        isLoading={runTestsLoading}
      >
        {runTestsData?.getModelRunsTestDetails?.length ? (
          <>
            <RunValidationsTable
              isGenericValidation={true}
              onErrorClick={onErrorClick}
              runValidations={runTestsData?.getModelRunsTestDetails}
              onClose={onClose}
            />
            <RunValidationsTable
              isGenericValidation={false}
              onErrorClick={onErrorClick}
              runValidations={runTestsData?.getModelRunsTestDetails}
              onClose={onClose}
            />
          </>
        ) : (
          <Typography variant="h2" style={{ textAlign: 'center' }}>
            {isInProgressRun
              ? 'Run is in progress. Please wait for validations to complete.'
              : 'No model validations found for this run.'}
          </Typography>
        )}
      </GqlElement>
    </StyledRunValidations>
  );
}

export default RunValidations;
