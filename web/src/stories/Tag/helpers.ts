import { GenericStatus } from "@montara-io/core-data-types";
import {
  ALERT_SUCCESS,
  ALERT_WARNING,
  FAILURE,
  NEUTRAL,
} from "../../constants/colors";

export const STATUS_TO_CONFIG: Record<
  GenericStatus,
  { background: string; text: string }
> = {
  [GenericStatus.success]: {
    background: ALERT_SUCCESS,
    text: "Success",
  },
  [GenericStatus.completed]: {
    background: ALERT_SUCCESS,
    text: "Completed",
  },
  [GenericStatus.pending]: {
    background: NEUTRAL,
    text: "Pending",
  },
  [GenericStatus.in_progress]: {
    background: ALERT_WARNING,
    text: "In Progress",
  },
  [GenericStatus.failed]: {
    background: FAILURE,
    text: "Failed",
  },
  [GenericStatus.neutral]: {
    background: NEUTRAL,
    text: "Neutral",
  },
};
