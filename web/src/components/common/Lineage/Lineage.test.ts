import { AssetType } from '../../../utils/enums';
import { filterLineage, formatLineage } from './helpers';
import { GetLineageQueryResponse, LineageResponse } from '../../../hooks/useLineage/queries';
import { FlowVariant } from '../../../stories/Flow/helpers';
import { GetAllModelTagsResponse } from '../../../hooks/useModelTags/queries';

describe('Lineage service', () => {
  it('should format lineage response to flow props', async () => {
    const lineageReponse: LineageResponse = {
      nodes: [
        {
          name: '1',
          type: AssetType.Model,
          metadata: null,
        },
        {
          name: '2',
          type: AssetType.Model,
          metadata: null,
        },
      ],
      edges: [
        {
          from: '1',
          to: '2',
        },
      ],
    };

    expect(
      formatLineage({
        lineageData: lineageReponse,
        assetName: '1',
        showSkippedModels: true,
        variant: FlowVariant.Lineage,
      }),
    ).toEqual({
      initialEdges: [
        {
          id: '1-2',
          source: '1',
          target: '2',
        },
      ],
      initialNodes: [
        {
          assetType: AssetType.Model,
          id: '1',
          isCurrent: true,
          label: '1',
          tooltip: '1',
          icon: 'box',
          menuItems: [],
        },
        {
          assetType: AssetType.Model,
          id: '2',
          isCurrent: false,
          label: '2',
          tooltip: '2',
          icon: 'box',
          menuItems: [],
        },
      ],
    });
  });

  it('should format lineage response to flow props - Montara report', async () => {
    const lineageReponse: LineageResponse = {
      nodes: [
        {
          name: 'raw_listings',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'cleansed_listings',
          type: AssetType.Model,
          metadata: null,
        },
        {
          name: 'Test Dadi',
          type: AssetType.MontaraReport,
          metadata: {
            'Test Dadi': {
              owner: 'e5jj6ggu@ezztt.com',
            },
          },
        },
      ],
      edges: [
        {
          from: 'raw_listings',
          to: 'cleansed_listings',
        },
        {
          from: 'cleansed_listings',
          to: 'Test Dadi',
        },
      ],
    };

    expect(
      formatLineage({
        lineageData: lineageReponse,
        assetName: 'cleansed_listings',
        showSkippedModels: true,
        variant: FlowVariant.Lineage,
      }),
    ).toEqual({
      initialEdges: [
        {
          id: 'raw_listings-cleansed_listings',
          source: 'raw_listings',
          target: 'cleansed_listings',
        },
        {
          id: 'cleansed_listings-Test Dadi',
          source: 'cleansed_listings',
          target: 'Test Dadi',
        },
      ],
      initialNodes: [
        {
          assetType: AssetType.Source,
          id: 'raw_listings',
          isCurrent: false,
          label: 'raw_listings',
          iconPath: undefined,
          tooltip: 'raw_listings',
          icon: 'database',
          menuItems: [],
          runStatus: undefined,
        },
        {
          assetType: AssetType.Model,
          id: 'cleansed_listings',
          isCurrent: true,
          label: 'cleansed_listings',
          iconPath: undefined,
          tooltip: 'cleansed_listings',
          icon: 'box',
          menuItems: [],
          runStatus: undefined,
        },
        {
          assetType: AssetType.Report,
          id: 'Test Dadi',
          isCurrent: false,
          label: 'Test Dadi',
          iconPath: '/assets/v2/logo-s.svg',
          tooltip: 'Test Dadi. Owner: e5jj6ggu@ezztt.com',
          icon: undefined,
          menuItems: [],
          runStatus: undefined,
        },
      ],
    });
  });
  it('should format lineage response to flow props - Tableau report', async () => {
    const lineageReponse: LineageResponse = {
      nodes: [
        {
          name: 'cleansed_listings',
          type: AssetType.Model,
          metadata: null,
        },
        {
          name: 'Management KPIs',
          type: AssetType.Tableau,
          metadata: {
            'Management KPIs': {
              owner: 'Development Admin',
            },
          },
        },
      ],
      edges: [
        {
          from: 'CLEANSED_LISTINGS',
          to: 'Management KPIs',
        },
      ],
    };

    expect(
      formatLineage({
        lineageData: lineageReponse,
        assetName: 'CLEANSED_LISTINGS',
        showSkippedModels: true,
        variant: FlowVariant.Lineage,
      }),
    ).toEqual({
      initialEdges: [
        {
          id: 'cleansed_listings-Management KPIs',
          source: 'cleansed_listings',
          target: 'Management KPIs',
        },
      ],
      initialNodes: [
        {
          assetType: AssetType.Model,
          id: 'cleansed_listings',
          isCurrent: true,
          label: 'cleansed_listings',
          iconPath: undefined,
          tooltip: 'cleansed_listings',
          icon: 'box',
          menuItems: [],
          runStatus: undefined,
        },
        {
          assetType: AssetType.Report,
          id: 'Management KPIs',
          isCurrent: false,
          label: 'Management KPIs',
          iconPath: '/assets/v2/logos_tableau.png',
          tooltip: 'Management KPIs. Owner: Development Admin',
          menuItems: [],
          runStatus: undefined,
        },
      ],
    });
  });

  it('Should filter our sources in case of a rungraph variant', () => {
    const lineageReponse: LineageResponse = {
      nodes: [
        {
          name: 'cleansed_listings',
          type: AssetType.Model,
          metadata: null,
        },
        {
          name: 'Management KPIs',
          type: AssetType.Tableau,
          metadata: {
            'Management KPIs': {
              owner: 'Development Admin',
            },
          },
        },
      ],
      edges: [
        {
          from: 'CLEANSED_LISTINGS',
          to: 'Management KPIs',
        },
      ],
    };

    expect(
      formatLineage({
        lineageData: lineageReponse,
        showSkippedModels: true,
        variant: FlowVariant.RunGraph,
      }),
    ).toEqual({
      initialEdges: [],
      initialNodes: [
        {
          assetType: AssetType.Model,
          id: 'cleansed_listings',
          isCurrent: false,
          label: 'cleansed_listings',
          tooltip: 'cleansed_listings',
          icon: 'box',
          menuItems: [],
        },
      ],
    });
  });

  it('Should format Verbit assets', () => {
    const lineageReponse: LineageResponse = {
      nodes: [
        {
          name: 'consolidated_data_source',
          type: AssetType.Model,
          metadata: null,
        },
        {
          name: 'DIM_COMPANY',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'DIM_JOB_TYPE',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'DIM_PRODUCT_LINE',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'DIM_SF_ACCOUNT',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'MRR_VITAC_CUST_WITH_SFACCOUNTID',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_ACCOUNT_EXECUTIVE',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_ACCOUNT_OWNER',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_DIM_CURRENCY',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_DIM_CUSTOMER',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_DIM_PRODUCT_FAMILY',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_FACT_REVENUE',
          type: AssetType.Source,
          metadata: null,
        },
        {
          name: 'V_SF_ACCOUNT_MANAGER',
          type: AssetType.Source,
          metadata: null,
        },
      ],
      edges: [
        {
          from: 'DIM_COMPANY',
          to: 'consolidated_data_source',
        },
        {
          from: 'DIM_JOB_TYPE',
          to: 'consolidated_data_source',
        },
        {
          from: 'DIM_PRODUCT_LINE',
          to: 'consolidated_data_source',
        },
        {
          from: 'DIM_SF_ACCOUNT',
          to: 'consolidated_data_source',
        },
        {
          from: 'MRR_VITAC_CUST_WITH_SFACCOUNTID',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_ACCOUNT_EXECUTIVE',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_ACCOUNT_OWNER',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_DIM_CURRENCY',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_DIM_CUSTOMER',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_DIM_PRODUCT_FAMILY',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_FACT_REVENUE',
          to: 'consolidated_data_source',
        },
        {
          from: 'V_SF_ACCOUNT_MANAGER',
          to: 'consolidated_data_source',
        },
      ],
    };

    expect(
      formatLineage({
        lineageData: lineageReponse,
        showSkippedModels: false,
        variant: FlowVariant.Lineage,
      }).initialNodes,
    ).toHaveLength(13);
  });

  describe('lineage filters', () => {
    const lineageData: GetLineageQueryResponse = {
      getDbtLineage: {
        nodes: [
          {
            name: 'test',
            type: AssetType.Model,
            tags: ['tag1-id', 'tag2-id'],
            metadata: {},
          },
          {
            name: 'test2',
            type: AssetType.Model,
            metadata: {},
            tags: ['tag3-id'],
          },
        ],
        edges: [{ from: 'test', to: 'test2' }],
      },
    };

    const allModelTagsData: GetAllModelTagsResponse = {
      getAllModelTags: [
        { name: 'tag1', id: 'tag1-id' },
        {
          name: 'tag2',
          id: 'tag2-id',
        },
        {
          name: 'tag3',
          id: 'tag3-id',
        },
      ],
    };

    const projectData = {
      project: {
        id: 'project1',
        name: 'project1',
        isMainAhead: false,
        isOutOfSync: false,
        models: [],
        sources: [],
      },
    };

    it('should filter and format lineage data', () => {
      const result = filterLineage({
        lineageData: lineageData?.getDbtLineage,
        lineageFilters: { tags: [], pipelines: [] },
        allModelTagsData,
        projectData,
        isShowTags: true,
        modelToPipelineMap: {},
      });
      const expected: LineageResponse = {
        nodes: [
          {
            name: 'test',
            type: AssetType.Model,
            metadata: {},
            tags: [],
          },
          {
            name: 'test2',
            type: AssetType.Model,
            metadata: {},
            tags: [],
          },
        ],
        edges: [
          {
            from: 'test',
            to: 'test2',
          },
        ],
      };
      expect(result).toEqual(expected);
    });
  });
});
