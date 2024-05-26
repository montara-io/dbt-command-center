import {
  AssetType,
  RunTest,
  TestStatus,
  TestType,
} from "@montara-io/core-data-types";
import Accordion from "../stories/Accordion";
import DataTable, { DataTableSortOrder } from "../stories/DataTable";
import AssetTableCell from "../components/AssetTableCell";
import Tag from "../stories/Tag";
import {
  RunTestStatusToGenericStatusMap,
  ValidationNameToLabelMap,
} from "./helpers";
import { ButtonIcon } from "../stories/ButtonIcon";
import { required } from "../constants/colors";
import EllipsisText from "../stories/Typography/EllipsisText";
import { NOT_AVAILABLE_DASH } from "../constants";
import Icon from "../stories/Icon";
import { DEFAULT_FONT_SIZE } from "../constants/style-units";
import Typography from "../stories/Typography";
import { formatNumber } from "../utils/string";

type RunValidationTableProps = {
  isGenericValidation: boolean;
  runValidations: RunTest[];
  onErrorClick: () => void;
};

type FormattedRunTest = RunTest & { isModel: boolean };

function RunValidationsTable({
  runValidations,
  onErrorClick,
  isGenericValidation,
}: Readonly<RunValidationTableProps>) {
  const filteredRunValidations: FormattedRunTest[] = (runValidations ?? [])
    ?.filter(({ testType }) =>
      isGenericValidation
        ? testType === TestType.Generic
        : testType === TestType.Custom
    )
    .map((runValidation) => ({
      ...runValidation,
      isModel: true,
    }));
  if (!filteredRunValidations.length) {
    return null;
  }

  return (
    <Accordion
      headerText={
        isGenericValidation ? "Column validations" : "Custom validations"
      }
      isOpen={isGenericValidation || filteredRunValidations?.length < 15}
    >
      <DataTable
        id={"runDetails"}
        defaultSortField={"modelName"}
        defaultSortOrder={DataTableSortOrder.ASC}
        scrollHeight="calc(100vh - 30rem)"
        paginationRows={15}
        showPagination={filteredRunValidations.length > 15}
        headerData={[
          {
            field: "modelName",
            sortable: true,
            title: "Model",
            template: ({ modelName, isModel }: FormattedRunTest) => {
              return (
                <AssetTableCell
                  name={modelName}
                  assetType={isModel ? AssetType.Model : AssetType.Source}
                />
              );
            },
          },
          {
            field: "status",
            title: "Status",
            sortable: true,
            template: ({ status }: RunTest) => {
              return (
                <div className="m-flex-align-center">
                  <Tag status={RunTestStatusToGenericStatusMap[status]}>
                    {RunTestStatusToGenericStatusMap[status]}
                  </Tag>

                  {status === TestStatus.Failure && (
                    <ButtonIcon
                      color={required}
                      icon="exclamation-circle"
                      label="View error"
                      onClick={() => onErrorClick()}
                    />
                  )}
                </div>
              );
            },
          },
          {
            field: "columnName",
            title: "Column",
            helpIconText: "Column name on which the validation was performed",
            sortable: true,
            isHidden: !isGenericValidation,
            template: ({ columnName }: FormattedRunTest) => {
              return (
                <EllipsisText>{columnName || NOT_AVAILABLE_DASH}</EllipsisText>
              );
            },
          },
          {
            field: "testName",
            title: "Validation",
            sortable: true,
            template: ({ testName }: FormattedRunTest) => {
              return (
                <div className="m-flex-align-center">
                  <Icon iconName={"verified"} size={DEFAULT_FONT_SIZE} />
                  <Typography tooltip={testName}>
                    {ValidationNameToLabelMap[testName] || testName}
                  </Typography>
                </div>
              );
            },
          },

          {
            field: "faultyRecords",
            title: "Faulty records",
            helpIconText: "Number of records that failed the validation",
            sortable: true,
            hideOnMobile: true,
            isHidden: !isGenericValidation,
            template: ({
              faultyRecords,
              totalRecords,
              status,
              testType,
            }: RunTest) => {
              const faultyFormatted =
                Number(faultyRecords) > 0
                  ? formatNumber(faultyRecords)
                  : NOT_AVAILABLE_DASH;
              const totalFormatted =
                Number(totalRecords) > 0
                  ? formatNumber(totalRecords)
                  : NOT_AVAILABLE_DASH;
              if (status === TestStatus.Pass) {
                return <div className="m-without-faulty-records">0</div>;
              }
              if (testType === TestType.Custom) return NOT_AVAILABLE_DASH;

              if (faultyRecords && !totalRecords)
                return (
                  <div className="m-with-faulty-records">{faultyFormatted}</div>
                );
              return (
                <div className="m-with-faulty-records">
                  {`${faultyFormatted}/${totalFormatted} (${(
                    (faultyRecords / totalRecords) *
                    100
                  ).toFixed(2)}%)`}
                </div>
              );
            },
          },
          {
            field: "toleranceLevel",
            title: "Tolerance level",
            helpIconText:
              "The tolerance level for each constraint. For example, if the required constraint has a tolerance of 5%, then 5% of the rows in the dataset can have null values in this column.",
            template: ({ toleranceLevel, testType }: RunTest) => {
              if (testType === TestType.Custom) return NOT_AVAILABLE_DASH;
              return toleranceLevel ? `${toleranceLevel}%` : NOT_AVAILABLE_DASH;
            },
            isHidden: !isGenericValidation,
            hideOnMobile: true,
          },
        ]}
        bodyData={filteredRunValidations}
      />
    </Accordion>
  );
}

export default RunValidationsTable;
