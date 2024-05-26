import { Column } from "primereact/column";
import {
  DataTable as PDataTable,
  DataTableSortOrderType,
} from "primereact/datatable";
import { Ripple } from "primereact/ripple";
import { ReactNode, useEffect, useRef, useState } from "react";
import EmptyState from "../EmptyState/EmptyState";
import HelpIcon from "../HelpIcon";
import Typography from "../Typography";
import Tag from "../Tag";
import StyledDataTable from "./styles";
import { fuzzySearch } from "../../utils/sort";
import { sortByKey } from "../../utils/arrays";
import { SMALL_SPACING } from "../../constants/style-units";
import SearchInput from "../SearchInput";
import MidButton from "../MidButton";
import { isMobileDevice } from "../../utils/responsiveness";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataRow = { isActive?: boolean } & { [key: string]: any };

export enum DataTableSortOrder {
  ASC = 1,
  DESC = -1,
}

export type HeaderRow = {
  field: string;
  title: string;
  titleTag?: string;
  customElement?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template?: (data: any) => void;
  sortable?: boolean;
  sortField?: string;
  sortType?: "string" | "number";
  placeholder?: string;
  disabled?: boolean;
  scrollHeight?: string;
  helpIconText?: string;
  flexUnits?: number;
  isHidden?: boolean;
  hideOnMobile?: boolean;
  minWidth?: string;
};

export type DataTableProps = {
  id: string;
  bodyData: DataRow[];
  headerData: HeaderRow[];
  paginationRows?: number;
  onValueChange?: (value) => void;
  defaultSortField?: string;
  scrollHeight?: string;
  defaultSortOrder?: DataTableSortOrder;
  showPagination?: boolean;
  header?: string;
  filterColumn?: string;
  filterPlaceholder?: string;
};

function HeaderComponent({
  title,
  titleTag,
  helpIconText,
  flexUnits,
  customElement,
}: Readonly<{
  title: string;
  titleTag?: ReactNode;
  helpIconText?: string;
  flexUnits?: number;
  customElement?: ReactNode;
}>) {
  return (
    <div
      className="m-header-table"
      style={{ position: "relative", flex: flexUnits }}
    >
      <span className="m-table-header">{title}</span>
      <div>{!!helpIconText && <HelpIcon helpLinkTooltip={helpIconText} />}</div>
      {!!titleTag && <Tag>{titleTag}</Tag>}
      {!!customElement && customElement}
    </div>
  );
}

function DataTable({
  id,
  bodyData = [],
  headerData = [],
  paginationRows,
  onValueChange,
  defaultSortField,
  scrollHeight,
  defaultSortOrder = -1,
  showPagination = false,
  header,
  filterColumn,
  filterPlaceholder = "Search...",
}: Readonly<DataTableProps>) {
  const dt = useRef(null);
  const DESC = -1;
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState<DataTableSortOrderType>(
    defaultSortOrder as DataTableSortOrderType
  );
  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredBodyData = filterColumn
    ? sortByKey<DataRow>({
        arr: fuzzySearch<DataRow>({
          items: bodyData ?? [],
          searchTerm: searchFilter,
          keys: [filterColumn],
        }).map((r) => ({ ...r.obj })),
        key: filterColumn,
      })
    : bodyData;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dt?.current && (dt.current as any).reset();
  }, [dt]);

  const rowClass = (data) => {
    return {
      "row-opacity": data.isActive === false,
    };
  };

  const paginatorTemplate = {
    layout: "PrevPageLink CurrentPageReport NextPageLink",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={(e) => {
            options.onClick(e);
            document
              .querySelector(`#${id} .p-datatable-wrapper`)
              ?.scrollTo({ top: 0 });
          }}
          disabled={options.disabled}
        >
          <span className="p-p-3">{"< Prev"}</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={(e) => {
            options.onClick(e);
            document
              .querySelector(`#${id} .p-datatable-wrapper`)
              ?.scrollTo({ top: 0 });
          }}
          disabled={options.disabled}
        >
          <span className="p-p-3">{"Next >"}</span>
          <Ripple />
        </button>
      );
    },
    CurrentPageReport: ({ currentPage, totalPages }) => {
      return (
        <div className={currentPage > totalPages ? "p-disabled" : ""}>
          {currentPage}/{currentPage > totalPages ? "1" : totalPages}
        </div>
      );
    },
  };

  function buildContent(field, { template }, data) {
    return (
      <div className="m-row-content">
        {template ? template(data) : data[field]}
      </div>
    );
  }

  return (
    <StyledDataTable className="m-data-table">
      {!!header && (
        <div className="m-flex-align-center">
          <Typography
            className="m-table-title"
            variant="h3"
            style={{ marginBottom: SMALL_SPACING }}
          >
            {header}
          </Typography>
        </div>
      )}
      {!!filterColumn && (
        <div className="m-table-search-filter">
          <SearchInput
            onChange={setSearchFilter}
            value={searchFilter}
            placeholder={filterPlaceholder}
          />

          {!!searchFilter && (
            <MidButton
              id="clearFilter"
              isLight
              icon="filter-slash"
              label={"Clear filter"}
              onClick={() => {
                setSearchFilter("");
              }}
            />
          )}
        </div>
      )}
      <PDataTable
        onValueChange={onValueChange}
        scrollable
        scrollHeight={scrollHeight || "flex"}
        id={id}
        autoLayout={true}
        ref={dt}
        value={filteredBodyData}
        rowClassName={rowClass}
        dataKey="id"
        paginator={
          showPagination ||
          (!!paginationRows && paginationRows < filteredBodyData?.length)
        }
        rows={paginationRows || filteredBodyData.length || 1}
        paginatorTemplate={paginatorTemplate}
        resizableColumns={true}
        onSort={(e) => {
          setSortField(e.sortField);
          setSortOrder(e.sortOrder);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dt?.current && (dt.current as any).reset();
        }}
        emptyMessage={filterColumn ? "No results found" : <EmptyState />}
        sortField={sortField}
        sortOrder={sortOrder}
        defaultSortOrder={DESC as DataTableSortOrderType}
      >
        {headerData
          ?.filter(
            (h) => !h.isHidden && (isMobileDevice() ? !h.hideOnMobile : true)
          )
          .map(
            (
              {
                sortType = "string",
                title,
                titleTag,
                field,
                sortable,
                sortField,
                template,
                minWidth,
                disabled,
                helpIconText,
                flexUnits,
                customElement,
              }: HeaderRow,
              i
            ) => (
              <Column
                key={title || i}
                field={`${
                  sortType.toLowerCase() === "dropdown"
                    ? `${field.toLowerCase()}`
                    : field.toLowerCase()
                }`}
                style={{ width: "4rem", flex: flexUnits, minWidth }}
                header={() => (
                  <HeaderComponent
                    helpIconText={helpIconText}
                    title={title}
                    titleTag={titleTag}
                    flexUnits={flexUnits}
                    customElement={customElement}
                  />
                )}
                body={(data) => buildContent(field, { template }, data)}
                sortable={sortable}
                sortField={sortField || sortable ? field : undefined}
                sortableDisabled={disabled}
              />
            )
          )}
      </PDataTable>
    </StyledDataTable>
  );
}

export default DataTable;
