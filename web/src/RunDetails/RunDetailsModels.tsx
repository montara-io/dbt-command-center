import DataTable, { DataTableSortOrder } from '../../../stories/DataTable';
import {
  ModelRunStatusToGenericStatusMap,
  ModelRunStatusToText,
  RunDetailsColumnId,
} from './helpers';
import { GetRunByIdQueryResponse, ModelRunDetails } from '../../../hooks/useRuns/queries';
import { NOT_AVAILABLE_DASH } from '../../../constants';
import { formatDuration } from '../../../utils/time';
import NumberText from '../../../stories/Typography/NumberText';
import { formatDate } from '../../../utils/date';
import Tag from '../../../stories/Tag';
import { ButtonIcon } from '../../../stories/ButtonIcon';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../../../services/router/router.service';
import { Route } from '../../../constants/Routes';
import { UrlParam } from '../../../constants/UrlParams';
import AssetTableCell from '../../common/AssetTableCell';
import { AssetType } from '../../../utils/enums';
import styled from 'styled-components';

const StyledRunDetailsModels = styled.div``;

function RunDetailsModels({
  runData,
  onClose,
}: Readonly<{
  runData: GetRunByIdQueryResponse | undefined;
  onClose: any;
}>) {
  const navigate = useNavigate();

  return (
    <StyledRunDetailsModels>
      <DataTable
        id={'runDetails'}
        defaultSortField={'name'}
        defaultSortOrder={DataTableSortOrder.ASC}
        scrollHeight="calc(100vh - 30rem)"
        headerData={[
          {
            field: RunDetailsColumnId.name,
            sortable: true,
            title: 'Model name',
            template: ({ name }: ModelRunDetails) => (
              <AssetTableCell
                name={name}
                onClickCallback={() => onClose()}
                assetType={AssetType.Model}
              />
            ),
          },
          {
            field: RunDetailsColumnId.executionTime,
            title: 'Execution time',
            sortable: true,
            hideOnMobile: true,
            template: ({ executionTime }: ModelRunDetails) => {
              return formatDuration(executionTime);
            },
          },
          {
            field: RunDetailsColumnId.rowsAffected,
            title: 'Rows affected',
            hideOnMobile: true,
            sortable: true,
            template: ({ rowsAffected }: ModelRunDetails) => (
              <NumberText>{rowsAffected}</NumberText>
            ),
          },
          {
            field: RunDetailsColumnId.totalRowsCount,
            title: 'Total rows',
            sortable: true,
            hideOnMobile: true,
            template: ({ totalRowsCount }: ModelRunDetails) => (
              <NumberText>{totalRowsCount}</NumberText>
            ),
          },
          {
            field: RunDetailsColumnId.LastUpdatedByUser,
            title: 'Last edited',
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
            title: 'Updated by',
            sortable: true,
            hideOnMobile: true,
            template: ({ lastUpdatedByUser }: ModelRunDetails) => {
              return lastUpdatedByUser?.email || NOT_AVAILABLE_DASH;
            },
          },
          {
            field: RunDetailsColumnId.status,
            title: 'Run status',
            sortable: true,
            template: ({ status }: ModelRunDetails) => {
              return (
                <Tag status={ModelRunStatusToGenericStatusMap[status]}>
                  {ModelRunStatusToText[status]}
                </Tag>
              );
            },
          },
          {
            field: 'actionButtons',
            title: '',
            template: (rowData: ModelRunDetails) => {
              return (
                <div className="m-action-buttons">
                  <ButtonIcon
                    icon={'chart-line'}
                    label="All model runs"
                    onClick={() => {
                      onClose();
                      navigate(
                        getRoute({
                          path: Route.Observability,
                          urlParams: {
                            [UrlParam.OpenModelRunsModal]: true,
                            [UrlParam.ModelName]: rowData.name,
                            [UrlParam.Environment]: runData?.getRunById?.runEnvironment,
                          },
                        }),
                      );
                    }}
                  />
                </div>
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
