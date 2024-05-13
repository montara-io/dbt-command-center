import EntityToIcon from "../constants/EntityToIcon";
import { DEFAULT_FONT_SIZE } from "../constants/style-units";
import { AssetType } from "../enums";
import Icon from "../stories/Icon";
import Typography from "../stories/Typography";

type AssetTableCellProps = Readonly<{
  name: string;
  assetType: AssetType.Model | AssetType.Source;
}>;

function AssetTableCell({ name, assetType }: AssetTableCellProps) {
  const assetName = name;
  return (
    <div className="m-flex-align-center" style={{ height: "100%" }}>
      <Icon iconName={EntityToIcon[assetType]} size={DEFAULT_FONT_SIZE} />
      <Typography isEllipsis tooltip={assetName}>
        {assetName}
      </Typography>
    </div>
  );
}

export default AssetTableCell;
