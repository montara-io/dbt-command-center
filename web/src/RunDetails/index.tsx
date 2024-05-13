import styled from "styled-components";
import { RunDetailsTab, getScorecardFromRunDetails } from "./helpers";
import { useEffect, useState } from "react";

import RunDetailsModels from "./RunDetailsModels";
import { AnalyticsEvent, trackEvent } from "../services/analytics";
import Scorecard from "../stories/Scorecard";
import Tabs from "../stories/Tabs";
import { MockRun } from "../mocks/MockRun";
import RunDetailsGraph from "./RunDetailsGraph";
import RunValidations from "./RunValidations";
import { RunEnvironment } from "@montara-io/core-data-types";
import RunLog from "./RunLog";

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
              {
                header: "Pipeline",
                icon: "share-alt",
                content: (
                  <RunDetailsGraph
                    setActiveIndex={setActiveIndex}
                    runData={MockRun}
                  />
                ),
              },
              {
                header: "Models",
                icon: "box",
                content: <RunDetailsModels runData={MockRun} />,
              },
              {
                header: "Validations",
                icon: "verified",
                content:
                  activeIndex === RunDetailsTab.Validations ? (
                    <RunValidations
                      runEnvironment={RunEnvironment.Production}
                      isInProgressRun={false}
                      onErrorClick={() => {
                        setActiveIndex(RunDetailsTab.Issues);
                      }}
                    />
                  ) : (
                    <></>
                  ),
              },
              {
                header: "Errors",
                icon: "exclamation-circle",
                content: <RunLog isInProgressRun={false} />,
              },
            ]}
          />
        </>
      }
    </StyledRunDetails>
  );
}

export default RunDetails;
