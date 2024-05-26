import {
  IconArrowsSplit,
  IconBraces,
  IconBrandBitbucket,
  IconBrandGithub,
  IconBrandSpeedtest,
  IconBulb,
  IconChartAreaLine,
  IconChartBar,
  IconChartDots,
  IconChecks,
  IconGitBranch,
  IconLayoutDashboard,
  IconLetterCaseUpper,
  IconPlug,
  IconRouteOff,
  IconSearchOff,
  IconSparkles,
  IconSql,
  IconTestPipe,
  IconUnlink,
  IconVariable,
  IconWand,
  IconWebhook,
  IconWorldSearch,
} from "@tabler/icons-react";
import Popover from "../Popover";
import PrimeReactIconType from "./prime-react-icon-types";
import { isMobileDevice } from "../../utils/responsiveness";

const TablerIcons = [
  "arrows-split",
  "bulb",
  "braces",
  "chart-area",
  "chart-dots",
  "checks",
  "git-branch",
  "layout-dashboard",
  "letter-case-upper",
  "webhook",
  "search-off",
  "test-pipe",
  "variable",
  "world-search",
  "speedtest",
  "wand",
  "github",
  "plug",
  "sql",
  "unlink",
  "route-off",
  "sparkles",
  "brand-bitbucket",
] as const;

const MontaraCustomIcons = ["horizontal-bar-chart", "dbt"] as const;
type TablerIconType = (typeof TablerIcons)[number];
export type IconType =
  | PrimeReactIconType
  | TablerIconType
  | (typeof MontaraCustomIcons)[number];

type IconProps = {
  iconName: IconType;
  color?: string;
  size?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  tooltip?: string;
};

const DEFAULT_STROKE = 1.65;

function Icon({
  iconName,
  color,
  size = isMobileDevice() ? "2.5rem" : "1.25rem",
  className = "",
  onClick,
  tooltip,
}: IconProps) {
  function handleClick(e) {
    typeof onClick === "function" && onClick(e);
  }
  let iconContent;
  if (TablerIcons.includes(iconName as TablerIconType)) {
    switch (iconName as TablerIconType) {
      case "webhook":
        iconContent = (
          <IconWebhook
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "arrows-split":
        iconContent = (
          <IconArrowsSplit
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "test-pipe":
        iconContent = (
          <IconTestPipe
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "variable":
        iconContent = (
          <IconVariable
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "world-search":
        iconContent = (
          <IconWorldSearch
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "speedtest":
        iconContent = (
          <IconBrandSpeedtest
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "wand":
        iconContent = (
          <IconWand
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "github":
        iconContent = (
          <IconBrandGithub
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "plug":
        iconContent = (
          <IconPlug
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "unlink":
        iconContent = (
          <IconUnlink
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "sparkles":
        iconContent = (
          <IconSparkles
            onClick={handleClick}
            stroke={0.8}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "bulb":
        iconContent = (
          <IconBulb
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "brand-bitbucket":
        iconContent = (
          <IconBrandBitbucket
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "route-off":
        iconContent = (
          <IconRouteOff
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "chart-area":
        iconContent = (
          <IconChartAreaLine
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );

        break;
      case "chart-dots":
        iconContent = (
          <IconChartDots
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "layout-dashboard":
        iconContent = (
          <IconLayoutDashboard
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "git-branch":
        iconContent = (
          <IconGitBranch
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;

      case "checks":
        iconContent = (
          <IconChecks
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "braces":
        iconContent = (
          <IconBraces
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "letter-case-upper":
        iconContent = (
          <IconLetterCaseUpper
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "sql":
        iconContent = (
          <IconSql
            onClick={handleClick}
            stroke={1.5}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
        break;
      case "search-off":
        iconContent = (
          <IconSearchOff
            onClick={handleClick}
            stroke={DEFAULT_STROKE}
            size={size}
            className={`m-icon m-icon-${iconName} ${className}`}
            color={color}
          />
        );
    }
  } else if (iconName === "horizontal-bar-chart") {
    iconContent = (
      <IconChartBar
        onClick={handleClick}
        stroke={DEFAULT_STROKE}
        size={size}
        className={`m-icon m-icon-${iconName} ${className}`}
        color={color}
        style={{ transform: "rotate(90deg)" }}
      />
    );
  } else if (iconName === "dbt") {
    iconContent = (
      <img
        className="m-logo"
        src={"/assets/v2/dbt-trademark.png"}
        alt="dbt-logo"
        style={{ width: size, height: size }}
      />
    );
  } else {
    iconContent = (
      <span
        onClick={handleClick}
        className={`m-icon pi pi-${iconName} m-icon-${iconName} ${className}`}
        style={{ color, fontSize: size }}
      />
    );
  }
  return tooltip ? (
    <Popover content={tooltip}>{iconContent}</Popover>
  ) : (
    iconContent
  );
}

export default Icon;
