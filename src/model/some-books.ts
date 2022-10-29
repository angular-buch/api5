import { Book } from './book'

export type BookWithSecureInfo = Book & { secure: boolean };

export class SomeBooks {
  public static getPublic(): BookWithSecureInfo[] {
    return SomeBooks.publicBooks.map(b => ({
      ...b,
      secure: false
    }));
  }

  public static getSecure(): BookWithSecureInfo[] {
    return SomeBooks.secureBooks.map(b => ({
      ...b,
      secure: true
    }));
  }

  public static getAll(): BookWithSecureInfo[] {
    return [...SomeBooks.getSecure(), ...SomeBooks.getPublic()];
  }

  private static secureBooks: Book[] = [
    {
      isbn: '1234567890',
      title: 'Geheimes Buch I',
      authors: ['Anonymous'],
      published: '2022-07-15T12:00:00.000Z',
      subtitle: `Das geheime Buch ist nur über die sichere Ressource verfügbar.`,
      thumbnailUrl: 'https://cdn.ng-buch.de/anonymous.svg',
      description: `Wenn Sie diesen Text lesen können, haben Sie den Authorization-Header korrekt gesendet - denn dieses geheime Buch ist nur über die sichere Ressource verfügbar.`
    },
    {
      isbn: '0987654321',
      title: 'Geheimes Buch II',
      authors: ['Anonymous'],
      published: '2022-06-20T12:00:00.000Z',
      subtitle: `Nur für eingeloggte User`,
      thumbnailUrl: 'https://cdn.ng-buch.de/anonymous.svg',
      description: `Dieses Buch ist nur für eingeloggte User sichtbar.`
    }
  ];


