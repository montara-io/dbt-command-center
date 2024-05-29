/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "../../../stories/Loading";
import {
  LineageFilters,
  LineageProps,
  filterLineage,
  formatLineage,
  hasAppliedFilter,
} from "./helpers";
import { StyledLineageComponent } from "./styles";
import { useState } from "react";
import Typography from "../../../stories/Typography";
import { FlowVariant, NodeMenuId } from "../../../stories/Flow/helpers";
import MidButton from "../../../stories/MidButton";
import Dropdown from "../../../stories/Dropdown";
import Flow from "../../../stories/Flow";
import Card from "../../../stories/Card";

function Lineage({
  lineageData,
  assetName,
  isLineageLoading,
  height,
  fitView = true,
  variant = FlowVariant.Lineage,
  modelToRunStatus,
  emptyMessage = "No lineage data available",
  hideMinimap = false,
  onNodeMenuClick,
  nodeMenuItems,
}: Readonly<LineageProps>) {
  const [lineageFilters, setLineageFilters] = useState<LineageFilters>({
    tags: [],
    pipelines: [],
  });

  const isLineageFilterShown = (lineageData?.nodes?.length ?? 0) > 5;

  const filteredLineage = filterLineage({
    lineageData,
    lineageFilters,
  });

  const formatted = formatLineage({
    lineageData: filteredLineage,
    assetName,
    modelToRunStatus,
    showSkippedModels: true,
    variant,
    nodeMenuItems,
  });

  return (
    <StyledLineageComponent className="m-lineage-wrapper" height={height}>
      {isLineageLoading ? (
        <Loading loadingText="Loading lineage" />
      ) : formatted?.initialNodes?.length ||
        hasAppliedFilter(lineageFilters) ? (
        <>
          {!!isLineageFilterShown && (
            <Card className="m-filter-card">
              <div className="m-lineage-filter">
                <Dropdown
                  id={"findModel"}
                  label={`🔎 Highlight model`}
                  options={
                    (formatted?.initialNodes ?? []).map(({ id }) => ({
                      label: id,
                      value: id,
                    })) ?? []
                  }
                  placeholder="Search model"
                  value={lineageFilters.lineageNodeId}
                  onChange={function (e: any): void {
                    setLineageFilters({
                      ...lineageFilters,
                      lineageNodeId: e.target.value,
                    });
                  }}
                />

                {hasAppliedFilter(lineageFilters) && (
                  <MidButton
                    id="clearFilter"
                    isLight
                    icon="filter-slash"
                    label={"Clear filter"}
                    onClick={() =>
                      setLineageFilters({
                        tags: [],
                        pipelines: [],
                        lineageNodeId: undefined,
                      })
                    }
                  />
                )}
              </div>
            </Card>
          )}

          <Flow
            {...formatted}
            hideLegend={true}
            height={isLineageFilterShown ? `calc(${height} - 4rem)` : height}
            fitView={fitView}
            variant={variant}
            onNodeMenuClick={({ node, menuId }) => {
              if (menuId === NodeMenuId.FilterLineage) {
                setLineageFilters({
                  ...lineageFilters,
                  lineageNodeId: node.id,
                });
              }
              typeof onNodeMenuClick === "function" &&
                onNodeMenuClick({ node, menuId });
            }}
            hideMinimap={hideMinimap}
          />
        </>
      ) : (
        <Typography>{emptyMessage}</Typography>
      )}
    </StyledLineageComponent>
  );
}

export default Lineage;
