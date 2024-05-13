import styled from "styled-components";
import { GetRunByIdQueryResponse, ModelRunDetails } from "../types/run";
import DataTable, { DataTableSortOrder } from "../stories/DataTable";
import {
  ModelRunStatusToGenericStatusMap,
  ModelRunStatusToText,
  RunDetailsColumnId,
} from "./helpers";
import AssetTableCell from "../components/AssetTableCell";
import { AssetType } from "../enums";
import { formatDuration } from "../utils/time";
import NumberText from "../stories/Typography/NumberText";
import { formatDate } from "../utils/date";
import { NOT_AVAILABLE_DASH } from "../constants";
import Tag from "../stories/Tag";

const StyledRunDetailsModels = styled.div``;

function RunDetailsModels({
  runData,
}: Readonly<{
  runData: GetRunByIdQueryResponse | undefined;
}>) {
  return (
    <StyledRunDetailsModels>
      <DataTable
        id={"runDetails"}
        defaultSortField={"name"}
        defaultSortOrder={DataTableSortOrder.ASC}
        scrollHeight="calc(100vh - 30rem)"
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
              return formatDuration(executionTime);
            },
          },
          {
            field: RunDetailsColumnId.rowsAffected,
            title: "Rows affected",
            hideOnMobile: true,
            sortable: true,
            template: ({ rowsAffected }: ModelRunDetails) => (
              <NumberText>{rowsAffected}</NumberText>
            ),
          },
          {
            field: RunDetailsColumnId.totalRowsCount,
            title: "Total rows",
            sortable: true,
            hideOnMobile: true,
            template: ({ totalRowsCount }: ModelRunDetails) => (
              <NumberText>{totalRowsCount}</NumberText>
            ),
          },
          {
            field: RunDetailsColumnId.LastUpdatedByUser,
            title: "Last edited",
            sortable: true,
            hideOnMobile: true,
            template: ({ lastUpdatedOn }: ModelRunDetails) => {
              return lastUpdatedOn
                ? formatDate(lastUpdatedOn, { hideTime: false })
                : NOT_AVAILABLE_DASH;
            },
          },
          {
            field: RunDetailsColumnId.LastUpdatedByUser,
            title: "Updated by",
            sortable: true,
            hideOnMobile: true,
            template: ({ lastUpdatedByUser }: ModelRunDetails) => {
              return lastUpdatedByUser?.email || NOT_AVAILABLE_DASH;
            },
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