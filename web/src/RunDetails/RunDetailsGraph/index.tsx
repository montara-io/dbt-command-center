import styled from "styled-components";
import { DEFAULT_SPACING } from "../../constants/style-units";
import { white } from "../../constants/colors";
import {
  MONTARA_TARGET_FOLDER,
  RunDetailsTab,
  getModelRunStatusMap,
} from "../helpers";
import { AssetType, LineageResponse } from "@montara-io/core-data-types";
import { GetRunByIdQueryResponse } from "@montara-io/core-data-types/dist/src/front-end-types/run";
import Lineage from "../../components/common/Lineage";
import { FlowVariant, NodeMenuId } from "../../stories/Flow/helpers";
import { isMobileDevice } from "../../utils/responsiveness";
import { useEffect, useState } from "react";
import { GraphSummary, formatLineageDataFromGraphSummary } from "./helpers";
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
}: Readonly<{
  runData: GetRunByIdQueryResponse;
  setActiveIndex: React.Dispatch<React.SetStateAction<RunDetailsTab>>;
}>) {
  const [lineageData, setLineageData] = useState<LineageResponse | null>(null);

  useEffect(() => {
    async function getGraphSummaryJson() {
      if (!lineageData) {
        try {
          const runResults = await fetch(
            `${MONTARA_TARGET_FOLDER}/graph_summary.json`
          );
          const graphSummaryJson: GraphSummary = await runResults.json();
          setLineageData(
            formatLineageDataFromGraphSummary({ graphSummaryJson })
          );
        } catch (error) {
          console.log("error in finding graph_summary json");
        }
      }
    }

    getGraphSummaryJson();
  }, [lineageData, runData]);

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
      ) : (
        <Loading />
      )}
    </StyledRunDetailsGraph>
  );
}

export default RunDetailsGraph;
