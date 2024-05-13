import {
  ModelRunStatus,
  RunEnvironment,
  TestStatus,
} from "@montara-io/core-data-types";
import { GenericStatus } from "../enums";
import { ScorecardProps } from "../stories/Scorecard";
import { GetRunByIdQueryResponse, SingleRun } from "../types/run";
import { formatDate, getSecondsDiffBetweenDates } from "../utils/date";
import Stopwatch from "../stories/Stopwatch";
import { formatDuration } from "../utils/time";
import { DbtRunTestErrorType } from "../types/dbt-run-error";

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
}: {
  run: GetRunByIdQueryResponse | undefined;
}): ScorecardProps["items"] {
  if (!run?.getRunById) {
    return [];
  }
  return [
    {
      label: "Run date (UTC)",
      value: formatDate(run.getRunById?.startDatetime),
      isHidden:
        run.getRunById?.status === GenericStatus.in_progress ||
        run.getRunById?.status === GenericStatus.pending,
      isCopyable: true,
    },
    {
      label: "Status",
      value: run.getRunById.status,
      isTag: true,
      isTagLoading: isRunInProgress(run.getRunById),
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
        formatDuration(
          getSecondsDiffBetweenDates(
            run?.getRunById?.startDatetime,
            run.getRunById?.endDatetime
          )
        )
      ),
    },
  ];
}

// export function getModelRunStatusMap(
//   runsData: GetRunByIdQueryResponse
// ): LineageProps["modelToRunStatus"] {
//   const modelToRunStatus: LineageProps["modelToRunStatus"] = {};

//   (runsData.getRunById?.modelRunsDetails ?? []).forEach(
//     (model: { name: string | number; status: GenericStatus }) => {
//       modelToRunStatus[model.name] = model.status || ModelRunStatus.Skipped;
//     }
//   );

//   return modelToRunStatus;
// }

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

export function buildInProgressMessage(runData: GetRunByIdQueryResponse) {
  const totalModels = (runData?.getRunById?.modelRunsDetails ?? [])?.length;
  const numPendingModels = (
    runData?.getRunById?.modelRunsDetails ?? []
  )?.filter(
    (m: { status: GenericStatus }) => m?.status === ModelRunStatus.Pending
  );
  const showSkippedModels =
    runData?.getRunById?.runEnvironment === RunEnvironment.Staging;
  const numSkippedModels = (runData?.getRunById?.modelRunsDetails ?? []).filter(
    (m) => m?.status === ModelRunStatus.Skipped
  );
  const numInProgressModels = (
    runData?.getRunById?.modelRunsDetails ?? []
  ).filter((m) => m?.status === ModelRunStatus.InProgress);
  const numCompletedModels = (
    runData?.getRunById?.modelRunsDetails ?? []
  ).filter((m) => m?.status === ModelRunStatus.Success);
  if (
    !!numCompletedModels?.length &&
    numCompletedModels?.length === totalModels
  ) {
    return "All models ran successfully";
  } else {
    return `Pending: ${numPendingModels?.length}, ${
      showSkippedModels ? `Skipped: ${numSkippedModels?.length},` : ""
    } In progress: ${numInProgressModels?.length}, Completed: ${
      numCompletedModels?.length
    }/${totalModels}`;
  }
}
