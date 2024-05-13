export type RunErrorType =
  | "NON_EXISTING_TABLE"
  | "NON_EXISTING_COLUMN"
  | "NON_EXISTING_FUNCTION"
  | "SYNTAX_ERROR"
  | "NON_EXISTING_SCHEMA"
  | "AMBIGUOUS_COLUMN"
  | "DUPLICATED_COLUMN"
  | "GENERAL_SQL_COMPILATION_ERROR"
  | "COMPILATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "RUNTIME_ERROR"
  | "FRESHNESS_ERROR"
  | "ACCESS_DENIED"
  | "NON_EXISTING_DATASET"
  | "IMPROPER_QUALIFIED_NAME"
  | "CROSS_DATABASE_REFERENCE"
  | "ACCESS_DENIED_OR_NOT_EXISTING_TABLE"
  | "VIEW_ARLEADY_EXIST"
  | "UNKNOWN_ERROR"
  | "GENERAL_ERROR";

export type DbtRunTestErrorType =
  | "not_null_tolerance"
  | "unique_tolerance"
  | "accepted_values_tolerance"
  | "date_range_tolerance"
  | "range_tolerance"
  // Errors that could come from external dbt repos
  | "not_null"
  | "unique"
  | "accepted_values"
  | "relationships";

type DbtRunError = {
  sourceErrors: {
    [assetName: string]: {
      errors?:
        | {
            type: RunErrorType;
            message: string;
          }[]
        | null; // Null is a convention for unknown error
      tests?: {
        type: DbtRunTestErrorType;
        column: string;
        toleranceLevel?: number | null;
        faultyRecords?: number;
        totalRecords: number;
      }[];
      custom_validation?: {
        name: string;
      }[];
    };
  };
  modelErrors: {
    [assetName: string]: {
      errors?:
        | {
            type: RunErrorType;
            message: string;
          }[]
        | null; // Null is a convention for unknown error
      tests?: {
        type: DbtRunTestErrorType;
        column: string;
        toleranceLevel?: number | null;
        faultyRecords?: number;
        totalRecords: number;
      }[];
      custom_validation?: {
        name: string;
      }[];
    };
  };
  generalErrors: {
    type: RunErrorType;
    message: string;
  }[];
};

export default DbtRunError;
