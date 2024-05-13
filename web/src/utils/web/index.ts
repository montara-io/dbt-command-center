import { CustomEvent as CustomEventType } from '../../constants/CustomEvent';
import { UrlParam } from '../../constants/UrlParams';

export function downloadTextFile({ filename, text }: { filename: string; text: string }) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function isObjectDeepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function getAllUrlParams() {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const params = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

export function getUrlParam(paramName: UrlParam) {
  const params = getAllUrlParams();
  return params[paramName];
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

export function getCookie(name: string) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts?.pop()?.split(';').shift();
  }
}

export function downloadFile({ url }: { url: string }) {
  const link = document.createElement('a');
  link.href = url;
  link.click();
  link.remove();
}

export function triggerCustomEvent({
  eventName,
  eventData = {},
}: {
  eventName: CustomEventType;
  eventData?: any;
}) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: eventData }));
}
