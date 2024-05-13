import { Graph as DadgeGraph } from "@dagrejs/graphlib";
import { removeDuplicates } from "../../../../../local_env/services/analytics-platform-ui/src/utils/arrays";

export class Graph {
  graph: DadgeGraph;

  constructor() {
    this.graph = new DadgeGraph({ directed: true });
  }

  addNode(name: string) {
    this.graph.setNode(name);
  }

  addEdge(from: string, to: string) {
    this.graph.setEdge(from, to);
  }

  getNodes() {
    return this.graph.nodes();
  }

  getEdges() {
    return this.graph.edges();
  }

  getDownstreamNodes(nodeName: string): string[] {
    const visited = new Set<string>();

    const dfs = (node: string) => {
      if (!visited.has(node)) {
        visited.add(node);
        const successors = this.graph.successors(node) || [];
        for (const successor of successors) {
          dfs(successor);
        }
      }
    };

    dfs(nodeName);

    return Array.from(visited);
  }

  getUpstreamNodes(nodeName: string): string[] {
    const visited = new Set<string>();

    const dfs = (node: string) => {
      if (!visited.has(node)) {
        visited.add(node);
        const predecessors = this.graph.predecessors(node) || [];
        for (const predecessor of predecessors) {
          dfs(predecessor);
        }
      }
    };

    dfs(nodeName);

    return Array.from(visited);
  }

  getDirectUpstreamNodes(nodeName: string): string[] {
    return this.graph.predecessors(nodeName) || [];
  }

  getDirectDownstreamNodes(nodeName: string): string[] {
    return this.graph.successors(nodeName) || [];
  }

  getSubgraphByNode(nodeName: string): string[] {
    return removeDuplicates(
      [nodeName]
        .concat(this.getUpstreamNodes(nodeName))
        .concat(this.getDownstreamNodes(nodeName) || [])
    );
  }
}

export function getGraph({
  nodes,
  edges,
}: {
  nodes: string[];
  edges: { from: string; to: string }[];
}): Graph {
  const graph = new Graph();
  nodes.forEach((node) => graph.addNode(node));
  edges.forEach(({ from, to }) => graph.addEdge(from, to));

  return graph;
}
