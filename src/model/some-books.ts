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
      `Das geheime Buch ist nur über die sichere Ressource verfügbar.`,
      1,
      [new Thumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/600px-Anonymous_emblem.svg.png', 'Front Cover')],
      `Wenn Sie diesen Text lesen können, haben Sie den Authorization-Header korrekt gesendet - denn dieses geheime Buch ist nur über die sichere Ressource verfügbar. Es kann weder neu angelegt, noch verändert oder gelöscht werden.`
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
    )
  ];

  public static germanBooks: Book[] = [
    new Book(
      '9783864906466',
      'Angular',
      ['Johannes Hoppe', 'Ferdinand Malcher', 'Danny Koppenhagen'],
      new Date('2019-04-30T00:00:00.000Z'),
      'Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx',
      5,
      [new Thumbnail('https://api3.angular-buch.com/images/angular_auflage2.jpg', 'Front Cover')],
      `Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular. Lernen Sie Schritt für Schritt, wie Sie strukturierte und modulare Single-Page-Anwendungen entwickeln. Nach der erfolgreichen ersten Auflage wurde dieses Buch grundlegend aktualisiert und erweitert:
      Durchgängig aktualisiert auf Angular 7 und neuere Versionen, Redux mit Reactive Extensions for Angular (NgRx), Ausführliches Kapitel zu RxJS und Observables, Server-Side Rendering mit Angular Universal, HTTP-Interceptoren, Kompakter Schnelleinstieg in Angular mit Stackblitz.
      Praktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie alle Schritte gut nachvollziehen und auch Teile überspringen.
      Die Autoren Ferdinand Malcher, Johannes Hoppe und Danny Koppenhagen sind erfahrene Workshopleiter und internationale Konferenzsprecher. In diesem praxisorientierten Buch vermitteln sie die Erkenntnisse und Best Practices aus über 3 Jahren täglicher Arbeit mit Angular. Neben den Grundlagen werden auch fortgeschrittene Themen abgedeckt. Weitere behandelte Themen sind unter anderem:
      Testing mit Jasmine, Karma und Protractor, Angular CLI, Komponenten, Pipes und Direktiven, Modulsystem, Routing, Formularverarbeitung, Dependency Injection und Services, Ahead-of-Time-Kompilierung (AOT), Deployment, Internationalisierung (i18n), Mobile Anwendungen mit NativeScript.
      Das Buch setzt lediglich Vorkenntnisse in JavaScript, HTML und CSS voraus. Wer noch nicht mit TypeScript vertraut ist, findet in diesem Buch eine kompakte Einführung.
      Nach der Lektüre sind Sie für den Projektalltag mit Angular gewappnet und können robuste Webanwendungen mit dem Framework entwickeln. Auf der Website zum Buch werden außerdem regelmäßig Aktualisierungen und Neuigkeiten rund um Angular veröffentlicht.`
    ),
    new Book(
      '9783864903571',
      'Angular',
      ['Johannes Hoppe', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Gregor Woiwode'],
      new Date('2017-04-01T12:00:00.000Z'),
      'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
      5,
      [new Thumbnail('https://api3.angular-buch.com/images/angular_auflage1.jpg', 'Front Cover')],
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
      [new Thumbnail('https://api3.angular-buch.com/images/angular_Steyer_Schwab.jpg', 'Front Cover')],
      'Die Komplexität moderner JavaScript- und Single-Page-Anwendungen (SPA) ist eine Herausforderung für jeden Entwickler. Entwickler begrüßen daher sehr, dass Angular sie bei wiederkehrenden Aufgaben wie Datenbindung, Validierung und Routing unterstützt. Auch der Support durch Google und eine riesige Community spricht dafür, die leistungsfähige Plattform zu nutzen.'
    ),
    new Book(
      '9783864903274',
      'React',
      ['Oliver Zeigermann', 'Nils Hartmann'],
      new Date('2016-06-17T00:00:00.000Z'),
      'Die praktische Einführung in React, React Router und Redux',
      4,
      [new Thumbnail('https://api3.angular-buch.com/images/react.jpg', 'Front Cover')],
      'React ist ein JavaScript-Framework zur Entwicklung von Benutzeroberflächen sowohl im Browser als auch auf Mobilgeräten. Entwickelt und eingesetzt von Facebook ist es mittlerweile als Open-Source-Projekt verfügbar und hat sich bereits im Einsatz bei diversen namhaften Websites, wie z. B. Airbnb und Netflix, bewährt.'
    ),
    new Book(
      '9783864904523',
      'Git',
      ['René Preißel', 'Bjørn Stachmann'],
      new Date('2017-03-13T00:00:00.000Z'),
      'Dezentrale Versionsverwaltung im Team – Grundlagen und Workflows',
      5,
      [new Thumbnail('https://api3.angular-buch.com/images/git.jpg', 'Front Cover')],
      'Git ist eine der beliebtesten Versionsverwaltungen. Die Vielfalt an Kommandos, Optionen und Konfigurationen wirkt anfangs aber oft einschüchternd – obwohl die Grundkonzepte einfach sind und man schon mit wenigen davon effektiv arbeiten kann.'
    ),
    new Book(
      '9783864902079',
      'Testgetriebene Entwicklung mit JavaScript',
      ['Sebastian Springer'],
      new Date('2015-02-26T00:00:00.000Z'),
      'Das Handbuch für den professionellen Programmierer',
      5,
      [new Thumbnail('https://api3.angular-buch.com/images/tdd.jpg', 'Front Cover')],
      'Entwickeln oder warten Sie JavaScript-Webapplikationen und haben immer ein ungutes Gefühl, wenn Sie Ihre Software in Betrieb nehmen? Dann wird es höchste Zeit, dass Sie sich mit testgetriebener Entwicklung vertraut machen. Dieses Buch zeigt JavaScript-Entwicklern, wie Test-Driven Development (TDD) in der Praxis funktionieren kann.'
    )
  ]
};
