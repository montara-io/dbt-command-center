import LOCAL_CONFIG from './local';
import STAGING_CONFIG from './staging';
import PRODUCTION_CONFIG from './production';

export enum Environment {
  Local,
  Staging,
  Production,
}

const LOCAL_DOMAINS = [
  'localhost',
  'local.getmontara.com',
  'montypython.getmontara.com',
  'bs-local',
];

export function isLocal() {
  return LOCAL_DOMAINS.includes(window.location.hostname);
}

export function isStaging() {
  return window.location.hostname.includes('staging.');
}

export function isProduction() {
  return !isLocal() && !window.location.hostname.includes('staging.');
}

export function getEnvironment() {
  if (isLocal()) {
    return Environment.Local;
  }
  if (isStaging()) {
    return Environment.Staging;
  } else {
    return Environment.Production;
  }
}

export function getConfig(paramName: keyof EnvConfig) {
  if (isLocal()) {
    return LOCAL_CONFIG[paramName];
  }
  if (isStaging()) {
    return STAGING_CONFIG[paramName];
  } else {
    return PRODUCTION_CONFIG[paramName];
  }
}

export type EnvConfig = {
  BASE_URL: string;
  GRAPHQL_PREFIX: string;
  GRAPHQL_PORT: number;
  AUTH_PORT: number;
  AUTH_PREFIX: string;
  ACCOUNTING_PREFIX: string;
  ACCOUNTING_PORT: number;
  DBT_DOCS_PREFIX: string;
  DBT_DOCS_PORT: number;
  MONTARA_DOCS_PREFIX: string;
  WEBHOOK_TRIGGER_URL: string;
};
