import type { Request, Response, Router } from 'express';
import type { PushSubscription } from 'web-push';

import { NotificationService, isPushServiceEndpoint } from '../notification-service.ts';
import { OpenApiDocument } from '../openapi.ts';
import { NotificationSchema, RestErrorSchema } from '../schemas.ts';
import { HTTP } from './http-status.ts';

export class NotificationsRoute {

  public static create(router: Router, notificationService: NotificationService, doc: OpenApiDocument) {

    const notificationsRoute = new NotificationsRoute(notificationService);

    doc.route(router, '/notifications', 'post', '', {
      tags: ['notifications'],
      summary: 'Subscribe to notifications, you will receive notifications via web-push after you subscribed to them.',
      requestBody: {
        name: 'notification',
        description: 'The Notification Object which contains the credentials for requesting to receive notifications',
        schema: NotificationSchema
      },
      responses: {
        200: { description: 'Successfully subscribed to receive notifications' },
        400: { description: 'Invalid data', schema: RestErrorSchema },
        422: { description: 'Malformed Data', schema: RestErrorSchema },
        500: { description: 'Unexpected Internal Server Error', schema: RestErrorSchema }
      }
    }, (req, res) => notificationsRoute.requestSubscription(req, res));
  }

  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  requestSubscription(req: Request, res: Response) {
    const notificationRequest: PushSubscription = req.body;

    if (
      !notificationRequest.endpoint
      || !notificationRequest.keys
      || !notificationRequest.keys.auth
      || !notificationRequest.keys.p256dh
    ) {
      return res.status(HTTP.UNPROCESSABLE_ENTITY).send('Malformed Notification Object');
    }

    if (!isPushServiceEndpoint(notificationRequest.endpoint)) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: endpoint must be the URL of a browser push service');
    }

    this.notificationService.addSubscription(notificationRequest, req.headers.referer);
    res.status(HTTP.OK).send({ message: 'successfully subscribed' });

    const notificationPayload = {
      title: '🐵 Push Notifications activated ✉️',
      body: 'You will be notified of new books',
      vibrate: [50, 50]
    };

    this.notificationService.notify(notificationPayload, notificationRequest);
  };
}
