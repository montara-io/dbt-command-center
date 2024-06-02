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
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";
import { MainActionType } from "../main.redux";
import { AnalyticsEvent, trackEvent } from "../services/analytics";

const StyledRunDetailsModels = styled.div``;

function RunDetailsModels({
  runData,
}: Readonly<{
  runData: GetRunByIdQueryResponse | undefined;
}>) {
  const [runningModels, setRunningModels] = useState<string[]>([]);
  const [, mainDispatch] = useContext(MainContext);

  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunDetailsModels,
    });
  }, []);

  useEffect(() => {
    const allRunningModels = (runData?.getRunById?.modelRunsDetails ?? []).map(
      (m) => m.name
    );
    const newRunningModels = allRunningModels.filter(
      (m) => !runningModels.includes(m)
    );

    newRunningModels.forEach((m) => {
      mainDispatch({
        type: MainActionType.ADD_TOAST,
        payload: {
          id: m,
          severity: "success",
          summary: `${m} is running`,
        },
      });
    });
    setRunningModels(allRunningModels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDispatch, runData?.getRunById?.modelRunsDetails]);

  const isRunInProgress =
    runData?.getRunById?.status === GenericStatus.pending ||
    runData?.getRunById?.status === GenericStatus.in_progress;
  return (
    <StyledRunDetailsModels>
      <DataTable
        id={"runDetails"}
        defaultSortField={"name"}
        defaultSortOrder={DataTableSortOrder.ASC}
        scrollHeight="calc(100vh - 18rem)"
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
