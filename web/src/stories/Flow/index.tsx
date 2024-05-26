/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlowInstance,
} from "reactflow";

import "reactflow/dist/style.css";
import Loading from "../Loading";
import {
  LineageAssetTypeToStyles,
  DEFAULT_NODE_WIDTH,
  LineageLegendColor,
  layoutChart,
  RunGraphAssetTypeToStyles,
  formatEdges,
  DEFAULT_NODE_HEIGHT,
  NodeType,
  FlowVariant,
  FlowProps,
  FlowNode,
  NodeMenuId,
} from "./helpers";
import NodeWithIcon from "./NodeWithIcon";
import { StyledFlow } from "./styles";
import { ElkNode } from "elkjs/lib/elk-api";
import HelpIcon from "../HelpIcon";
import { isDesktopDevice } from "../../utils/responsiveness";
import { CustomEvent } from "../../constants/CustomEvent";
import { ModelRunStatus } from "@montara-io/core-data-types";
import { getGraph } from "../../services/graph";
import { DEFAULT_BORDER_RADIUS } from "../../constants/style-units";
import { BORDER } from "../../constants/colors";

const nodeTypes = {
  [NodeType.NodeWithIcon]: NodeWithIcon,
};

function Flow({
  initialNodes,
  initialEdges = [],
  height,
  onNodeClick,
  onNodeMenuClick,
  hideLegend = false,
  hideMinimap = false,
  fitView = true,
  variant = FlowVariant.Lineage,
}: Readonly<FlowProps>) {
  const [isLayoutLoading, setIsLayoutLoading] = useState(false);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();

  const [layoutValue, setLayoutValue] = useState<ElkNode | undefined>();
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>(formatEdges(initialEdges));

  const AssetToStyleMapping =
    variant === FlowVariant.Lineage
      ? LineageAssetTypeToStyles
      : RunGraphAssetTypeToStyles;

  function onInit(flowInstance: ReactFlowInstance) {
    setFlowInstance(flowInstance);
  }

  useEffect(() => {
    const listener = () => {
      flowInstance?.fitView();
    };
    flowInstance &&
      document.addEventListener(CustomEvent.TRIGGER_FIT_VIEW, listener);

    return () =>
      document.removeEventListener(CustomEvent.TRIGGER_FIT_VIEW, listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowInstance]);

  useEffect(() => {
    async function layout() {
      if (!initialNodes?.length) {
        setIsLayoutLoading(true);
      }

      try {
        const graph = {
          id: "root",
          children: initialNodes.map((n) => ({
            id: n.id,
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_NODE_HEIGHT,
          })),
          edges: initialEdges.map((e) => ({
            id: e.id,
            sources: [e.source],
            targets: [e.target],
          })),
        };

        const value = await layoutChart({ graph });

        setLayoutValue(value);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLayoutLoading(false);
      }
    }
    layout();
  }, [initialEdges, initialNodes]);

  useEffect(() => {
    if (layoutValue?.children?.length) {
      setNodes(
        initialNodes.map((n) => {
          const node = layoutValue?.children?.find((c: any) => c.id === n.id);

          return {
            id: n.id,
            label: n.label,
            data: {
              ...n,
              onNodeMenuClick: (menuId) => {
                typeof onNodeMenuClick === "function" &&
                  onNodeMenuClick({ node: n, menuId: menuId });
                setTimeout(() => {
                  menuId === NodeMenuId.FilterLineage &&
                    flowInstance?.fitView();
                }, 500);
                if (menuId === NodeMenuId.HighlightLineage) {
                  const newSelectedNodes =
                    getGraph({
                      edges: edges.map((e) => ({
                        from: e.source,
                        to: e.target,
                      })),
                      nodes: nodes.map((n) => n.id),
                    }).getSubgraphByNode(n.id) ?? [];

                  setSelectedNodes(newSelectedNodes);
                } else if (menuId === NodeMenuId.RemoveHighlight) {
                  setSelectedNodes([]);
                }
              },
              tags: n.tags ?? [],
            },
            type: NodeType.NodeWithIcon,
            position: { x: node?.x ?? 0, y: node?.y ?? 0 },
            style: {
              ...AssetToStyleMapping[
                variant === FlowVariant.Lineage
                  ? n.assetType
                  : n.runStatus ?? ModelRunStatus.Success
              ],

              borderRadius: DEFAULT_BORDER_RADIUS,
              ...(n.styles || {}),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          };
        })
      );

      setEdges(formatEdges(initialEdges));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutValue]);

  useEffect(() => {
    const newNodes = nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        isDisabled: !!selectedNodes?.length && !selectedNodes.includes(n.id),
        isHighlighted: !!selectedNodes?.length && selectedNodes.includes(n.id),
      },
    }));

    setNodes(newNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodes]);

  return (
    <StyledFlow className="m-flow" height={height}>
      {isLayoutLoading ? (
        <Loading />
      ) : (
        <>
          <ReactFlow
            fitView={fitView}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onInit={onInit}
            proOptions={{
              hideAttribution: true,
            }}
            onNodeClick={(e) => {
              const target = e.target as HTMLElement;

              if (
                target.classList.contains("m-menu-icon") ||
                target.classList.contains("mantine-Menu-itemLabel") ||
                target.classList.contains("m-menu-item-icon")
              ) {
                return;
              }
              let nodeId = target.getAttribute("data-id");
              if (!nodeId) {
                const parent = target.closest(
                  ".react-flow__node"
                ) as HTMLElement;
                nodeId = parent ? parent.getAttribute("data-id") : null;
              }
              typeof onNodeClick === "function" &&
                onNodeClick({
                  node: initialNodes.find((n) => n.id === nodeId) as FlowNode,
                });
            }}
          >
            <Controls showInteractive={false} position="top-right" />
            <Background color={BORDER} gap={16} />
            {isDesktopDevice() && !hideMinimap && <MiniMap pannable={true} />}
          </ReactFlow>
          {!hideLegend && (
            <div className="m-lineage-legend">
              {Object.keys(AssetToStyleMapping).map((at) => (
                <div key={at} className="lineage-legend__item">
                  <LineageLegendColor
                    color={AssetToStyleMapping[at].background}
                  />
                  <div>{AssetToStyleMapping[at].label}</div>
                  {!!AssetToStyleMapping[at].helpIconText && (
                    <HelpIcon
                      helpLinkTooltip={AssetToStyleMapping[at].helpIconText}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </StyledFlow>
  );
}

export default Flow;
