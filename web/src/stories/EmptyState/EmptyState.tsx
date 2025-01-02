import styled from "styled-components";

import classNames from "classnames";
import { PRIMARY } from "../../constants/colors";

const NO_DATA_MESSAGE = "No data to show";

const StyledEmptyState = styled.div`
  height: 16.5625em;
  position: relative;
  margin: auto;
  width: 100%;
  .no-data-icon {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
  .caption {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding-top: 60px;
    font: normal normal normal 12px/20px "Poppins";
    letter-spacing: 0px;
    color: ${PRIMARY};
  }
`;

interface EmptyStateProps {
  className?: string;
}

function EmptyState({ className }: Readonly<EmptyStateProps>) {
  return (
    <StyledEmptyState className={classNames("no-data-container", className)}>
      <img
        alt={NO_DATA_MESSAGE}
        className="no-data-icon"
        src="/assets/v2/no-data.png"
      />
      <span className="caption">{NO_DATA_MESSAGE}</span>
    </StyledEmptyState>
  );
}

export default EmptyState;
