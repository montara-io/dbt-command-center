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
  ModelRunStatus,
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
  const [runResult, setRunResult] = useState(ModelRunStatus.InProgress);

  const isInProgressRun = runResult === ModelRunStatus.InProgress;

  useEffect(() => {
    async function getRunResultsJson() {
      if (runResult === ModelRunStatus.InProgress) {
        try {
          const runResults = await fetch("/montara_target/run_results.json");
          const runResultsJson: { results: { status: ModelRunStatus }[] } =
            await runResults.json();
          const newRunResults = (runResultsJson.results ?? []).some(
            (r) => r.status === ModelRunStatus.Error
          )
            ? ModelRunStatus.Error
            : ModelRunStatus.Success;

          setRunResult(newRunResults);
        } catch (error) {
          console.log("error in finding run results json");
        }
      }
    }
    const interval = setInterval(async () => {
      getRunResultsJson();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunDetails,
    });

    const interval = setInterval(async () => {
      if (runResult !== ModelRunStatus.InProgress) return;

      const jsonArray = await fetchJSONL("/montara_target/output.jsonl");
      const newRunData = getRunByIdResponseFromDbtLog({
        dbtLog: jsonArray as any,
        runResult,
      });
      setRunData(newRunData);
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
                      isInProgressRun={isInProgressRun}
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
                content: <RunLog isInProgressRun={isInProgressRun} />,
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
