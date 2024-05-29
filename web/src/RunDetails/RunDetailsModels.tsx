import styled from "styled-components";
import DataTable, { DataTableSortOrder } from "../stories/DataTable";
import {
  ModelRunStatusToGenericStatusMap,
  ModelRunStatusToText,
  RunDetailsColumnId,
} from "./helpers";
import AssetTableCell from "../components/AssetTableCell";
import { formatDuration } from "../utils/time";
import NumberText from "../stories/Typography/NumberText";
import Tag from "../stories/Tag";
import {
  AssetType,
  GenericStatus,
  GetRunByIdQueryResponse,
  ModelRunDetails,
} from "@montara-io/core-data-types";
import Loading from "../stories/Loading";
import { LARGE_FONT_SIZE } from "../constants/style-units";

const StyledRunDetailsModels = styled.div``;

function RunDetailsModels({
  runData,
}: Readonly<{
  runData: GetRunByIdQueryResponse | undefined;
}>) {
  const isRunInProgress =
    runData?.getRunById?.status === GenericStatus.pending ||
    runData?.getRunById?.status === GenericStatus.in_progress;
  return (
    <StyledRunDetailsModels>
      <DataTable
        id={"runDetails"}
        defaultSortField={"name"}
        defaultSortOrder={DataTableSortOrder.ASC}
        scrollHeight="calc(100vh - 20rem)"
        headerData={[
          {
            field: RunDetailsColumnId.name,
            sortable: true,
            title: "Model name",
            template: ({ name }: ModelRunDetails) => (
              <AssetTableCell name={name} assetType={AssetType.Model} />
            ),
          },
          {
            field: RunDetailsColumnId.executionTime,
            title: "Execution time",
            sortable: true,
            hideOnMobile: true,
            template: ({ executionTime }: ModelRunDetails) => {
              return isRunInProgress ? (
                <Loading variant="spinner" width={LARGE_FONT_SIZE} />
              ) : (
                formatDuration(executionTime, { isAccurate: true })
              );
            },
          },
          {
            field: RunDetailsColumnId.rowsAffected,
            title: "Rows affected",
            hideOnMobile: true,
            sortable: true,
            template: ({ rowsAffected }: ModelRunDetails) =>
              isRunInProgress ? (
                <Loading variant="spinner" width={LARGE_FONT_SIZE} />
              ) : (
                <NumberText>{rowsAffected}</NumberText>
              ),
          },
          {
            field: RunDetailsColumnId.status,
            title: "Run status",
            sortable: true,
            template: ({ status }: ModelRunDetails) => {
              return (
                <Tag status={ModelRunStatusToGenericStatusMap[status]}>
                  {ModelRunStatusToText[status]}
                </Tag>
              );
            },
          },
        ]}
        bodyData={runData?.getRunById?.modelRunsDetails ?? []}
        filterColumn="name"
        filterPlaceholder="Search model(s)..."
      />
    </StyledRunDetailsModels>
  );
}

export default RunDetailsModels;
