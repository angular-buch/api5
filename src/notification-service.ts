import * as _ from 'lodash';
import { WebPushError, PushSubscription, sendNotification, setVapidDetails } from 'web-push';
export class NotificationService {
  private subscriptions: PushSubscription[] = [];
  private subscriptionOriginMap = new Map();

  constructor() {
    const vapidKeys = {
      publicKey: 'BGk2Rx3DEjXdRv9qP8aKrypFoNjISAZ54l-3V05xpPOV-5ZQJvVH9OB9Rz5Ug7H_qH6CEr40f4Pi3DpjzYLbfCA',
      privateKey: 'D-k70ba0x5ucasrJMfsROWq8Xtt2smbzh98mbXTfhQM'
    }

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
