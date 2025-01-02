import styled from "styled-components";
import { BORDER_LIGHT, PRIMARY } from "../../constants/colors";
import {
  BUTTON_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  SMALL_FONT_SIZE,
  SMALL_SPACING,
  TINY_SPACING,
} from "../../constants/style-units";
import { isMobileDevice } from "../../utils/responsiveness";

const StyledDataTable = styled.div`
  height: 100%;
  .m-table-title {
    margin-top: 0;
  }
  * {
    outline: none;
    box-shadow: none;
  }

  .p-datatable .p-datatable-scrollable-header {
    background-color: white;
  }

  button {
    &:hover {
      background: none;
    }
  }

  .p-inputtext.p-component.p-column-filter {
    color: ${PRIMARY};
    font-family: inherit;
    font-weight: 500;

    &.p-filled {
      font-style: inherit;
    }
  }

  .m-header-table {
    font-family: Poppins, sans-serif;
    font-size: ${DEFAULT_FONT_SIZE};
    display: flex;
    justify-content: flex-end;
    gap: ${SMALL_SPACING};
    align-items: center;
    .m-help-icon {
      padding-left: 0;
    }
  }

  .p-component {
    font-family: Poppins;
  }

  .p-datatable {
    .p-datatable-wrapper {
      border: 1px solid ${BORDER_LIGHT};
      max-width: 100%;
      overflow: auto;
    }
    tr {
      height: ${isMobileDevice() ? "5rem" : "2.5rem"};
      > td {
        padding: ${SMALL_SPACING};
        position: relative;
        .m-row-content,
        .m-row-content * {
          font-size: ${DEFAULT_FONT_SIZE};
        }

        .m-action-buttons {
          display: flex;
          * {
            overflow: initial;
            font-size: inherit;
          }
        }
      }
    }
    .p-datatable-thead > tr > th {
      padding: ${SMALL_SPACING};
    }
    .p-datatable-thead {
      tr:nth-child(2) {
        th {
          padding: ${SMALL_SPACING};
        }
      }

      .p-sortable-column-icon {
        position: absolute;
        right: 2%;
        top: 38%;
      }

      .p-column-title {
        float: none;
      }

      .p-sortable-disabled {
        opacity: 0.4;
      }

      .pi-sort-alt,
      .pi-sort-amount-down {
        background-image: url("/assets/v2/sort-descending-icon.svg");
        height: 11px;
        background-size: 0.8rem;
      }

      .pi-sort-alt {
        filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(191deg)
          brightness(99%) contrast(90%);
      }

      .pi-sort-amount-up-alt {
        background-image: url("/assets/v2/sort-ascending-icon.svg");
        height: 11px;
        background-size: 0.8rem;
      }

      .pi-sort-amount-down,
      .pi-sort-amount-up-alt,
      .pi-sort-alt {
        background-repeat: no-repeat;

        &:before {
          content: "";
        }
      }
    }

    .p-datatable-thead > tr > th {
      vertical-align: top;
      text-align: center;
      font-size: ${DEFAULT_FONT_SIZE};
      color: ${PRIMARY};
    }
  }

  .p-paginator {
    font-size: ${SMALL_FONT_SIZE};
    font-weight: 500;
    color: ${PRIMARY};
    border-width: 0;
    padding-bottom: 0;
    padding-top: ${SMALL_SPACING};
    gap: ${TINY_SPACING};
    .p-link {
      font-family: inherit;
      font-size: ${SMALL_FONT_SIZE};
      &:focus {
        box-shadow: none;
      }
    }

    .p-paginator-element {
      font-size: ${SMALL_FONT_SIZE};
      color: ${PRIMARY};
    }
  }
  .m-button-link button {
    padding: 0;
  }

  .p-button-label {
    font-size: ${BUTTON_FONT_SIZE} !important;
  }
  .p-sortable-column.p-highlight:not(.p-sortable-disabled):hover {
    color: ${PRIMARY};
  }
  .p-datatable .p-sortable-column:focus {
    box-shadow: none;
  }
  .m-typography {
    max-width: 100%;
  }
  .m-table-search-filter {
    display: flex;
    gap: ${SMALL_SPACING};
    align-items: end;
    margin-bottom: ${SMALL_SPACING};
  }
  .p-datatable-emptymessage {
    font-size: ${DEFAULT_FONT_SIZE};
  }
`;

export default StyledDataTable;
