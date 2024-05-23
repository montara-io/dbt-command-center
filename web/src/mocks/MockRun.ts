import {
  GenericStatus,
  GetModelRunsTestDetailsResponse,
  GetRunByIdQueryResponse,
  ModelRunStatus,
  RunEnvironment,
  RunType,
  TestStatus,
  TestType,
} from "@montara-io/core-data-types";

export const MockRun: GetRunByIdQueryResponse = {
  getRunById: {
    startDatetime: "2021-09-01T00:00:00.000Z",
    endDatetime: "2021-09-01T04:00:00.000Z",
    errors: {
      generalErrors: [],
      modelErrors: {},
      sourceErrors: {},
    },
    fullRefresh: false,
    isSmartRun: false,
    logsUrl: "",
    modelRunsDetails: [
      {
        name: "model1",
        lastUpdatedByUser: {
          email: "",
        },
        lastUpdatedOn: "2021-09-01T00:00:00.000Z",
        ownerUser: {
          email: "",
        },
        pipelineId: "",
        rowsAffected: 0,
        status: ModelRunStatus.Error,
        totalRowsCount: 0,
        versionNumber: "0",
        created: "2021-09-01T00:00:00.000Z",
        error: "",
        executionTime: 30,
        runId: "",
      },
      {
        name: "model2",
        lastUpdatedByUser: {
          email: "",
        },
        lastUpdatedOn: "2021-09-01T00:00:00.000Z",
        ownerUser: {
          email: "",
        },
        pipelineId: "",
        rowsAffected: 0,
        status: ModelRunStatus.Error,
        totalRowsCount: 3000,
        versionNumber: "0",
        created: "2021-09-01T00:00:00.000Z",
        error: "",
        executionTime: 30,
        runId: "",
      },
    ],
    projectId: "",
    runId: "",
    status: GenericStatus.completed,
    pipeline: {
      id: "",
      name: "",
    },
    user: {
      email: "",
    },
    versionNumber: 0,
    runEnvironment: RunEnvironment.Production,
    triggerRunType: RunType.Manual,
  },
};

export const MockRunTestsData: GetModelRunsTestDetailsResponse = {
  getModelRunsTestDetails: [
    {
      columnName: "column1",
      faultyRecords: 0,
      modelName: "model1",
      pipelineId: "",
      runId: "",
      status: TestStatus.Failure,
      testName: "test1",
      totalRecords: 0,
      testType: TestType.Generic,
      toleranceLevel: 0,
    },
  ],
};