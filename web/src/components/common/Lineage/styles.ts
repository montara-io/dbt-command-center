import styled from "styled-components";
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SPACING,
  SMALL_SPACING,
} from "../../../constants/style-units";
import { GRAY_260, white } from "../../../constants/colors";

export const StyledLineageComponent = styled.div<{ height?: string }>`
  ${({ height }) => (height ? `height: ${height};` : "")}
  .m-lineage-warning {
    display: flex;
    gap: ${DEFAULT_SPACING};
    align-items: center;
  }
  .m-filter-card {
    position: absolute;
    margin-top: 1.5rem;
    right: 7rem;
    z-index: 1;
    height: fit-content;
    min-width: 13rem;
    width: fit-content;
    background-color: ${white};
    .m-children-container {
      padding: ${DEFAULT_SPACING};
      .m-lineage-filter {
        display: flex;
        gap: ${DEFAULT_SPACING};
        align-items: end;
      }
    }
  }
  .m-flow {
    border: 1px solid ${GRAY_260};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    padding: ${SMALL_SPACING};
  }
`;