  private static publicBooks: Book[] = [
    {
      isbn: '9783864909467',
      title: 'Angular (4. Auflage)',
      authors: [
        'Ferdinand Malcher',
        'Johannes Hoppe',
        'Danny Koppenhagen'
      ],
      published: '2023-02-15T12:00:00.000Z',
      subtitle: 'TODO – Grundlagen, fortgeschrittene Themen und Best Practices',
      description: 'TODO – Lernen Sie Angular mit diesem Praxisbuch! Mit einem anspruchsvollen Beispielprojekt führen wir Sie durch die Welt von Angular.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/angular3.jpg' // TODO
    },
    {
      isbn: '9783864907791',
      title: 'Angular (3. Auflage)',
      authors: [
        'Ferdinand Malcher',
        'Johannes Hoppe',
        'Danny Koppenhagen'
      ],
      published: '2020-10-12T12:00:00.000Z',
      subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices – inkl. RxJS, NgRx & PWA (iX Edition)',
      description: 'Lernen Sie Angular mit diesem Praxisbuch! Mit einem anspruchsvollen Beispielprojekt führen wir Sie durch die Welt von Angular.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/angular3.jpg'
    },
    {
      isbn: '9783960091417',
      title: 'GitHub – Eine praktische Einführung',
      authors: [
        'Anke Lederer'
      ],
      published: '2021-02-26T12:00:00.000Z',
      subtitle: 'Von den ersten Schritten bis zu eigenen GitHub Actions',
      description: 'GitHub ist derzeit die größte Internetplattform für Open-Source-Entwicklungsprojekte und bietet ein grafisches Webinterface mit vielen Funktionen für die gemeinsame Arbeit sowie interessante Community-Features. Technisch setzt es auf der bekannten Versionsverwaltung Git auf.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/github.jpg'
    },
    {
      isbn: '9783864907845',
      title: 'GraphQL',
      authors: [
        'Dominik Kress'
      ],
      published: '2020-10-26T12:00:00.000Z',
      subtitle: 'Eine Einführung in APIs mit GraphQL',
      description: 'API-Design mit GraphQL für Um- und Einsteiger. In Anwendungen, bei denen es auf komplexe aber dennoch schlanke Datenabfragen ankommt, spielt GraphQL seine Vorteile aus. Dominik Kress gibt Ihnen dafür das nötige Wissen rund um API-Design und die GraphQL-spezifischen Datenmodelle an die Hand.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/graphql.jpg'
    },
    {
      isbn: '9783864904523',
      title: 'Git',
      authors: [
        'René Preißel',
        'Bjørn Stachmann'
      ],
      published: '2017-03-13T12:00:00.000Z',
      subtitle: 'Dezentrale Versionsverwaltung im Team – Grundlagen und Workflows',
      description: 'Git ist eine der beliebtesten Versionsverwaltungen. Die Vielfalt an Kommandos, Optionen und Konfigurationen wirkt anfangs aber oft einschüchternd – obwohl die Grundkonzepte einfach sind und man schon mit wenigen davon effektiv arbeiten kann.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/git5.jpg'
    },
    {
      isbn: '9783864906466',
      title: 'Angular (2. Auflage)',
      authors: [
        'Ferdinand Malcher',
        'Johannes Hoppe',
        'Danny Koppenhagen'
      ],
      published: '2019-06-14T12:00:00.000Z',
      subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx',
      description: 'Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular. Lernen Sie Schritt für Schritt, wie Sie strukturierte und modulare Single-Page-Anwendungen entwickeln. Nach der erfolgreichen ersten Auflage wurde dieses Buch grundlegend aktualisiert und erweitert:\nDurchgängig aktualisiert auf Angular 7 und neuere Versionen, Redux mit Reactive Extensions for Angular (NgRx), Ausführliches Kapitel zu RxJS und Observables, Server-Side Rendering mit Angular Universal, HTTP-Interceptoren, Kompakter Schnelleinstieg in Angular mit Stackblitz.\n\nPraktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie alle Schritte gut nachvollziehen und auch Teile überspringen.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/angular2.jpg'
    },
    {
      isbn: '9783864903571',
      title: 'Angular (1. Auflage)',
      authors: [
        'Ferdinand Malcher',
        'Johannes Hoppe',
        'Danny Koppenhagen',
        'Gregor Woiwode'
      ],
      published: '2017-05-22T12:00:00.000Z',
      subtitle: 'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
      description: 'Mit Angular setzen Sie auf ein modernes und modulares Web-Framework. Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg in die Welt von Angular mit einer praxisnahen Einführung.\n\nJedes Thema wird zunächst theoretisch behandelt und anschließend anhand einer durchgehenden Beispielanwendung (https://ng-buch.de/app) demonstriert.\nMeistern Sie die komponentenorientierte Webentwicklung und lernen Sie zusätzlich einen Weg zur Erstellung mobiler Apps (NativeScript) kennen. Mit der Redux-Architektur beherrschen Sie auch komplexe Anwendungen.\nSie werden als Einsteiger und auch als fortgeschrittener Webentwickler Freude bei der Lektüre dieses Buchs haben.)',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/angular1.jpg'
    },
    {
      isbn: '9783864905520',
      title: 'React',
      authors: [
        'Oliver Zeigermann',
        'Nils Hartmann'
      ],
      published: '2019-12-12T12:00:00.000Z',
      subtitle: 'Grundlagen, fortgeschrittene Techniken und Praxistipps – mit TypeScript und Redux',
      description: 'Das bewährte und umfassende Praxisbuch zu React – jetzt komplett aktualisiert und erweitert!',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/react2.jpg'
    },
    {
      isbn: '9783864909009',
      title: 'Vue.js',
      authors: ['Fabian Deitelhoff'],
      published: '2022-08-29T12:00:00.000Z',
      subtitle: 'Von Grundlagen bis Best Practices',
      description: 'Dieses Buch ist ein praxisnaher Einstieg für alle, die sich Vue einmal genauer ansehen möchten. ',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/vue.jpg'
    },
    {
      isbn: '9783864902079',
      title: 'Testgetriebene Entwicklung mit JavaScript',
      authors: [
        'Sebastian Springer'
      ],
      published: '2015-02-26T12:00:00.000Z',
      subtitle: 'Das Handbuch für den professionellen Programmierer',
      description: 'Entwickeln oder warten Sie JavaScript-Webapplikationen und haben immer ein ungutes Gefühl, wenn Sie Ihre Software in Betrieb nehmen? Dann wird es höchste Zeit, dass Sie sich mit testgetriebener Entwicklung vertraut machen. Dieses Buch zeigt JavaScript-Entwicklern, wie Test-Driven Development (TDD) in der Praxis funktionieren kann.',
      thumbnailUrl: 'https://cdn.ng-buch.de/cover/tdd.jpg'
    },
  ]
};
