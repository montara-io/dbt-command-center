import styled from "styled-components";
import {
  RunDetailsTab,
  getScorecardFromRunDetails,
  getRunByIdResponseFromDbtLog,
  enrichRunDataWithRunResultsJson,
  RunResultsJson,
  MONTARA_TARGET_FOLDER,
  getModelsScorecardFromRunDetails,
  getDbtLogFromJsonArray,
  DbtLogJsonArray,
} from "./helpers";
import { useEffect, useState } from "react";

import RunDetailsModels from "./RunDetailsModels";
import { AnalyticsEvent, trackEvent } from "../services/analytics";
import Scorecard from "../stories/Scorecard";
import Tabs from "../stories/Tabs";
import RunDetailsGraph from "./RunDetailsGraph";
import {
  GenericStatus,
  GetRunByIdQueryResponse,
} from "@montara-io/core-data-types";

import { fetchJSONL } from "../services/json";
import Loading from "../stories/Loading";
import { DEFAULT_SPACING, SMALL_SPACING } from "../constants/style-units";
import Confetti from "../stories/Confetti";
import RunLog from "./RunLog";

const StyledRunDetails = styled.div`
  min-height: 95vh;
  font-family: var(--font-family);
  .m-scorecards-wrapper {
    display: flex;
    align-items: center;
    gap: ${DEFAULT_SPACING};
  }
  .m-scorecard {
    margin-bottom: ${SMALL_SPACING};
    .m-card {
      padding: 0;
    }
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
  const [dbtLog, setDbtLog] = useState<string>("");
  const [runDuration, setRunDuration] = useState<number>(0);
  const [isConfettiShown, setIsConfettiShown] = useState(false);

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
          setRunDuration(runResultsJson.elapsed_time);

          if (runData) {
            const newRunData = enrichRunDataWithRunResultsJson({
              runData,
              runResultsJson,
            });

            setRunData(newRunData);
            if (newRunData?.getRunById?.status === GenericStatus.success) {
              setIsConfettiShown(true);
            }
          }
          // eslint-disable-next-line no-empty
        } catch (error) {}
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
        runStartDate:
          runData?.getRunById?.startDatetime ?? new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dbtLog: jsonArray as any,
      });
      setDbtLog(getDbtLogFromJsonArray(jsonArray as DbtLogJsonArray));

      setRunData(newRunData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInProgressRun, runData?.getRunById?.startDatetime]);

  return (
    <StyledRunDetails>
      {!!isConfettiShown && <Confetti />}
      {runData ? (
        <>
          <div className="m-scorecards-wrapper">
            <Scorecard
              items={getScorecardFromRunDetails({
                run: runData,
                runDuration,
              })}
              isLoading={false}
              header={"Run details"}
              emptyText={""}
            />
            <Scorecard
              items={getModelsScorecardFromRunDetails({
                run: runData,
              })}
              isLoading={false}
              header={"Run status"}
              emptyText={""}
            />
          </div>

          <Tabs
            headerMaxWidth={"19.5rem"}
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
                header: "Logs",
                icon: "list",
                content: <RunLog dbtLog={dbtLog} />,
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
