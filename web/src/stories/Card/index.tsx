import styled from "styled-components";
import {
  DEFAULT_BORDER_RADIUS,
  SMALL_SPACING,
} from "../../constants/style-units";

export type CardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  className?: string;
};

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 1.5px 1.5px 2px 1.5px #00000033;
  border-radius: ${DEFAULT_BORDER_RADIUS};

  .m-children-container {
    padding: ${SMALL_SPACING};
  }
`;

function Card({ children, className = "" }: Readonly<CardProps>) {
  return (
    <StyledCard className={`m-card ${className}`}>
      <div className="m-children-container">{children}</div>
    </StyledCard>
  );
}

export default Card;
