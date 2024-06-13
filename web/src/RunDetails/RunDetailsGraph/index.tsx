import styled from "styled-components";
import { DEFAULT_SPACING } from "../../constants/style-units";
import { white } from "../../constants/colors";
import { RunDetailsTab, getModelRunStatusMap } from "../helpers";
import { AssetType, LineageResponse } from "@montara-io/core-data-types";
import { GetRunByIdQueryResponse } from "@montara-io/core-data-types/dist/src/front-end-types/run";
import Lineage from "../../components/common/Lineage";
import { FlowVariant, NodeMenuId } from "../../stories/Flow/helpers";
import { isMobileDevice } from "../../utils/responsiveness";
import Loading from "../../stories/Loading";

const StyledRunDetailsGraph = styled.div`
  .m-num-successful {
    left: ${DEFAULT_SPACING};
    background-color: ${white};
  }
`;

function RunDetailsGraph({
  runData,
  setActiveIndex,
  lineageData,
}: Readonly<{
  runData: GetRunByIdQueryResponse;
  lineageData: LineageResponse | undefined;
  setActiveIndex: React.Dispatch<React.SetStateAction<RunDetailsTab>>;
}>) {
  return (
    <StyledRunDetailsGraph>
      {lineageData ? (
        <Lineage
          isLineageLoading={false}
          lineageData={lineageData}
          height={
            isMobileDevice() ? "calc(100vh - 55rem)" : "calc(100vh - 12rem)"
          }
          variant={FlowVariant.RunGraph}
          modelToRunStatus={getModelRunStatusMap(runData)}
          fitView={false}
          nodeMenuItems={{
            [AssetType.Report]: [],
            [AssetType.Source]: [],
            [AssetType.Model]: [NodeMenuId.ViewModel],
          }}
          emptyMessage="No lineage data available. Please refresh the page to try again."
          onNodeMenuClick={(p) => {
            p.menuId === NodeMenuId.ShowError &&
              setActiveIndex(RunDetailsTab.Logs);
          }}
          isFilterByPipelineEnabled={false}
        />
      ) : (
        <Loading />
      )}
    </StyledRunDetailsGraph>
  );
}

export default RunDetailsGraph;
