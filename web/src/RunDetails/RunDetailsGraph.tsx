import styled from "styled-components";
import { BOLD, DEFAULT_SPACING } from "../constants/style-units";
import { white } from "../constants/colors";
import {
  MockLineage,
  RunDetailsTab,
  buildInProgressMessage,
  getModelRunStatusMap,
} from "./helpers";
import {
  AssetType,
  GenericStatus,
  ModelRunStatus,
  RunEnvironment,
} from "@montara-io/core-data-types";
import { GetRunByIdQueryResponse } from "@montara-io/core-data-types/dist/src/front-end-types/run";
import Typography from "../stories/Typography";
import Lineage from "../components/common/Lineage";
import { FlowVariant, NodeMenuId } from "../stories/Flow/helpers";
import { isMobileDevice } from "../utils/responsiveness";

const StyledRunDetailsGraph = styled.div`
  .m-num-successful {
    left: ${DEFAULT_SPACING};
    background-color: ${white};
  }
`;

function RunDetailsGraph({
  runData,
  setActiveIndex,
}: Readonly<{
  runData: GetRunByIdQueryResponse;
  setActiveIndex: React.Dispatch<React.SetStateAction<RunDetailsTab>>;
}>) {
  const lineageData = MockLineage;

  const isCompletedRun =
    runData?.getRunById?.status === GenericStatus.completed ||
    runData?.getRunById?.status === GenericStatus.failed;
  const totalModels = (runData?.getRunById?.modelRunsDetails ?? []).length;
  const successfulModels = (runData?.getRunById?.modelRunsDetails ?? []).filter(
    (m) => m?.status === ModelRunStatus.Success
  )?.length;

  return (
    <StyledRunDetailsGraph>
      <>
        <Lineage
          isLineageLoading={false}
          lineageData={lineageData?.getLineageByRunId}
          height={
            isMobileDevice() ? "calc(100vh - 55rem)" : "calc(100vh - 27rem)"
          }
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
            p.menuId === NodeMenuId.ShowError &&
              setActiveIndex(RunDetailsTab.Issues);
          }}
          isFilterByPipelineEnabled={false}
        />
        <Typography
          className="m-num-successful"
          style={{ marginTop: 0, fontWeight: BOLD }}
        >
          {isCompletedRun
            ? `${successfulModels}/${totalModels} models ran successfully ${
                runData?.getRunById?.runEnvironment === RunEnvironment.Staging
                  ? "(including skipped models)"
                  : ""
              }`
            : buildInProgressMessage(runData)}
        </Typography>
      </>
    </StyledRunDetailsGraph>
  );
}

export default RunDetailsGraph;
