import { Book, Thumbnail } from './book'

export class SomeBooks {
  public static get(): Book[] {
    return SomeBooks.germanBooks;
  }

  public static secureBook: Book =
    new Book(
      '1234567890',
      'Geheimes Buch',
      ['Anonymous'],
      new Date('2019-01-01T00:00:00.000Z'),
      `Das geheime Buch ist nur über die sichere Ressource verfügbar.`,
      1,
      [new Thumbnail('https://api4.angular-buch.com/images/anonymous-emblem.svg', 'Front Cover')],
      `Wenn Sie diesen Text lesen können, haben Sie den Authorization-Header korrekt gesendet - denn dieses geheime Buch ist nur über die sichere Ressource verfügbar.
Es kann weder neu angelegt, noch verändert oder gelöscht werden.`
    );

  // replace https://api4.angular-buch.com/ with https://localhost:3000/ to test locally
  public static germanBooks: Book[] = [
    new Book(
      '9783864907791',
      'Angular',
      ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
      new Date('2020-09-01T00:00:00.000Z'),
      'Angular: Grundlagen, fortgeschrittene Themen und Best Practices – inkl. RxJS, NgRx & PWA (iX Edition)',
      5,
      [
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage3.jpg', 'Front Cover'),
      ],
      `Lernen Sie Angular mit diesem Praxisbuch!

Mit einem anspruchsvollen Beispielprojekt führen wir Sie durch die Welt von Angular. Lernen Sie Schritt für Schritt, wie Sie modulare Single-Page-Anwendungen entwickeln.
      
Praktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie alle Schritte gut nachvollziehen und auch Teile überspringen.
      
Die Autoren Ferdinand Malcher, Johannes Hoppe und Danny Koppenhagen sind erfahrene Workshopleiter, Entwickler und internationale Konferenzsprecher. Aufgrund ihres Engagements rund um das Buch und Angular wurden Ferdinand und Johannes als Google Developer Experts (GDE) ausgezeichnet. In diesem praktischen Nachschlagewerk vermitteln sie die Best Practices aus ihrer täglichen Arbeit mit Angular.
      
Neben den Grundlagen werden auch behandelt:
      
• Reaktive Programmierung mit RxJS
• State Management mit Redux und NgRx
• Testing mit Jasmine, Karma und Protractor
• Routing, Guards und Modulsystem
• HTTP und Interceptoren
• Formularverarbeitung
• Dependency Injection und Services
• Internationalisierung (i18n)
• Server-Side Rendering
• Progressive Web Apps (PWA) und NativeScript

Das Buch setzt Vorkenntnisse in JavaScript, HTML und CSS voraus. Wer noch nicht mit TypeScript vertraut ist, findet hier eine kompakte Einführung.

Auf der Website zum Buch werden außerdem regelmäßig Aktualisierungen und Neuigkeiten rund um Angular veröffentlicht.

Neu in dieser Auflage
• Durchgängig aktualisiert auf Angular 10 und neuere Versionen
• Deployment mit Docker
• Progressive Web Apps (PWA)
• Angular Elements
• OAuth 2 und OpenID Connect
• Viele Ergänzungen und Korrekturen`
    ),
    new Book(
      '9783864906466',
      'Angular',
      ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
      new Date('2019-04-30T00:00:00.000Z'),
      'Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx',
      4,
      [
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage2.jpg', 'Front Cover'),
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage2_back.jpg', 'Rückseite'),
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage2_update-note.jpg', 'Update Hinweis'),
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage2_book+ebook.jpg', 'Als gebundenes Buch und E-Book verfügbar')
      ],
      `Lernen Sie die Grundlagen von Angular mit diesem Praxisbuch!

Mit einem anspruchsvollen Beispielprojekt führen wir Sie durch die Welt von Angular. Lernen Sie Schritt für Schritt, wie Sie modulare Single-Page-Anwendungen entwickeln.

Praktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie alle Schritte gut nachvollziehen und auch Teile überspringen.

Die Autoren sind erfahrene Workshopleiter und internationale Konferenzsprecher. In diesem praktischen Nachschlagewerk vermitteln sie die Best Practices aus der täglichen Arbeit mit Angular.

Neben den Grundlagen werden auch behandelt:

• Reaktive Programmierung mit RxJS
• State-Management mit Redux
• Testing mit Jasmine, Karma und Protractor • Routing und Modulsystem
• HTTP und Interceptoren
• Formularverarbeitung
• Dependency Injection und Services
• Internationalisierung (i18n)
• Mobile Anwendungen mit NativeScript
• Server-Side Rendering

Das Buch setzt Vorkenntnisse in JavaScript, HTML und CSS voraus. Wer noch nicht mit TypeScript vertraut ist, findet hier eine kompakte Einführung.

Auf der Website zum Buch werden außerdem regelmäßig Aktualisierungen und Neuigkeiten rund um Angular veröffentlicht.

Neu in dieser Auflage

• Durchgängig aktualisiert auf Angular 8 und neuere Versionen
• Kompakter Schnelleinstieg in Angular mit Stackblitz
• Ausführliches Kapitel zu RxJS und Observables
• Redux mit Reactive Extensions for Angular (NgRx)
• Server-Side Rendering mit Angular Universal
• HTTP-Interceptoren`
    ),
    new Book(
      '9783864903571',
      'Angular',
      ['Gregor Woiwode', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Johannes Hoppe'],
      new Date('2017-05-22T12:00:00.000Z'),
      'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
      2,
      [
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage1.jpg', 'Front Cover'),
        new Thumbnail('https://api4.angular-buch.com/images/angular_auflage1_back.jpg', 'Rückseite')
      ],
      `Egal, ob Sie schon Erfahrung mit AngularJS 1.x haben oder nicht – mit diesem Buch gelingt Ihnen der schnelle Einstieg in das neue Angular-Framework ab Version 4. Anhand eines anspruchsvollen Beispielprojekts lernen Sie Schritt für Schritt, wie Sie strukturierte und modularisierte Single-Page-Anwendungen entwickeln.

Praktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie einsteigen, wo Sie wollen, und nach Wunsch Entwicklungsschritte überspringen.

In einem kompakten Schnellstart-Kapitel erstellen Sie zunächst eine erste funktionierende Anwendung. Danach machen Sie sich mit grundlegenden Angular-Konzepten und Techniken vertraut: Angular CLI, Komponenten und Template-Syntax, HTTP-Anbindung, Routing, Formulare. Weiter geht es dann mit fortgeschrittenen Themen wie

• Pipes und Direktiven
• RxJS (Reactive Extensions)
• Lose Kopplung mittels Dependency Injection
• Internationalisierung (i18n)
• Testing mit Karma und Protractor
• Debugging mit Augury
• Ahead-of-Time-Kompilierung (AOT)
• Deployment

Besonders hervorzuheben sind zwei für Angular-Entwickler spannende Themen:

• Mobile Apps mit NativeScript entwickeln
• Mit Redux Architekturen vereinfachen

Das Buch setzt lediglich Kenntnisse in JavaScript, HTML und CSS voraus. Wer noch nicht mit TypeScript vertraut ist, findet eine Einführung dazu.

Nach der Lektüre sind Sie für den Projektalltag mit Angular gewappnet und können robuste Webanwendungen damit entwickeln.`
    ),
    new Book(
      '9783864905520',
      'React',
      ['Nils Hartmann', 'Oliver Zeigermann'],
      new Date('2019-12-12T00:00:00.000Z'),
      'Grundlagen, fortgeschrittene Techniken und Praxistipps – mit TypeScript und Redux',
      3,
      [
        new Thumbnail('https://api4.angular-buch.com/images/react.jpg', 'Front Cover'),
        new Thumbnail('https://api4.angular-buch.com/images/react_back.jpg', 'Rückseite')
      ],
      `Das bewährte und umfassende Praxisbuch zu React – jetzt komplett aktualisiert und erweitert!

• Vom Einstieg bis zur professionellen React-Anwendung
• Lernen mit einem durchgehenden Beispiel
• Mit Tipps aus der Entwicklungspraxis der erfahrenen Autoren, z.B. zur Performance-Optimierung
• Mit einer Einführung in TypeScript

Mit diesem Buch lernst du von Grund auf, wie du mit React professionelle Single-Page-Anwendungen entwickelst.

In der Neuauflage ihres bewährten React-Arbeitsbuchs zeigen dir Nils Hartmann und Oliver Zeigermann alles Wesentliche von den Anfängen bis zur produktreifen React-Anwendung. Sie erklären dir dabei, wie du mit TypeScript typsicher und nachhaltig entwickelst und große Anwendungen u.a. mit dem React Context und Redux strukturierst. An vielen Stellen versorgen sie dich zudem mit hilfreichen Tipps aus ihrer eigenen React-Entwicklungspraxis.

Unter anderem wirst du folgende Themen kennenlernen:

• Anwendungen entwickeln mit der Hooks API und TypeScript
• Komponenten gestalten mit CSS
• Automatisiertes Testen mit der React Testing Library
• Client-Server-Kommunikation mit REST und GraphQL
• Navigation im Browser mit dem React Router
• Statemanagement mit React Context und Redux
• Serverseitiges Rendern von React-Anwendungen
• Strategien zur Performance-Optimierung

Eigene Kapitel widmen sich den eingesetzten modernen JavaScript-Features sowie TypeScript, sodass zum Verständnis des Buches Kenntnisse von ES5 ausreichen.

Neu in der 2. Auflage sind unter anderem:

• Die React Hooks API
• Testen mit der React Testing Library
• Typsichere Anwendungen mit TypeScript
• GraphQL-Clients mit React`
    ),
    new Book(
      '9783960090922',
      'Vue.js',
      ['Lars Peterke'],
      new Date('2019-02-28T00:00:00.000Z'),
      'kurz & gut',
      3,
      [new Thumbnail('https://api4.angular-buch.com/images/vue.jpg', 'Front Cover')],
      `• kompakte Einführung für alle, die sich rasch in das beliebte JavaScript-Framework einarbeiten möchten
• deckt Grundlagen, aber auch weiterführende Themen wie Vue CLI, Single File Components und Transitions ab
• mit Tipps für die Entwicklerpraxis

Das Open-Source-Projekt Vue.js hat sich zu einem der populärsten JavaScript-Frameworks für das Erstellen von Benutzeroberflächen entwickelt. Der Kern von Vue.js konzentriert sich auf den View-Layer einer Webanwendung und ist daher besonders performant und schlank. Durch viele verfügbare Erweiterungen kann Vue.js aber auch als vollumfängliches Web Application Framework genutzt werden, mit dem auch komplexe Single-Page-Anwendungen möglich sind.

Mit diesem Buch erhalten Entwickler einen kompakten und schnellen Überblick über den Funktionsumfang von Vue.js. Es behandelt unter anderem: die Grundlagen von Vue.js, Vue Components sowie alle Aspekte der Vue-API. Trotz seines kompakten Formats deckt das Taschenbuch viele weitere Themen ab, die für Entwickler relevant sind, wie die Umsetzung komplexerer Vue-Projekte mit Vue CLI, Single File Components und Transitions.`
    ),
    new Book(
      '9783864906497',
      'Git',
      ['René Preißel', 'Bjørn Stachmann'],
      new Date('2019-08-22T00:00:00.000Z'),
      'Dezentrale Versionsverwaltung im Team – Grundlagen und Workflows',
      4,
      [
        new Thumbnail('https://api4.angular-buch.com/images/git.jpg', 'Front Cover'),
        new Thumbnail('https://api4.angular-buch.com/images/git_back.jpg', 'Rückseite')
      ],
      `Git ist eine der beliebtesten Versionsverwaltungen. Die Vielfalt an Kommandos, Optionen und Konfigurationen wirkt anfangs aber oft einschüchternd – obwohl die Grundkonzepte einfach sind und man schon mit wenigen davon effektiv arbeiten kann.

Die Autoren dieses Buches bieten daher zunächst eine kompakte Einführung in die Konzepte und jene Befehle, die man im Entwickleralltag wirklich benötigt. Anschließend widmen sie sich ausführlich den wichtigsten Workflows bei der Softwareentwicklung im Team und zeigen, wie Git dort eingesetzt wird.

Behandelt werden u.a. folgende Workflows:

• Ein Projekt aufsetzen
• Mit Feature-Branches entwickeln
• Gemeinsam auf einem Branch arbeiten
• Kontinuierlich Releases durchführen
• Periodisch Releases durchführen
• Große Projekte aufteilen

Sie lernen in diesem Buch alle wichtigen Git-Befehle und -Funktionen kennen und erfahren, wie Sie sie effektiv anwenden – sowohl über die Kommandozeile als auch mit Tools wie Atlassian Source Tree. Darüber hinaus erfahren Sie, wie Git mit dem Build-Server Jenkins genutzt werden kann oder wie Sie auf Plattformen wie GitHub oder GitLab mit Pull-Requests arbeiten. Zudem lernen Sie fortgeschrittene Features kennen, wie z.B. Submodules, Subtrees und Worktrees.

Die 5. Auflage wurde Dank des Feedbacks unserer Leser noch einmal gründlich überarbeitet und ist jetzt an vielen Stellen präziser und besser verständlich. Da Git inzwischen bei vielen Unternehmen schon lange im Einsatz ist, werden die dort versionierten Projekte auch immer größer. Deshalb ist ein neues Kapitel voll mit Tipps zum Umgang mit besonders großen Repositorys hinzugekommen.`
    ),
    new Book(
      '9783864902079',
      'Testgetriebene Entwicklung mit JavaScript',
      ['Sebastian Springer'],
      new Date('2015-02-26T00:00:00.000Z'),
      'Das Handbuch für den professionellen Programmierer',
      4,
      [new Thumbnail('https://api4.angular-buch.com/images/tdd.jpg', 'Front Cover')],
      `Entwickeln oder warten Sie JavaScript-Webapplikationen und haben immer ein ungutes Gefühl, wenn Sie Ihre Software in Betrieb nehmen? Dann wird es höchste Zeit, dass Sie sich mit testgetriebener Entwicklung vertraut machen. Dieses Buch zeigt JavaScript-Entwicklern, wie Test-Driven Development (TDD) in der Praxis funktionieren kann.

Anschaulich macht Sie Sebastian Springer zunächst mit den allgemeinen TDD-Grundlagen vertraut. Er zeigt, wie Sie diese auf das JavaScript-Umfeld übertragen können und stellt verschiedene Testframeworks vor (Jasmine, QUnit, Karma und JsTestDriver). In einer ausführlichen Beispielanwendung können Sie das Gelernte dann im Red-Green-Refactor- Zyklus praktisch nachvollziehen und üben.

Darauf aufbauend lernen Sie weitere Facetten der testgetriebenen Entwicklung mit JavaScript kennen, die für Ihre tägliche Arbeit hilfreich oder notwendig sind, u.a.:

• Testinfrastruktur für mehrere Browser
• Spys, Stubs und Mocks
• Abhängigkeiten vom DOM
• Asynchrone Operationen
• Testen von Bestandscode
• Node.js-Anwendungen testgetrieben entwickeln
• Werkzeuge, die das Testen leichter machen

TDD-Einsteiger haben nach der Lektüre einen Überblick über TDD im JavaScript-Umfeld und können eigene Projekte testgetrieben durchführen. JavaScript-Entwickler, die bereits testgetrieben entwickeln, können die fortgeschrittenen Kapitel zum Nachschlagen und Vertiefen verwenden.

Vorausgesetzt werden Erfahrungen in der JavaScript-Entwicklung.`
    )
  ]
};
