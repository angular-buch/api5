import { Book, Thumbnail } from './book'

export class SomeBooks {
  public static get() :Book[] {
    return [
      ...SomeBooks.germanBooks,
      // ...SomeBooks.englishBooks
    ];
  }

  public static secureBook: Book =
    new Book(
      '1234567890',
      'Geheimes Buch',
      ['Anonymous'],
      new Date('2019-01-01T00:00:00.000Z'),
      `Geheimes Buch`,
      1,
      [new Thumbnail('https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg', 'Front Cover')],
      `Dieses geheime Buch ist nur über die sichere Ressource verfügbar.`
    );

  public static englishBooks: Book[] = [
    new Book(
      '9781788620703',
      'Switching to Angular - Third Edition',
      ['Minko Gechev'],
      new Date('2017-10-01T12:00:00.000Z'),
      `Align with Google's long-term vision for Angular version 5 and beyond`,
      5,
      [new Thumbnail('https://d255esdrn735hr.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/B09239_cover.png', 'Front Cover')],
      `Switching to Angular, Third Edition is the go-to book to align and get started with the Angular JavaScript framework. Angular contributor and international speaker Minko Gechev will help you square up and start building Angular apps and provide you an insight to the Google’s vision for the framework. `
    ),
    new Book(
      '9781787124929',
      'Learning Angular - Second Edition',
      ['Christoffer Noring', 'Pablo Deeleman'],
      new Date('2017-12-01T12:00:00.000Z'),
      `Build modern SPAs by learning the latest and powerful features of Angular 5 and TypeScript 2.x `,
      4,
      [new Thumbnail('https://www.packtpub.com/sites/default/files/B06169_cover.png', 'Front Cover')],
      `The latest version of Angular comes with a lot of new features that help you to make your applications smaller and faster. This book will show you how to set up an Angular project, and you’ll build Angular components right from the beginning. Moving on, you’ll explore and work with the components to build your app. Next, you’ll find out more about TypeScript and see how to use it to build apps in the best way possible. You’ll then be introduced to the building blocks - Properties, Events, Directives, and Pipes - and how it can be used to implement and enhance the components.`
    ),
    new Book(
      '9781787124929',
      'Architecting Angular Applications with Redux, RxJS, and NgRx',
      ['Christoffer Noring'],
      new Date('2017-12-01T12:00:00.000Z'),
      `Manage state in Angular to write high performing web apps by combining the power of Flux, RxJS, and NgRx `,
      5,
      [new Thumbnail('https://www.packtpub.com/sites/default/files/B07031_cover.png', 'Front Cover')],
      `Managing the state of large-scale web applications is a highly challenging task with the need to align different components, backends, and web workers harmoniously.  When it comes to Angular, you can use NgRx, which combines the simplicity of Redux with the reactive programming power of RxJS to build your application architecture, making your code elegant and easy to reason about, debug, and test. In this book, we start by looking at the different ways of architecting Angular applications and some of the patterns that are involved in it. This will be followed by a discussion on one-way data flow, the Flux pattern, and the origin of Redux.`
    ),
    new Book(
      '9781680501735',
      'Reactive Programming with RxJS',
      ['Sergi Mansilla'],
      new Date('2015-12-01T12:00:00.000Z'),
      `Untangle your asynchronous JavaScript code`,
      3,
      [new Thumbnail('https://www.safaribooksonline.com/library/cover/9781680501735/360h/', 'Front Cover')],
      `Reactive programming is revolutionary. It makes asynchronous programming cleaner, intuitive, and robust. Discover how to use the RxJS library to write programs in a simpler way, unifying asynchronous mechanisms such as callbacks and promises into a single, powerful construct. Learn to think about your programs as streams of data that you can transform by expressing what should happen, instead of having to painstakingly program how it should happen. You'll be able to handle real-world concurrency and write complex flows of events in your applications with ease.`
    ),
    new Book(
      '9783864903571',
      'Angular',
      ['Johannes Hoppe', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Gregor Woiwode'],
      new Date('2017-04-01T12:00:00.000Z'),
      'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
      4,
      [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Front Cover')],
      `Mit Angular setzen Sie auf ein modernes und modulares Web-Framework. Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg in die Welt von Angular mit einer praxisnahen Einführung.
      Jedes Thema wird zunächst theoretisch behandelt und anschließend anhand einer durchgehenden Beispielanwendung (https://ng-buch.de/app) demonstriert.
      Meistern Sie die komponentenorientierte Webentwicklung und lernen Sie zusätzlich einen Weg zur Erstellung mobiler Apps (NativeScript) kennen. Mit der Redux-Architektur beherrschen Sie auch komplexe Anwendungen.
      Sie werden als Einsteiger und auch als fortgeschrittener Webentwickler Freude bei der Lektüre dieses Buchs haben.)`
    ),
  ];

  public static germanBooks: Book[] = [
    new Book(
      '9783864903571',
      'Angular',
      ['Johannes Hoppe', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Gregor Woiwode'],
      new Date('2017-04-01T12:00:00.000Z'),
      'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
      5,
      [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Front Cover')],
      `Mit Angular setzen Sie auf ein modernes und modulares Web-Framework. Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg in die Welt von Angular mit einer praxisnahen Einführung.
      Jedes Thema wird zunächst theoretisch behandelt und anschließend anhand einer durchgehenden Beispielanwendung (https://ng-buch.de/app) demonstriert.
      Meistern Sie die komponentenorientierte Webentwicklung und lernen Sie zusätzlich einen Weg zur Erstellung mobiler Apps (NativeScript) kennen. Mit der Redux-Architektur beherrschen Sie auch komplexe Anwendungen.
      Sie werden als Einsteiger und auch als fortgeschrittener Webentwickler Freude bei der Lektüre dieses Buchs haben.)`
    ),
    new Book(
      '9783960090267',
      'Angular',
      ['Manfred Steyer', 'Daniel Schwab'],
      new Date('2017-08-28T00:00:00.000Z'),
      'Das Praxisbuch zu Grundlagen und Best Practices',
      4,
      [new Thumbnail('https://portal.dnb.de/opac/mvb/cover.htm?isbn=978-3-96009-026-7', 'Front Cover')],
      'Die Komplexität moderner JavaScript- und Single-Page-Anwendungen (SPA) ist eine Herausforderung für jeden Entwickler. Entwickler begrüßen daher sehr, dass Angular sie bei wiederkehrenden Aufgaben wie Datenbindung, Validierung und Routing unterstützt. Auch der Support durch Google und eine riesige Community spricht dafür, die leistungsfähige Plattform zu nutzen.'
    ),
    new Book(
      '9783836239141',
      'Angular',
      ['Christoph Höller'],
      new Date('2017-01-30T00:00:00.000Z'),
      'Das umfassende Handbuch zum JavaScript-Framework',
      4,
      [new Thumbnail('https://portal.dnb.de/opac/mvb/cover.htm?isbn=978-3-8362-3914-1', 'Front Cover')],
      'Angular ist das JavaScript-Framework für professionelle Webapplikationen – hier lernen Sie es umfassend kennen! Christoph Höller macht Sie mit allen relevanten Technologien, Standards und Kernbestandteilen des Angular-Frameworks vertraut. Am Praxisbeispiel einer Projektverwaltung führt Ihnen der Webprofi die Komponenten und Konzepte von Angular praxisnah vor. Formulare, Routing, HTTP-Anbindung und Testing – hier lernen Sie Schritt für Schritt, wie Sie eigene Angular-Webapplikationen erstellen.'
    ),
    new Book(
      '9783864901546',
      'AngularJS',
      ['Philipp Tarasiewicz', 'Robin Böhm'],
      new Date('2014-05-01T00:00:00.000Z'),
      'Eine praktische Einführung',
      3,
      [new Thumbnail('https://ng-buch.de/cover1.jpg', 'Front Cover')],
      'AngularJS ist derzeit der neue Star am Himmel der JavaScript-MVC-Frameworks. Mit ihm können Sie auf effiziente Weise moderne clientseitige Webapplikationen erstellen.         Dieses Buch führt Sie anhand eines Beispielprojekts schrittweise an die Entwicklung mit AngularJS heran. Dabei lernen Sie die grundlegenden Konzepte kennen und können darauf aufbauend strukturierte, modularisierte und somit wartbare Applikation erstellen. Themen sind u.a. Direktiven, Zwei-Wege-Datenbindung, Dependency Injection, Routen, REST-basierte Web Services sowie Werkzeuge und Workflows mit Yo, Grunt, Bower und Karma.'
    )
  ]
};
