import * as _ from 'lodash';
import { WebPushError, PushSubscription, sendNotification, setVapidDetails } from 'web-push';
import vapidKeys from './vapidKeys';

export class NotificationService {
  private subscriptions: PushSubscription[] = [];
  private subscriptionOriginMap = new Map();

  constructor() {
    setVapidDetails(
      'mailto:team@angular-buch.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
  }

  addSubscription(subscription: PushSubscription, origin: string) {
    this.subscriptions.push(subscription);
    this.subscriptions = _.uniq(this.subscriptions); // remove possible duplicate subscriptions
    this.subscriptionOriginMap.set(subscription.endpoint, origin) // store subscriber's origin info for this endpoint. We need this to create URLs for the client app.
  }

  hasSubscriber(): boolean {
    return this.subscriptions.length > 0;
  }

  notifySubscribers(payload: NotificationOptions) {
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

  notify(notification: NotificationOptions, subscription: PushSubscription) {
    sendNotification(subscription, JSON.stringify({ notification }))
      .catch((error: WebPushError) => console.error(error));
  }
}
