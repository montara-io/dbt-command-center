import { EnvConfig } from './index';
const local: EnvConfig = {
  BASE_URL: 'http://localhost',
  GRAPHQL_PORT: 3001,
  GRAPHQL_PREFIX: '/bff/graphql',
  AUTH_PORT: 3002,
  AUTH_PREFIX: '/auth',
  ACCOUNTING_PREFIX: '/accounting/user',
  ACCOUNTING_PORT: 3003,
  DBT_DOCS_PREFIX: 'http://localhost',
  DBT_DOCS_PORT: 5173,
  MONTARA_DOCS_PREFIX: 'http://localhost:9000/docs/docs',
  WEBHOOK_TRIGGER_URL: 'https://local.getmontara.com/pipeline/v2/trigger/:webhookId',
};

export default local;
