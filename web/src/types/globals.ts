export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    analytics: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Intercom: any;
  }
}
