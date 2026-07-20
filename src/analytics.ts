export type MotionExperimentVariant = 'control' | 'motion';

export type MotionExperiment = {
  id: 'oil_texture_motion_v1';
  variant: MotionExperimentVariant;
  assignmentSource: 'new' | 'stored' | 'query';
};

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue>;
type AnalyticsPayload = AnalyticsProperties & {
  event: string;
  event_timestamp: string;
  session_id: string;
  page_path: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __neeliAnalytics?: {
      experiment: MotionExperiment;
      events: AnalyticsPayload[];
    };
  }
}

const EXPERIMENT_ID = 'oil_texture_motion_v1' as const;
const ASSIGNMENT_KEY = 'neeli:experiment:oil_texture_motion_v1';
const SESSION_KEY = 'neeli:analytics:session_id';
const DEBUG_EVENTS_KEY = 'neeli:analytics:debug_events';
const eventBuffer: AnalyticsPayload[] = [];
const onceKeys = new Set<string>();

function safeStorage(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeStore(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // The prototype still works when storage is unavailable.
  }
}

function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sessionId() {
  const existing = safeStorage(window.sessionStorage, SESSION_KEY);
  if (existing) return existing;
  const created = randomId();
  safeStore(window.sessionStorage, SESSION_KEY, created);
  return created;
}

export function getMotionExperiment(): MotionExperiment {
  const override = new URLSearchParams(window.location.search).get('neeli_motion');
  let experiment: MotionExperiment;
  if (override === 'control' || override === 'motion') {
    experiment = { id: EXPERIMENT_ID, variant: override, assignmentSource: 'query' };
  } else {
    const stored = safeStorage(window.localStorage, ASSIGNMENT_KEY);
    if (stored === 'control' || stored === 'motion') {
      experiment = { id: EXPERIMENT_ID, variant: stored, assignmentSource: 'stored' };
    } else {
      const variant: MotionExperimentVariant = Math.random() < 0.5 ? 'control' : 'motion';
      safeStore(window.localStorage, ASSIGNMENT_KEY, variant);
      experiment = { id: EXPERIMENT_ID, variant, assignmentSource: 'new' };
    }
  }

  exposeAnalyticsDebug(experiment);
  trackOnce('oil_texture_motion_v1:assigned','experiment_assigned',{
    experiment_id:experiment.id,
    experiment_variant:experiment.variant,
    assignment_source:experiment.assignmentSource,
    motion_eligible:isMotionEligible(),
  });
  return experiment;
}

export function isMotionEligible() {
  const qaReducedMotion = new URLSearchParams(window.location.search).get('neeli_reduce_motion') === '1';
  return !qaReducedMotion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function observeWebVitals(experiment: MotionExperiment) {
  if (!('PerformanceObserver' in window)) return () => {};

  let lcpMs = 0;
  let cls = 0;
  const observers: PerformanceObserver[] = [];

  try {
    const lcpObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const latest = entries[entries.length - 1];
      if (latest) lcpMs = latest.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObserver);
  } catch {
    // Older browsers may not expose LCP.
  }

  try {
    const clsObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        const shift = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
        if (!shift.hadRecentInput) cls += shift.value || 0;
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    observers.push(clsObserver);
  } catch {
    // Older browsers may not expose layout shift.
  }

  const flush = () => {
    if (lcpMs <= 0) return;
    trackOnce('web_vitals_measured','web_vitals_measured',{
      experiment_id:experiment.id,
      experiment_variant:experiment.variant,
      lcp_ms:Math.round(lcpMs),
      cls:Number(cls.toFixed(4)),
    });
  };
  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') flush();
  };
  const timer = window.setTimeout(flush, 5000);
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    observers.forEach(observer => observer.disconnect());
  };
}

export function track(event: string, properties: AnalyticsProperties = {}) {
  const payload: AnalyticsPayload = {
    event,
    event_timestamp: new Date().toISOString(),
    session_id: sessionId(),
    page_path: `${window.location.pathname}${window.location.search}`,
    ...properties,
  };

  eventBuffer.push(payload);
  if (eventBuffer.length > 100) eventBuffer.shift();
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('neeli:analytics', { detail: payload }));

  if (new URLSearchParams(window.location.search).get('neeli_debug') === '1') {
    safeStore(window.sessionStorage, DEBUG_EVENTS_KEY, JSON.stringify(eventBuffer));
    document.documentElement.dataset.neeliQaEvents = JSON.stringify(eventBuffer);
    console.info('[Neeli analytics]', payload);
  }
}

export function trackOnce(key: string, event: string, properties: AnalyticsProperties = {}) {
  if (onceKeys.has(key)) return;
  onceKeys.add(key);
  track(event, properties);
}

export function exposeAnalyticsDebug(experiment: MotionExperiment) {
  document.documentElement.dataset.neeliExperiment = `${experiment.id}:${experiment.variant}`;
  safeStore(window.sessionStorage, 'neeli:analytics:experiment', JSON.stringify(experiment));
  if (Object.isExtensible(window)) window.__neeliAnalytics = { experiment, events: eventBuffer };
}
