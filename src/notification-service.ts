import webpush from 'web-push';
import type { PushSubscription, WebPushError } from 'web-push';

import vapidKeys from './vapid-keys.ts';

export interface NotificationPayload {
  title?: string;
  body?: string;
  icon?: string;
  vibrate?: number[];
  data?: any;
}

// The server sends a request to every subscribed endpoint, so only the push services of the browsers are accepted.
const PUSH_SERVICE_HOSTS = [
  'fcm.googleapis.com',
  'android.googleapis.com',
  '.push.services.mozilla.com',
  '.push.apple.com',
  '.notify.windows.com'
];

// Oldest subscriptions are dropped beyond this limit.
const MAX_SUBSCRIPTIONS = 100;

export function isPushServiceEndpoint(endpoint: string): boolean {
  if (!URL.canParse(endpoint)) {
    return false;
  }
  const { protocol, hostname } = new URL(endpoint);
  return protocol === 'https:' && PUSH_SERVICE_HOSTS.some(host =>
    host.startsWith('.') ? hostname.endsWith(host) || hostname === host.slice(1) : hostname === host
  );
}

export class NotificationService {
  private subscriptions: PushSubscription[] = [];
  private subscriptionOriginMap = new Map<string, string | undefined>();

  constructor() {
    webpush.setVapidDetails(
      'mailto:team@angular-buch.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
  }

  addSubscription(subscription: PushSubscription, origin: string | undefined) {
    this.subscriptions.push(subscription);
    this.subscriptions = [...new Set(this.subscriptions)]; // remove possible duplicate subscriptions
    this.subscriptionOriginMap.set(subscription.endpoint, origin) // store subscriber's origin info for this endpoint. We need this to create URLs for the client app.

    while (this.subscriptions.length > MAX_SUBSCRIPTIONS) {
      const oldest = this.subscriptions.shift();
      if (oldest && !this.subscriptions.some(s => s.endpoint === oldest.endpoint)) {
        this.subscriptionOriginMap.delete(oldest.endpoint);
      }
    }
  }

  hasSubscriber(): boolean {
    return this.subscriptions.length > 0;
  }

  notifySubscribers(payload: NotificationPayload) {
    this.subscriptions.forEach(sub => {
      const origin = this.subscriptionOriginMap.get(sub.endpoint);
      const notificationPayload = { ...payload };

      // when there is a book in the payload, add click action to open detail page
      if (payload.data?.book) {
        notificationPayload.data = {
          book: payload.data.book,
          onActionClick: {
            default: {
              operation: 'openWindow',
              url: `${origin}/books/${payload.data.book.isbn}`
            }
          }
        };
      }

      this.notify(notificationPayload, sub);
    });
  }

  notify(notification: NotificationPayload, subscription: PushSubscription) {
    webpush.sendNotification(subscription, JSON.stringify({ notification }))
      .catch((error: WebPushError) => console.error(error));
  }
}
