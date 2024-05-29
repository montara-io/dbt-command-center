import {
  AssetType,
  DbtRunTestErrorType,
  GenericStatus,
  GetLineageByRunIdQueryResponse,
  GetRunByIdQueryResponse,
  ModelRunStatus,
  RunEnvironment,
  RunType,
  SingleRun,
  TestStatus,
} from "@montara-io/core-data-types";
import { extractAssetsFromDbtLogs } from "@montara-io/frontend-backend-common";
import { ScorecardProps } from "../stories/Scorecard";

import { formatDate } from "../utils/date";
import Stopwatch from "../stories/Stopwatch";
import { formatDuration } from "../utils/time";
import { LineageProps } from "../components/common/Lineage/helpers";
import Typography from "../stories/Typography";

export const ModelRunStatusToGenericStatusMap: Record<
  ModelRunStatus,
  GenericStatus
> = {
  [ModelRunStatus.Error]: GenericStatus.failed,
  [ModelRunStatus.Skipped]: GenericStatus.neutral,
  [ModelRunStatus.Success]: GenericStatus.success,
  [ModelRunStatus.InProgress]: GenericStatus.in_progress,
  [ModelRunStatus.Pending]: GenericStatus.pending,
};

export const MONTARA_TARGET_FOLDER = "/montara_target";

export function getRunByIdResponseFromDbtLog({
  dbtLog,
}: {
  dbtLog: { output: string }[];
}): GetRunByIdQueryResponse {
  const strigifiedLog = dbtLog.map((log) => log.output).join("\n");
  const assets = extractAssetsFromDbtLogs({
    errorTestSeverity: true,
    modelTests: {},
    runLogs: strigifiedLog,
  });

  return {
    getRunById: {
      endDatetime: "",
      errors: {
        generalErrors: [],
        modelErrors: {},
        sourceErrors: {},
      },
      fullRefresh: false,
      isSmartRun: false,
      logsUrl: "",
      modelRunsDetails: Object.entries(assets).map(([name, asset]) => ({
        name,
        lastUpdatedByUser: {
          email: "",
        },
        lastUpdatedOn: "",
        ownerUser: {
          email: "",
        },
        pipelineId: "",
        rowsAffected: 0,
        status: asset.status || ModelRunStatus.InProgress,
        totalRowsCount: 0,
        versionNumber: "0",
        created: "",
        error: "",
        executionTime: 0,
        runId: "",
      })),
      runId: "",
      pipeline: { id: "", name: "" },
      projectId: "",
      runEnvironment: RunEnvironment.Production,
      startDatetime: "",
      status: GenericStatus.in_progress,
      triggerRunType: RunType.Manual,
      user: { email: "" },
      versionNumber: 1,
    },
  };
}

export const MockLineage: GetLineageByRunIdQueryResponse = {
  getLineageByRunId: {
    nodes: [
      {
        name: "node1",
        type: AssetType.Model,
        metadata: {},
      },
      {
        name: "node2",
        type: AssetType.Model,
        metadata: {},
      },
    ],
    edges: [{ from: "node1", to: "node2" }],
  },
};

export const RunTestStatusToGenericStatusMap: Record<
  TestStatus,
  GenericStatus
> = {
  [TestStatus.Failure]: GenericStatus.failed,
  [TestStatus.Pass]: GenericStatus.success,
  [TestStatus.Warning]: GenericStatus.failed,
  [TestStatus.Pending]: GenericStatus.pending,
};

export const ModelRunStatusToText: Record<ModelRunStatus, string> = {
  [ModelRunStatus.Error]: "Failed",
  [ModelRunStatus.Skipped]: "Skipped",
  [ModelRunStatus.Success]: "Success",
  [ModelRunStatus.InProgress]: "Running",
  [ModelRunStatus.Pending]: "Pending",
};

function isRunInProgress(run: SingleRun) {
  return (
    run?.status === GenericStatus.in_progress ||
    run?.status === GenericStatus.pending
  );
}

export enum RunDetailsColumnId {
  name = "name",
  status = "status",
  executionTime = "executionTime",
  rowsAffected = "rowsAffected",
  LastUpdatedByUser = "lastUpdatedByUser",
  totalRowsCount = "totalRowsCount",
}

