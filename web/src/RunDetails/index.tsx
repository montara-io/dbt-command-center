import styled from "styled-components";
import { RunDetailsTab, getScorecardFromRunDetails } from "./helpers";
import { useEffect, useState } from "react";

import RunDetailsModels from "./RunDetailsModels";
import { AnalyticsEvent, trackEvent } from "../services/analytics";
import Scorecard from "../stories/Scorecard";
import Tabs from "../stories/Tabs";
import { MockRun } from "../mocks/MockRun";

const StyledRunDetails = styled.div`
  min-height: 95vh;
  font-family: var(--font-family);
  .m-scorecard {
    margin-bottom: var(--small-spacing);
  }
  .m-card {
    margin-bottom: 0;
  }
  .m-scorecard-header {
    margin-top: 0 !important;
  }
`;

function RunDetails() {
  const [activeIndex, setActiveIndex] = useState(RunDetailsTab.Pipeline);

  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunDetails,
    });
  }, []);

  return (
    <StyledRunDetails>
      {
        <>
          <Scorecard
            items={getScorecardFromRunDetails({
              run: MockRun,
            })}
            isLoading={false}
            header={"Overview"}
            emptyText={""}
          />

          <Tabs
            headerMaxWidth={"28.5rem"}
            renderActiveOnly={false}
            extenalActiveIndex={activeIndex}
            externalOnTabChange={setActiveIndex}
            noPadding={true}
            tabPanels={[
              // {
              //   header: "Pipeline",
              //   icon: "share-alt",
              //   content: (
              //     <RunDetailsGraph
              //       setActiveIndex={setActiveIndex}
              //       runData={MockRun}
              //       onClose={onClose}
              //     />
              //   ),
              // },
              {
                header: "Models",
                icon: "box",
                content: <RunDetailsModels runData={MockRun} />,
              },
              // {
              //   header: "Validations",
              //   icon: "verified",
              //   content:
              //     activeIndex === RunDetailsTab.Validations ? (
              //       <RunValidations
              //         runId={runId}
              //         runEnvironment={
              //           runData?.getRunById?.runEnvironment ??
              //           RunEnvironment.Production
              //         }
              //         isInProgressRun={isInProgressRun}
              //         onErrorClick={() => {
              //           setActiveIndex(RunDetailsTab.Issues);
              //         }}
              //         onClose={onClose}
              //       />
              //     ) : (
              //       <></>
              //     ),
              // },
              // {
              //   header: "Errors",
              //   icon: "exclamation-circle",
              //   content: (
              //     <RunLog
              //       onClose={() => {
              //         onClose();
              //       }}
              //       runId={runId}
              //       isInProgressRun={isInProgressRun}
              //     />
              //   ),
              // },
            ]}
          />
        </>
      }
    </StyledRunDetails>
  );
}

export default RunDetails;
