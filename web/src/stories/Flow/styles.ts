import styled from "styled-components";

import { isMobileDevice } from "../../utils/responsiveness";
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  MID_SPACING,
  SMALL_SPACING,
  TINY_SPACING,
} from "../../constants/style-units";
import { BORDER_LIGHT, white } from "../../constants/colors";

const DEFAULT_HEIGHT_REM = isMobileDevice() ? 70 : 20;

export const StyledFlow = styled.div<{ height?: string }>`
  position: relative;
  height: ${({ height }) => height || DEFAULT_HEIGHT_REM + "rem"};
  }};
  width: 100%;
  .m-lineage-legend {
    position: absolute;
    left: ${SMALL_SPACING};
    bottom: ${SMALL_SPACING};
    display: flex;
    gap: ${isMobileDevice() ? DEFAULT_SPACING : MID_SPACING};
    padding: ${SMALL_SPACING};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    background-color: ${white};
    border: 1px solid ${BORDER_LIGHT};
    font-size: ${DEFAULT_FONT_SIZE};
    .lineage-legend__item {
      gap: ${isMobileDevice() ? TINY_SPACING : SMALL_SPACING};
      display: flex;
      align-items: center;
      justify-content: space-between;
      .m-help-icon {
        padding-left: 0;
        width: auto;
      }
    }
  }
`;
