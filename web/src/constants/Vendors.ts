import { BiVendor, WarehouseType } from "@montara-io/core-data-types";

export const VENDOR_TO_ICON: Record<WarehouseType | BiVendor, string> = {
  [WarehouseType.Snowflake]: "/assets/v2/logos_snowflake.svg",
  [WarehouseType.Redshift]: "/assets/v2/logos_redshift.svg",
  [WarehouseType.Postgres]: "/assets/v2/logos_postgres.svg",
  [WarehouseType.BigQuery]: "/assets/v2/logos_bigquery.svg",
  [WarehouseType.Athena]: "/assets/v2/logos_aws-athena.svg",
  [BiVendor.Tableau]: "/assets/v2/logos_tableau.png",
  [BiVendor.Looker]: "/assets/v2/logos_looker.svg",
  [BiVendor.PowerBI]: "/assets/v2/logos_powerbi.svg",
  [BiVendor.MontaraReport]: "/assets/v2/logos_montara-report.svg",
};

export const VENDOR_TO_NAME: Record<WarehouseType | BiVendor, string> = {
  [WarehouseType.Snowflake]: "Snowflake",
  [WarehouseType.Redshift]: "Redshift",
  [WarehouseType.Postgres]: "Postgres",
  [WarehouseType.BigQuery]: "BigQuery",
  [WarehouseType.Athena]: "AWS Athena",
  [BiVendor.Tableau]: "Tableau",
  [BiVendor.Looker]: "Looker",
  [BiVendor.PowerBI]: "PowerBI",
  [BiVendor.MontaraReport]: "Montara",
};
