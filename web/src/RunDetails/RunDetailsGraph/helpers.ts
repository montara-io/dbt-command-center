import { AssetType, LineageResponse } from "@montara-io/core-data-types";
import { getAssetNameFromRelationName } from "../helpers";

export type GraphSummary = {
  linked: Record<number, { name: string; type: string; succ?: number[] }>;
};

export function formatLineageDataFromGraphSummary(
  graphSummary: GraphSummary
): LineageResponse {
  const filteredNodes = Object.entries(graphSummary.linked).filter(([, v]) => {
    return v.type === "model";
  });
  const filteredNodesIds = filteredNodes.map(([id]) => id);

  const nodes: LineageResponse["nodes"] = filteredNodes.map(
    ([id, { name }]) => ({
      id: id.toString(),
      name: getAssetNameFromRelationName(name),
      type: AssetType.Model,
      metadata: {},
    })
  );
  const result = {
    nodes,
    edges: Object.entries(graphSummary.linked)
      .reduce((acc, [from, { succ }]) => {
        if (succ) {
          acc.push(
            ...succ.map((to) => ({
              from: from.toString(),
              to: to.toString(),
            }))
          );
        }
        return acc;
      }, [] as LineageResponse["edges"])
      .filter(
        (e) =>
          filteredNodesIds.includes(e.from) && filteredNodesIds.includes(e.to)
      ),
  };

  return result;
}
