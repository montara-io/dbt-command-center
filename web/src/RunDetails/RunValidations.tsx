/* eslint-disable no-constant-condition */
import styled from "styled-components";
import RunValidationsTable from "./RunValidationTable";
import { RunEnvironment } from "@montara-io/core-data-types";
import { CHECK, required } from "../constants/colors";
import Typography from "../stories/Typography";
import { MockRunTestsData } from "../mocks/MockRun";

type RunTestsProps = {
  runEnvironment: RunEnvironment;
  isInProgressRun: boolean;
  onErrorClick: () => void;
};

const StyledRunValidations = styled.div`
  .m-icon {
    width: fit-content;
  }
  .p-accordion-content {
    padding: 0 !important;
  }
  .m-with-faulty-records {
    color: ${required};
  }
  .m-without-faulty-records {
    color: ${CHECK};
  }
`;

function RunValidations({
  isInProgressRun,
  onErrorClick,
}: Readonly<RunTestsProps>) {
  const runTestsData = MockRunTestsData;
  return (
    <StyledRunValidations>
      {true ? (
        <>
          <RunValidationsTable
            isGenericValidation={true}
            onErrorClick={onErrorClick}
            runValidations={runTestsData?.getModelRunsTestDetails}
          />
          <RunValidationsTable
            isGenericValidation={false}
            onErrorClick={onErrorClick}
            runValidations={runTestsData?.getModelRunsTestDetails}
          />
        </>
      ) : (
        <Typography variant="h2" style={{ textAlign: "center" }}>
          {isInProgressRun
            ? "Run is in progress. Please wait for validations to complete."
            : "No model validations found for this run."}
        </Typography>
      )}
    </StyledRunValidations>
  );
}

export default RunValidations;
