import styled from "styled-components";
import { isLaptopDevice } from "../../utils/responsiveness";

const StyledDot = styled.div<{ dotBackground: string; size?: string }>`
  display: inline-block;
  height: ${({ size }) => (size || isLaptopDevice() ? "0.35rem" : "0.4rem")};
  width: ${({ size }) => (size || isLaptopDevice() ? "0.35rem" : "0.4rem")};
  border-radius: 50%;
  background-color: ${({ dotBackground }) => dotBackground};
`;
export default StyledDot;
