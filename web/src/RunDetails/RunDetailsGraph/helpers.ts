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

  const nodeIdToName = filteredNodes.reduce((acc, [id, { name }]) => {
    acc[id] = getAssetNameFromRelationName(name);
    return acc;
  }, {} as Record<string, string>);

  const nodes: LineageResponse["nodes"] = filteredNodes.map(([id]) => ({
    name: nodeIdToName[id],
    type: AssetType.Model,
    metadata: {},
  }));
  const result = {
    nodes,
    edges: Object.entries(graphSummary.linked)
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
