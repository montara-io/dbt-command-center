import { EnvConfig } from './index';
const staging: EnvConfig = {
  BASE_URL: 'https://staging.montara.io',
  GRAPHQL_PORT: 443,
  GRAPHQL_PREFIX: '/api/bff/graphql',
  AUTH_PORT: 443,
  AUTH_PREFIX: '/auth/auth',
  ACCOUNTING_PREFIX: '/accounting',
  ACCOUNTING_PORT: 443,
  DBT_DOCS_PREFIX: 'https://staging.montara.io/project-docs/',
  DBT_DOCS_PORT: 443,
  MONTARA_DOCS_PREFIX: 'https://staging.montara.io/docs/docs',
  WEBHOOK_TRIGGER_URL: 'https://staging-hooks.montara.io/pipeline/v2/trigger/:webhookId',
};

export default staging;
