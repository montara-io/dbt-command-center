/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import ELK from "elkjs/lib/elk.bundled";

import { MarkerType } from "reactflow";
import { IconType } from "../Icon";
import { AssetType, ModelRunStatus } from "@montara-io/core-data-types";
import {
  BORDER,
  BUTTON_LIGHT,
  ERROR_BACKGROUND,
  INFO_BACKGROUND,
  NEUTRAL,
  PRIMARY,
  SUCCESS_BACKGROUND,
  WARNING_BACKGROUND,
} from "../../constants/colors";
import { DEFAULT_FONT_SIZE } from "../../constants/style-units";
const elk = new ELK({});
export const DEFAULT_NODE_WIDTH = 130;
export const DEFAULT_NODE_HEIGHT = 20;

export enum NodeMenuId {
  HighlightLineage,
  AddUpstream,
  AddDownstream,
  RemoveDownstream,
  ShowError,
  FilterLineage,
  ViewModel,
  RemoveHighlight,
}

export type FlowNode = {
  id: string;
  label: string;
  tooltip: string;
  assetType: AssetType;
  runStatus?: ModelRunStatus;
  isCurrent?: boolean;
  iconPath?: string;
  icon?: IconType;
  styles?: {
    border?: string;
    background?: string;
  };
  isChecked?: boolean;
  menuItems?: NodeMenuId[];
  onNodeMenuClick?: (menuId: NodeMenuId) => void;
  tags?: string[];
  isDisabled?: boolean;
  isHighlighted?: boolean;
};

export enum FlowVariant {
  Lineage,
  RunGraph,
}

export type FlowProps = {
  initialNodes: FlowNode[];
  initialEdges?: {
    id: string;
    source: string;
    target: string;
  }[];
  height?: string;
  onNodeClick?: (params: { node: FlowNode }) => void;
  onNodeMenuClick?: (params: { node: FlowNode; menuId: NodeMenuId }) => void;
  hideLegend?: boolean;
  hideMinimap?: boolean;
  fitView?: boolean;
  variant?: FlowVariant;
};

export enum NodeType {
  NodeWithIcon = "nodeWithIcon",
}

export const LineageAssetTypeToStyles = {
  [AssetType.Source]: {
    background: BUTTON_LIGHT,
    color: PRIMARY,
    label: "Source",
  },
  [AssetType.Model]: {
    color: PRIMARY,
    background: INFO_BACKGROUND,
    label: "Model",
  },
  [AssetType.Report]: {
    background: WARNING_BACKGROUND,
    color: PRIMARY,
    label: "Report",
  },
};

export const RunGraphAssetTypeToStyles = {
  [ModelRunStatus.Skipped]: {
    background: NEUTRAL,
    color: PRIMARY,
    label: "Skipped",
    helpIconText:
      "This model run was skipped as part of a smart run or due to a failed upstream model",
  },
  [ModelRunStatus.Pending]: {
    background: NEUTRAL,
    color: PRIMARY,
    label: "Pending",
    helpIconText: "This model is pending execution",
  },
  [ModelRunStatus.InProgress]: {
    background: INFO_BACKGROUND,
    color: PRIMARY,
    label: "In progress",
    helpIconText: "This model run is currently in progress",
  },
  [ModelRunStatus.Error]: {
    background: ERROR_BACKGROUND,
    color: PRIMARY,
    label: "Error",
    helpIconText:
      "This model run failed - either due to a transformation error or a validation error",
  },
  [ModelRunStatus.Success]: {
    background: SUCCESS_BACKGROUND,
    color: PRIMARY,
    label: "Success",
    helpIconText:
      "This model transformation and validations was executed successfully",
  },
};

export const LineageLegendColor = styled.div`
  width: ${DEFAULT_FONT_SIZE};
  height: ${DEFAULT_FONT_SIZE};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid ${BORDER};
`;

export async function layoutChart({ graph }: { graph: any }) {
  try {
    const layout = await elk.layout(graph, {
      layoutOptions: {
        algorithm: "layered",
        "elk.direction": "RIGHT",
        "nodePlacement.bk.fixedAlignment": "BALANCED",
        considerModelOrder: "NODES_AND_EDGES",
        edgeRouting: "SPLINES",
        nodeSpacing: "30",
        "spacing.baseValue": DEFAULT_NODE_WIDTH + "",
      },
    });

    return layout;
  } catch (error) {
    console.error("something went wrong", error);
  }
}

export function formatEdges(initialEdges: FlowProps["initialEdges"]) {
  return (initialEdges ?? []).map((e) => ({
    ...e,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));
}
