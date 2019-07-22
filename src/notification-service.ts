import * as _ from 'lodash';
import { WebPushError, PushSubscription, sendNotification, setVapidDetails } from 'web-push';
export class NotificationService {
  private subscriptions: PushSubscription[] = [];

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

  addSubscription(subscription: PushSubscription) {
    this.subscriptions.push(subscription);
    this.subscriptions = _.uniq(this.subscriptions); // remove duplicate subscriptions if exists
  }

  hasSubscriber(): boolean {
    return this.subscriptions.length > 0;
  }

  notifySubscribers(payload: NotificationOptions) {
    this.subscriptions.forEach(sub => this.notify(payload, sub));
  }

  notify(payload: NotificationOptions, subscription: PushSubscription) {
    sendNotification(subscription, JSON.stringify({ notification: payload }))
      .catch((error: WebPushError) => console.error(error));
  }
}
