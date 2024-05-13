import { isMobile as isMobilePage } from 'react-device-detect';

export function isMobileDevice() {
  return isMobilePage;
}

export function isLaptopDevice() {
  return window.innerWidth < 1513 && !isMobileDevice();
}

export function isWindows() {
  const userAgent = navigator.userAgent;
  return /Win/i.test(userAgent);
}

export function isDesktopDevice() {
  return !isMobileDevice();
}
