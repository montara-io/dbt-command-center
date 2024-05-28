import styled from "styled-components";
import {
  RunDetailsTab,
  getScorecardFromRunDetails,
  getRunByIdResponseFromDbtLog,
  enrichRunDataWithRunResultsJson,
  RunResultsJson,
} from "./helpers";
import { useEffect, useState } from "react";

import RunDetailsModels from "./RunDetailsModels";
import { AnalyticsEvent, trackEvent } from "../services/analytics";
import Scorecard from "../stories/Scorecard";
import Tabs from "../stories/Tabs";
import RunDetailsGraph from "./RunDetailsGraph";
import RunValidations from "./RunValidations";
import {
  GenericStatus,
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

const MONTARA_TARGET_FOLDER = "/montara_target";

function RunDetails() {
  const [activeIndex, setActiveIndex] = useState(RunDetailsTab.Pipeline);
  const [runData, setRunData] = useState<GetRunByIdQueryResponse>();
  const isInProgressRun =
    !runData?.getRunById?.status ||
    runData?.getRunById?.status === GenericStatus.in_progress;

  useEffect(() => {
    async function getRunResultsJson() {
      if (isInProgressRun) {
        try {
          const runResults = await fetch(
            `${MONTARA_TARGET_FOLDER}/run_results.json`
          );
          const runResultsJson: RunResultsJson = await runResults.json();
          if (runData) {
            const newRunData = enrichRunDataWithRunResultsJson({
              runData,
              runResultsJson,
            });
            setRunData(newRunData);
          }
        } catch (error) {
          console.log("error in finding run results json");
        }
      }
    }

    getRunResultsJson();
  }, [isInProgressRun, runData]);

  useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvent.UserViewedRunDetails,
    });

    const interval = setInterval(async () => {
      if (!isInProgressRun) return;

      const jsonArray = await fetchJSONL(
        `${MONTARA_TARGET_FOLDER}/output.jsonl`
      );
      const newRunData = getRunByIdResponseFromDbtLog({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dbtLog: jsonArray as any,
      });

      setRunData(newRunData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInProgressRun]);

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
