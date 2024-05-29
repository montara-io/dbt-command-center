import styled from "styled-components";
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SPACING,
  SMALL_SPACING,
} from "../../../constants/style-units";
import { GRAY_260 } from "../../../constants/colors";

export const StyledLineageComponent = styled.div<{ height?: string }>`
  ${({ height }) => (height ? `height: ${height};` : "")}
  .m-lineage-warning {
    display: flex;
    gap: ${DEFAULT_SPACING};
    align-items: center;
  }
  .m-lineage-filter {
    position: absolute;
    margin-top: 1.5rem;
    right: 7rem;
  }
  .m-flow {
    border: 1px solid ${GRAY_260};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    padding: ${SMALL_SPACING};
  }
`;
