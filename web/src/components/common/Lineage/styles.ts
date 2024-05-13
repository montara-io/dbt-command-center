import styled from "styled-components";
import { DEFAULT_SPACING, SMALL_SPACING } from "../../../constants/style-units";

export const StyledLineageComponent = styled.div<{ height?: string }>`
  ${({ height }) => (height ? `height: ${height};` : "")}
  .m-lineage-warning {
    display: flex;
    gap: ${DEFAULT_SPACING};
    align-items: center;
  }
  .m-lineage-filter {
    display: flex;
    align-items: end;
    gap: ${DEFAULT_SPACING};
    margin-top: ${SMALL_SPACING};
  }
`;
