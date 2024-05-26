export const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x09\x0b\x0c\x0e-\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2([0-4][0-9]|5[0-5]|[01]?[0-9][0-9]?))|[a-z0-9-]*[a-z0-9])\.){3}(?:(2([0-4][0-9]|5[0-5]|[01]?[0-9][0-9]?))|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function stringIncludesAnyOfTheseCharacters(
  str: string,
  characters: string[]
): boolean {
  return characters.some((character) => str.includes(character));
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let index = 0;
  let size = bytes;

  while (size >= 1024) {
    size /= 1024;
    index++;
  }

  return `${formatNumber(size)} ${units[index]}`;
}

export function countSubstring(mainString: string, substring: string) {
  let count = 0;
  let index = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    index = mainString.indexOf(substring, index);
    if (index === -1) {
      break;
    }
    count++;
    index++;
  }

  return count;
}

export function replaceTemplate({
  template,
  replacements,
}: {
  template: string;
  replacements: Record<string, string>;
}) {
  return Object.entries(replacements).reduce(
    (acc, [key, value]) => (acc || "").replaceAll(`{{${key}}}`, value),
    template
  );
}
