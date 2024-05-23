import styled from "styled-components";
import {
  RunDetailsTab,
  getScorecardFromRunDetails,
  getRunByIdResponseFromDbtLog,
} from "./helpers";
import { useEffect, useState } from "react";

import RunDetailsModels from "./RunDetailsModels";
import { AnalyticsEvent, trackEvent } from "../services/analytics";
import Scorecard from "../stories/Scorecard";
import Tabs from "../stories/Tabs";
import RunDetailsGraph from "./RunDetailsGraph";
import RunValidations from "./RunValidations";
import {
  GetRunByIdQueryResponse,
  RunEnvironment,
} from "@montara-io/core-data-types";
import RunLog from "./RunLog";
import { fetchJSONL } from "../services/json";
import Loading from "../stories/Loading";

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
  const [runData, setRunData] = useState<GetRunByIdQueryResponse>();

  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunDetails,
    });

    const interval = setInterval(async () => {
      const jsonArray = await fetchJSONL("/montara_target/output.jsonl");
      setRunData(getRunByIdResponseFromDbtLog(jsonArray as any));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledRunDetails>
      {runData ? (
        <>
          <Scorecard
            items={getScorecardFromRunDetails({
              run: runData,
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
                    runData={runData}
                  />
                ),
              },
              {
                header: "Models",
                icon: "box",
                content: <RunDetailsModels runData={runData} />,
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
      ) : (
        <Loading />
      )}
    </StyledRunDetails>
  );
}

export default RunDetails;
