import { ModelRunStatus } from "@montara-io/core-data-types";
import { GenericStatus } from "../enums";
import DbtRunError from "./dbt-run-error";

export type ModelRunDetails = {
  pipelineId: string;
  name: string;
  runId: string;
  versionNumber: string;
  status: ModelRunStatus;
  ownerUser: {
    email: string;
  };
  lastUpdatedOn: string;
  lastUpdatedByUser: {
    email: string;
  };
  error: string;
  executionTime: number;
  rowsAffected: number;
  totalRowsCount: number;
  created: string;
};

export type SingleRun = {
  runId: string;
  projectId: string;
  startDatetime: string;
  endDatetime: string;
  versionNumber: number;
  status: GenericStatus;
  fullRefresh: boolean;
  logsUrl: string;
  errors: DbtRunError;
  modelRunsDetails: ModelRunDetails[];
  isSmartRun: boolean;
  user: {
    email: string;
  };
};

export type GetRunByIdQueryResponse = {
  getRunById: SingleRun;
};
