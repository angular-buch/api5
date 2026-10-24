import { z } from 'zod';

// Documentation only: requests are not validated against these schemas, the BookFactory stays lenient.
export const schemas = z.registry<{ id: string }>();

export const BookSchema = z.object({
  isbn: z.string().meta({
    example: '9783864907791',
    description: 'ISBN which is used as identifier - only numbers are allowed (no hyphens)'
  }),
  title: z.string().meta({ example: 'Angular', description: 'Title of the book' }),
  authors: z.array(z.string()).optional().meta({
    description: 'List of all authors of the book',
    example: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen']
  }),
  subtitle: z.string().optional().meta({ example: 'Grundlagen und Best Practices', description: 'Subtitle of the book' }),
  published: z.string().optional().meta({
    format: 'date-time',
    example: '2021-10-12T00:00:00.000Z',
    description: 'date-time as defined by RFC3339 (http://www.ietf.org/rfc/rfc3339.txt) - like new Date().toISOString();'
  }),
  description: z.string().optional().meta({
    example: 'Mit diesem Buch lernen Sie alles über Angular.',
    description: 'Short description of the book'
  }),
  thumbnailUrl: z.string().optional().meta({ description: 'Thumbnail Image URL of the book' })
}).meta({ description: 'The main entity of this API' });

export const KeysSchema = z.object({
  auth: z.string().meta({
    example: 'hsHpa-Fy-wL3IGTfzOuvYw',
    description: 'The auth value is used to retrieve the authentication secret described in RFC8291 (https://tools.ietf.org/html/rfc8291)'
  }),
  p256dh: z.string().meta({
    example: 'BGu9emiaZez5yWSx66VZLVPmYPtGd4FQG9hxoRcaGJ7qDhEwINS3AvbAWn_brMF08ErsqROyClWXsGCNMPY6PJo',
    description: 'The p256dh value is used to retrieve the P-256 ECDH Diffie-Hellman public key described in RFC8291 (https://tools.ietf.org/html/rfc8291)'
  })
}).meta({ description: 'An Object which contains neccessary keys (PushEncryptionKeyName), see https://www.w3.org/TR/push-api/#dom-pushsubscriptionjson-keys' });

export const NotificationSchema = z.object({
  endpoint: z.string().meta({
    example: 'https://fcm.googleapis.com/fcm/send/cd8hmcY5ais:APA91bFWhjIBUCcArB8u95YUN-BkEvj8NA52BcvzDeeilQL5wB1RwWy-ki_ZDONyL8jPjsGBHM-efuEqj5KDLfUwQRtIMjLx-2L5RwS45_oESHtaJr9k-WxfHr_jJEnX-Qt8McNhw1dN',
    description: 'A USVString as defined here https://heycam.github.io/webidl/#idl-USVString'
  }),
  expirationTime: z.string().optional().meta({
    example: '1519129853500',
    description: 'A DOMHighResTimeStamp as defined here https://www.w3.org/TR/hr-time-2/#dom-domhighrestimestamp'
  }),
  keys: z.object({}).meta({
    description: 'An Object which contains neccessary keys, see: https://www.w3.org/TR/push-api/#dom-pushencryptionkeyname',
    example: {
      auth: 'hsHpa-Fy-wL3IGTfzOuvYw',
      p256dh: 'BGu9emiaZez5yWSx66VZLVPmYPtGd4FQG9hxoRcaGJ7qDhEwINS3AvbAWn_brMF08ErsqROyClWXsGCNMPY6PJo'
    }
  })
}).meta({ description: 'A notifications subscription object (PushSubscriptionJSON), see: https://www.w3.org/TR/push-api/#dom-pushsubscriptionjson' });

export const RestErrorSchema = z.string().meta({ description: 'simple string describing the issue' });

schemas.add(BookSchema, { id: 'Book' });
schemas.add(NotificationSchema, { id: 'Notification' });
schemas.add(KeysSchema, { id: 'Keys' });
schemas.add(RestErrorSchema, { id: 'RestError' });
