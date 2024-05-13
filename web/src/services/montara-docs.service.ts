import { PROFILE_URL_PARAM } from '../constants';
import { getConfig } from './env';

export enum MontaraDocsPage {
  Welcome = '/Welcome/',
  Develop = '/category/develop/',
  DevelopModel = '/Transform/Develop/Models/',
  Tolerance = '/Transform/Develop/Models/#data-validation',
  CustomValidations = '/Transform/Develop/Models/#custom-validation',
  DevelopSource = '/Transform/Develop/Sources/',
  Versions = '/Transform/Versions/',
  DataCatalog = '/Transform/DataCatalog/',
  RunHistory = '/Run/RunHistory/',
  Pipelines = '/Run/Pipelines/',
  Variables = '/Run/Variables/',
  Webhooks = '/Run/Pipelines/#webhook-run',
  Observability = '/Run/Observability/',
  Analyze = '/category/analyze/',
  Collections = '/Analyze/Collections/',
  Reports = '/Analyze/Reports/',
  Settings = '/Settings/',
  Snowflake = '/Settings/Integrations/Warehouse/Snowflake/',
  BigQuery = '/Settings/Integrations/Warehouse/BigQuery/',
  Redshift = '/Settings/Integrations/Warehouse/Redshift/',
  Postgres = '/Settings/Integrations/Warehouse/Postgres/',
  Athena = '/Settings/Integrations/Warehouse/Athena/',
  Roles = '/Settings/UsersRoles/',
  SlackNotifications = '/Settings/SlackNotifications/',
  WarehouseConnection = '/Settings/#warehouse-connection/',
  BiTool = '/Settings/#bi-tool',
  Tableau = '/Settings/Integrations/BI/Tableau/',
  Looker = '/Settings/Integrations/BI/Looker/',
  PowerBI = '/Settings/Integrations/BI/PowerBI/',
  Materialization = '/Transform/Develop/Models#materialization',
  VersionsSync = '/Transform/Versions/SyncAndCompare/',
  AuditLogs = '/Settings/Audit/',
}

export function navigateToMontaraDocsPage({
  page = MontaraDocsPage.Welcome,
  profileData,
}: {
  page: MontaraDocsPage;

  profileData: { userId?: string; tenantId?: string };
}) {
  const url = `${getConfig('MONTARA_DOCS_PREFIX')}${page}?${PROFILE_URL_PARAM}=${encodeURIComponent(
    JSON.stringify(profileData),
  )}`;
  window.open(url, '_blank', 'noopener noreferrer');
}
