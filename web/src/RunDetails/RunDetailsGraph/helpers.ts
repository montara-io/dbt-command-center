import { AssetType, LineageResponse } from "@montara-io/core-data-types";
import { getAssetNameFromUniqueId } from "../helpers";

export type GraphSummary = {
  linked: Record<number, { name: string; type: string; succ?: number[] }>;
};

export function formatLineageDataFromGraphSummary({
  graphSummaryJson,
}: {
  graphSummaryJson: GraphSummary;
}): LineageResponse {
  const filteredNodes = Object.entries(graphSummaryJson.linked).filter(
    ([, v]) => {
      return v.type === "model";
    }
  );

  const nodeIdToName = filteredNodes.reduce((acc, [id, { name }]) => {
    acc[id] = getAssetNameFromUniqueId(name);
    return acc;
  }, {} as Record<string, string>);

  const nodes: LineageResponse["nodes"] = filteredNodes.map(([id]) => ({
    name: nodeIdToName[id],
    type: AssetType.Model,
    metadata: {},
  }));
  const result = {
    nodes,
    edges: Object.entries(graphSummaryJson.linked)
      .reduce((acc, [from, { succ }]) => {
        if (succ && nodeIdToName[from]) {
          acc.push(
            ...succ.map((to) => ({
              from: nodeIdToName[from],
              to: nodeIdToName[to],
            }))
          );
        }
        return acc;
      }, [] as LineageResponse["edges"])
      .filter(({ from, to }) => !!from && !!to),
  };

  return result;
}
