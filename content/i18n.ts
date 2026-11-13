export type Locale = 'id' | 'en';

export type LocalizedText = {
  id: string;
  en: string;
};

export function pick(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function pickMaybe(text: string | LocalizedText | undefined, locale: Locale): string {
  if (!text) return '';
  return typeof text === 'string' ? text : text[locale];
}
