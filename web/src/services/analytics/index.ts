export enum AnalyticsEvent {
  UserViewedRunDetailsGraph = "montara_userViewedRunDetailsGraph",
  UserViewedRunDetailsModels = "montara_userViewedRunDetailsModels",
  UserViewedRunLogs = "montara_userViewedRunLogs",
  UserNavigatedToMontaraWebsite = "montara_userNavigatedToMontaraWebsite",
}

export function identifyUser({
  email,
  userId,
  tenantId,
}: {
  email: string;
  userId: string;
  tenantId: string;
}) {
  typeof window?.analytics?.identify === "function" &&
    window.analytics.identify(userId, {
      email,
      tenantId,
    });
  typeof window?.analytics?.group === "function" &&
    window.analytics.group(tenantId);
}

export function trackEvent({
  eventName,
  eventProperties = {},
}: {
  eventName: AnalyticsEvent;
  eventProperties?: Record<string, string | number | boolean>;
}) {
  window?.analytics?.track(eventName, eventProperties);
}

export function sendPageEvent() {
  window?.analytics?.page();
}
