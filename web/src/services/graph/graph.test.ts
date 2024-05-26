import { getGraph } from '.';

describe('Graph service', () => {
  it('should get upstream nodes', () => {
    const graph = getGraph({
      nodes: ['a', 'b', 'c', 'd', 'e'],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c' },
      ],
    });

    expect(graph.getUpstreamNodes('a')).toEqual(['a']);
  });

  it('should get downstream nodes', () => {
    const graph = getGraph({
      nodes: ['a', 'b', 'c', 'd', 'e'],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c' },
      ],
    });

    expect(graph.getDownstreamNodes('a')).toEqual(['a', 'b', 'c']);
  });

  it('should get subgraph by node', () => {
    const graph = getGraph({
      nodes: ['a', 'b', 'c', 'd', 'e'],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c' },
      ],
    });

    expect(graph.getSubgraphByNode('c')).toEqual(['c', 'b', 'a']);
    expect(graph.getSubgraphByNode('a')).toEqual(['a', 'b', 'c']);
  });
});
