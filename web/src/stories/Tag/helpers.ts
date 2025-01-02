import { GenericStatus } from "@montara-io/core-data-types";
import {
  SUCCESS_BACKGROUND,
  WARNING_BACKGROUND,
  ERROR_BACKGROUND,
  NEUTRAL,
} from "../../constants/colors";

export const STATUS_TO_CONFIG: Record<
  GenericStatus,
  { background: string; text: string }
> = {
  [GenericStatus.success]: {
    background: SUCCESS_BACKGROUND,
    text: "Success",
  },
  [GenericStatus.completed]: {
    background: SUCCESS_BACKGROUND,
    text: "Completed",
  },
  [GenericStatus.pending]: {
    background: NEUTRAL,
    text: "Pending",
  },
  [GenericStatus.in_progress]: {
    background: WARNING_BACKGROUND,
    text: "In Progress",
  },
  [GenericStatus.failed]: {
    background: ERROR_BACKGROUND,
    text: "Failed",
  },
  [GenericStatus.neutral]: {
    background: NEUTRAL,
    text: "Neutral",
  },
};
