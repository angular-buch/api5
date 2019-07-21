import * as _ from 'lodash';
import * as webpush from 'web-push';
export class NotificationService {
  private subscriptions: PushSubscriptionJSON[] = [];

  constructor() {
    const vapidKeys = {
      publicKey: 'BGk2Rx3DEjXdRv9qP8aKrypFoNjISAZ54l-3V05xpPOV-5ZQJvVH9OB9Rz5Ug7H_qH6CEr40f4Pi3DpjzYLbfCA',
      privateKey: 'D-k70ba0x5ucasrJMfsROWq8Xtt2smbzh98mbXTfhQM'
    }

    webpush.setVapidDetails(
      'mailto:team@angular-buch.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
  }

  addSubscription(subscription: PushSubscriptionJSON) {
    this.subscriptions.push(subscription);
    this.subscriptions = _.uniq(this.subscriptions); // remove duplicate subscriptions if exists
  }

  hasSubscriber(): boolean {
    return this.subscriptions.length > 0;
  }

  notifySubscribers(payload: NotificationOptions) {
    this.subscriptions.forEach(sub => this.notify(payload, sub));
  }

  notify(payload: NotificationOptions, subscription: PushSubscriptionJSON) {
    webpush.sendNotification(subscription, JSON.stringify({ notification: payload }))
      .catch(error => console.error(error));
  }
}
