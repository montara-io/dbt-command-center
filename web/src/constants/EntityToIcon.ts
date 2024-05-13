import { AssetType } from "../enums";
import { IconType } from "../stories/Icon";

const EntityToIcon: Record<
  AssetType.Model | AssetType.Source | "AiCompanion",
  IconType
> = {
  [AssetType.Model]: "box",
  [AssetType.Source]: "database",
  AiCompanion: "sparkles",
};

export default EntityToIcon;
