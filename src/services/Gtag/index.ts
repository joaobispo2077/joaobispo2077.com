import { apis } from '@src/configs';

type EventProps<T> = {
  action: string;
  category: string;
  label: string;
  value: T;
};

const pageview = (url: string) => {
  window.gtag('config', apis.analytics.trackingId, {
    page_path: url,
  });
};

const event = <T>({ action, category, label, value }: EventProps<T>) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const Gtag = {
  pageview,
  event,
};