export function getScorecardFromRunDetails({
  run,
  runDuration,
}: {
  run: GetRunByIdQueryResponse | undefined;
  runDuration: number;
}): ScorecardProps["items"] {
  if (!run?.getRunById) {
    return [];
  }

  return [
    {
      label: "Run date",
      value: formatDate(run.getRunById?.startDatetime),
      isHidden:
        run.getRunById?.status === GenericStatus.in_progress ||
        run.getRunById?.status === GenericStatus.pending,
      isCopyable: true,
    },
    {
      label: "Total Models",
      value: (
        <Typography>{run.getRunById?.modelRunsDetails?.length}</Typography>
      ),
    },
    {
      label: "Status",
      value: run?.getRunById?.status,
      isTag: true,
      isTagLoading: isRunInProgress(run?.getRunById),
    },
    {
      label: "Duration",
      hideOnMobile: true,
      value: isRunInProgress(run.getRunById) ? (
        <Stopwatch
          referenceStartTime={run?.getRunById?.startDatetime}
          label="Running"
        />
      ) : (
        <Typography>{formatDuration(runDuration)}</Typography>
      ),
    },
  ];
}

export function getModelsScorecardFromRunDetails({
  run,
}: {
  run: GetRunByIdQueryResponse | undefined;
}): ScorecardProps["items"] {
  if (!run?.getRunById) {
    return [];
  }
  const totalModels = (run?.getRunById?.modelRunsDetails ?? [])?.length;
  const numPendingModels = (run?.getRunById?.modelRunsDetails ?? [])?.filter(
    (m: { status: ModelRunStatus }) => m?.status === ModelRunStatus.Pending
  );

  const numInProgressModels = (run?.getRunById?.modelRunsDetails ?? []).filter(
    (m) => m?.status === ModelRunStatus.InProgress
  );
  const numCompletedModels = (run?.getRunById?.modelRunsDetails ?? []).filter(
    (m) => m?.status === ModelRunStatus.Success
  );

  return [
    {
      label: "Pending",
      value: <Typography>{numPendingModels?.length}</Typography>,
    },
    {
      label: "Running",
      value: <Typography>{numInProgressModels?.length}</Typography>,
    },
    {
      label: "Success",
      value: <Typography>{numCompletedModels?.length}</Typography>,
    },
    {
      label: "Failed",
      value: (
        <Typography>{totalModels - numCompletedModels?.length}</Typography>
      ),
    },
  ];
}

export function getModelRunStatusMap(
  runsData: GetRunByIdQueryResponse
): LineageProps["modelToRunStatus"] {
  const modelToRunStatus: LineageProps["modelToRunStatus"] = {};

  (runsData.getRunById?.modelRunsDetails ?? []).forEach((model) => {
    modelToRunStatus[model.name] = model.status || ModelRunStatus.Skipped;
  });

  return modelToRunStatus;
}

export enum RunDetailsTab {
  Pipeline,
  Models,
  Validations,
  Issues,
}

export const ValidationNameToLabelMap: Record<DbtRunTestErrorType, string> = {
  accepted_values_tolerance: "Accepted values",
  date_range_tolerance: "Date range",
  not_null_tolerance: "Required",
  range_tolerance: "Range",
  not_null: "Required",
  unique_tolerance: "Unique",
  relationships: "Relationships",
  unique: "Unique",
  accepted_values: "Accepted values",
};

export function getAssetNameFromRelationName(relationName: string) {
  return relationName.split(".").slice(-1)[0];
}

export type RunResultsJson = {
  elapsed_time: number;
  results: {
    relation_name: string;
    status: ModelRunStatus;
    execution_time: number;
    adapter_response: {
      rows_affected: 1;
    };
    timing: [
      {
        name: "compile";
        started_at: string;
        completed_at: string;
      },
      {
        name: "execute";
        started_at: string;
        completed_at: string;
      }
    ];
  }[];
};

export function enrichRunDataWithRunResultsJson({
  runData,
  runResultsJson,
}: {
  runData: GetRunByIdQueryResponse;
  runResultsJson: RunResultsJson;
}): GetRunByIdQueryResponse {
  const result = {
    getRunById: {
      ...runData.getRunById,
      startDatetime: getStartDateFromRunResultsJson(runResultsJson),
      status: runResultsJson.results?.some(
        (m) => m.status === ModelRunStatus.Error
      )
        ? GenericStatus.failed
        : GenericStatus.success,
      modelRunsDetails: runData.getRunById?.modelRunsDetails?.map((model) => {
        const runResult = (runResultsJson.results ?? []).find(
          (r) => model.name === getAssetNameFromRelationName(r.relation_name)
        );

        return {
          ...model,
          status: runResult?.status ?? model.status,
          executionTime: runResult?.execution_time ?? model.executionTime,
          rowsAffected: runResult?.adapter_response?.rows_affected ?? 0,
        };
      }),
    },
  };

  return result;
}

function getStartDateFromRunResultsJson(runResultsJson: RunResultsJson) {
  const allTiming = runResultsJson?.results
    .flatMap((r) => r.timing)
    .map((t) => new Date(t.started_at));

  const result = allTiming.length
    ? formatDate(allTiming.sort()[0].toISOString())
    : "";

  return result;
}
