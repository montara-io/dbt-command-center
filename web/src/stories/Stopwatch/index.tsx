import { useEffect, useState } from "react";
import { stringifiedDateToTimestamp } from "../../utils/date";
import { formatDuration } from "../../utils/time";

function Stopwatch({
  referenceStartTime,
  label,
}: {
  referenceStartTime: string;
  label: string;
}) {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (referenceStartTime) {
        setDuration(
          Math.round(
            (Date.now() - stringifiedDateToTimestamp(referenceStartTime) || 0) /
              1000
          )
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [referenceStartTime]);

  return (
    <span>
      {duration
        ? `${label} ${label ? "(" : ""}approx. ${formatDuration(
            duration as number,
            {
              isAccurate: true,
            }
          )}${label ? ")" : ""}`
        : "-"}
    </span>
  );
}

export default Stopwatch;
