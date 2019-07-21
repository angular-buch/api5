import { NextFunction, Request, Response, Router } from "express";
import { PushSubscription } from 'web-push';
import * as _ from 'lodash';

import { NotificationService } from "../notification-service";
import { HTTP } from "./http";

export class NotificationsRoute {

  public static create(router: Router, notificationService: NotificationService) {

    const notificationsRoute = new NotificationsRoute(notificationService);
    const methodsToBind = ['requestSubscription']
    _.bindAll(notificationsRoute, methodsToBind);

    router.post('/', notificationsRoute.requestSubscription);
  }

  constructor(private notificationService: NotificationService) { }

  requestSubscription(req: Request, res: Response, next: NextFunction) {
    const notificationRequest: PushSubscription = req.body;

    if (!notificationRequest) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: Notification Object is mandatory');
    }

    if (
      !notificationRequest.endpoint
      || !notificationRequest.keys
      || !notificationRequest.keys.auth
      || !notificationRequest.keys.p256dh
    ) {
      return res.status(HTTP.UNPROCESSABLE_ENTITY).send('Malformed Notification Object');
    }

    this.notificationService.addSubscription(notificationRequest);
    res.status(HTTP.OK).send({ message: 'successfully subscribed' });

    const notificationPayload = {
      title: '🐵 Push-Benachrichtigungen aktiv ✉️',
      body: 'Sie werden über neue Bücher benachrichtigt',
      vibrate: [50, 50]
    };

    this.notificationService.notify(notificationPayload, notificationRequest);

    next();
  };
}
