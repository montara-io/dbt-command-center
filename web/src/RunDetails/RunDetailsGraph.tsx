import styled from 'styled-components';
import { GetRunByIdQueryResponse } from '../../../hooks/useRuns/queries';
import Lineage from '../../common/Lineage';
import { useGetLineageByRunId } from '../../../hooks/useLineage';
import Loading from '../../../stories/Loading';
import { RunDetailsTab, buildInProgressMessage, getModelRunStatusMap } from './helpers';
import { AssetType, GenericStatus } from '../../../utils/enums';
import Typography from '../../../stories/Typography';
import { BOLD, DEFAULT_SPACING } from '../../../styles/style-units';
import { white } from '../../../styles/colors';
import { FlowVariant, NodeMenuId } from '../../../stories/Flow/helpers';
import { isMobileDevice } from '../../../utils/responsiveness';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores';
import { getModelRoute } from '../../../services/router/router.service';
import { useNavigate } from 'react-router-dom';
import { ModelRunStatus, RunEnvironment } from '@montara-io/core-data-types';

const StyledRunDetailsGraph = styled.div`
  .m-num-successful {
    left: ${DEFAULT_SPACING};
    background-color: ${white};
  }
`;

function RunDetailsGraph({
  runData,
  setActiveIndex,
  onClose,
}: Readonly<{
  runData: GetRunByIdQueryResponse;
  setActiveIndex: React.Dispatch<React.SetStateAction<RunDetailsTab>>;
  onClose: () => void;
}>) {
  const navigate = useNavigate();
  const [lineageLoading, setLineageLoading] = useState(true);
  const projectId = useSelector((state: RootState) => state.project.projectId);
  const [getLineageById, { data: lineageData }] = useGetLineageByRunId();

  useEffect(() => {
    if (!lineageData && projectId) {
      getLineageById({
        variables: {
          projectId,
          runId: runData?.getRunById?.runId,
        },
        onCompleted: () => {
          setLineageLoading(false);
        },
        onError: () => setLineageLoading(false),
      });
    }
  }, [getLineageById, lineageData, projectId, runData?.getRunById?.runId]);

  const isCompletedRun =
    runData?.getRunById?.status === GenericStatus.completed ||
    runData?.getRunById?.status === GenericStatus.failed;
  const totalModels = (runData?.getRunById?.modelRunsDetails ?? []).length;
  const successfulModels = (runData?.getRunById?.modelRunsDetails ?? []).filter(
    (m) => m?.status === ModelRunStatus.Success,
  )?.length;

  return (
    <StyledRunDetailsGraph>
      {lineageLoading ? (
        <Loading loadingText="Loading pipeline" />
      ) : (
        <>
          <Lineage
            isLineageLoading={lineageLoading}
            lineageData={lineageData?.getLineageByRunId}
            height={isMobileDevice() ? 'calc(100vh - 55rem)' : 'calc(100vh - 27rem)'}
            variant={FlowVariant.RunGraph}
            modelToRunStatus={getModelRunStatusMap(runData)}
            fitView={true}
            nodeMenuItems={{
              [AssetType.Report]: [],
              [AssetType.Source]: [],
              [AssetType.Model]: [NodeMenuId.ViewModel],
            }}
            emptyMessage="No lineage data available. Please refresh the page to try again."
            onNodeMenuClick={(p) => {
              p.menuId === NodeMenuId.ShowError && setActiveIndex(RunDetailsTab.Issues);
              if (p.menuId === NodeMenuId.ViewModel) {
                onClose();
                navigate(getModelRoute(p.node.id));
              }
            }}
            isFilterByPipelineEnabled={false}
          />
          <Typography className="m-num-successful" style={{ marginTop: 0, fontWeight: BOLD }}>
            {isCompletedRun
              ? `${successfulModels}/${totalModels} models ran successfully ${
                  runData?.getRunById?.runEnvironment === RunEnvironment.Staging
                    ? '(including skipped models)'
                    : ''
                }`
              : buildInProgressMessage(runData)}
          </Typography>
        </>
      )}
    </StyledRunDetailsGraph>
  );
}

export default RunDetailsGraph;
