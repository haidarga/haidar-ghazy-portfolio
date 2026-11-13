export type AnalyticsEventName =
  | 'cta_click'
  | 'case_open'
  | 'cv_download'
  | 'lightbox_open'
  | 'locale_change'
  | 'theme_change'
  | 'skill_select';

interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
    umami?: {
      track: (event: string, data?: AnalyticsPayload) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Emits lightweight portfolio telemetry to Plausible, Umami, or dataLayer if installed.
 */
export function trackEvent(event: AnalyticsEventName, props?: AnalyticsPayload): void {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, props ? { props } : undefined);
    }
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(event, props);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    // Telemetry must never interrupt portfolio interactions.
  }
}
