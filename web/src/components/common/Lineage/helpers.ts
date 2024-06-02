import {
  AssetType,
  LineageNode,
  LineageResponse,
  ModelRunStatus,
} from "@montara-io/core-data-types";
import { CustomEvent } from "../../../constants/CustomEvent";

import {
  FlowProps,
  FlowVariant,
  NodeMenuId,
} from "../../../stories/Flow/helpers";
import { triggerCustomEvent } from "../../../utils/web";
import EntityToIcon from "../../../constants/EntityToIcon";
import { VENDOR_TO_ICON } from "../../../constants/Vendors";
import { getGraph } from "../../../services/graph";

export type LineageProps = {
  lineageData?: LineageResponse;
  assetName?: string;
  isLineageLoading: boolean;
  height?: string;
  fitView?: boolean;
  variant?: FlowVariant;
  modelToRunStatus?: { [modelName: string]: ModelRunStatus };
  emptyMessage?: string;
  onNodeMenuClick?: FlowProps["onNodeMenuClick"];
  hideMinimap?: boolean;
  nodeMenuItems?: {
    [key in
      | AssetType.Model
      | AssetType.Source
      | AssetType.Report]: NodeMenuId[];
  };
  isFilterByPipelineEnabled?: boolean;
};

export type LineageFilters = {
  tags: string[];
  pipelines: string[];
  lineageNodeId?: string;
};

export function getOwnerFromNode(node: LineageNode) {
  if (!node.metadata) {
    return undefined;
  }
  let owner;
  Object.entries(node.metadata).forEach(([, value]) => {
    if (value?.owner) {
      owner = value.owner;
    }
  });

  return owner;
}

export function isFullRun({
  modelToRunStatus,
  lineageData,
}: {
  modelToRunStatus?: LineageProps["modelToRunStatus"];
  lineageData?: LineageResponse;
}) {
  return (
    !!modelToRunStatus &&
    !!lineageData?.nodes?.length &&
    Object.keys(modelToRunStatus ?? {}).length ===
      (lineageData?.nodes?.filter((n) => n.type === AssetType.Model)?.length ??
        0)
  );
}

const REPORT_TYPES = [
  AssetType.Report,
  AssetType.MontaraReport,
  AssetType.Tableau,
  AssetType.Looker,
  AssetType.PowerBI,
];

export function formatLineage({
  lineageData,
  assetName,
  modelToRunStatus,
  showSkippedModels,
  variant,
  nodeMenuItems,
}: {
  lineageData?: LineageResponse;
  assetName?: string;
  modelToRunStatus?: LineageProps["modelToRunStatus"];
  showSkippedModels: boolean;
  variant: FlowVariant;
  nodeMenuItems?: LineageProps["nodeMenuItems"];
}): FlowProps {
  if (!lineageData?.nodes?.length) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }

  const allNodes = lineageData.nodes
    .map((node) => ({
      ...node,
      name: [AssetType.Model, AssetType.Source].includes(node.type)
        ? node.name.toLowerCase()
        : node.name,
      owner: getOwnerFromNode(node),
    }))
    .filter((n) =>
      variant === FlowVariant.RunGraph ? n.type === AssetType.Model : true
    )
    .filter((n) => {
      // TODO - fix this
      if (!showSkippedModels) {
        // meaning skipped
        if (
          variant === FlowVariant.RunGraph &&
          (!modelToRunStatus?.[n.name] ||
            modelToRunStatus?.[n.name] === ModelRunStatus.Skipped)
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });

  const initialNodes: FlowProps["initialNodes"] = allNodes.map((node) => {
    const iconPath = {
      ...VENDOR_TO_ICON,
      [AssetType.MontaraReport.toLowerCase()]: "/logo-s.svg",
    }[node.type?.toLowerCase()];
    return {
      id: `${node.name}`,
      label: node.name,
      assetType: REPORT_TYPES.includes(node.type)
        ? AssetType.Report
        : node.type,
      //If this is a source, it is skipped only if there's no connected successful/failed model to it
      runStatus: modelToRunStatus
        ? modelToRunStatus?.[node.name] || node.type === AssetType.Source
          ? modelToRunStatus?.[node.name] || ModelRunStatus.Success
          : ModelRunStatus.Skipped
        : undefined,
      isCurrent:
        !!assetName?.toLowerCase() &&
        node.name?.toLowerCase() === assetName?.toLowerCase(),
      tooltip:
        node.owner && ![AssetType.Model, AssetType.Source].includes(node.type)
          ? `${node.name}. Owner: ${node.owner}`
          : node.name,
      iconPath,
      icon: iconPath ? undefined : EntityToIcon[node.type],
      menuItems: (variant === FlowVariant.RunGraph &&
      modelToRunStatus?.[node?.name] === ModelRunStatus.Error
        ? [NodeMenuId.ShowError]
        : []
      ).concat(
        (nodeMenuItems?.[node.type] ?? []).filter(
          (m) => m !== NodeMenuId.ShowError
        )
      ),
      tags: node.tags ?? undefined,
    };
  });

  const initialNodesNames = initialNodes.map(({ id }) => id);

  const initialEdges = lineageData.edges
    .map(({ from, to }) => ({
      from: [AssetType.Model, AssetType.Source].includes(
        allNodes.find((n) => n.name === from)?.type || AssetType.Model
      )
        ? from.toLowerCase()
        : from,
      to: [AssetType.Model, AssetType.Source].includes(
        allNodes.find((n) => n.name === to)?.type || AssetType.Model
      )
        ? to.toLowerCase()
        : to,
    }))
    .filter(({ from, to }) => {
      return initialNodesNames.includes(from) && initialNodesNames.includes(to);
    })
    .map(({ from, to }) => ({
      id: `${from}-${to}`,
      source: from,
      target: to,
    }));

  return {
    initialNodes,
    initialEdges,
  };
}

export function filterLineage({
  lineageData,
  lineageFilters,
  fitView,
}: {
  lineageData: LineageResponse | undefined;
  lineageFilters: LineageFilters;
  fitView: boolean;
}): LineageResponse | undefined {
  let lineageSubgraph: string[] = [];
  if (lineageFilters?.lineageNodeId) {
    lineageSubgraph =
      getGraph({
        edges: (lineageData?.edges ?? []).map((e) => ({
          from: e.from.toLowerCase(),
          to: e.to.toLowerCase(),
        })),
        nodes: (lineageData?.nodes ?? []).map((n) => n.name.toLowerCase()),
      }).getSubgraphByNode(lineageFilters?.lineageNodeId.toLowerCase()) ?? [];
  }

  const filtered = lineageData
    ? {
        nodes: (lineageData?.nodes ?? []).filter(({ name }) => {
          const hasCorrectSubgraph = lineageSubgraph?.length
            ? lineageSubgraph.includes(name.toLowerCase())
            : true;

          return hasCorrectSubgraph;
        }),
        edges: lineageData?.edges ?? [],
      }
    : undefined;

  filtered &&
    fitView &&
    setTimeout(() => {
      triggerCustomEvent({
        eventName: CustomEvent.TRIGGER_FIT_VIEW,
      });
    }, 500);

  return filtered;
}

export function hasAppliedFilter(LineageFilters: LineageFilters) {
  return (
    !!(LineageFilters.tags.length || LineageFilters.pipelines.length) ||
    !!LineageFilters.lineageNodeId
  );
}
