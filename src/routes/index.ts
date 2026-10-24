import type { Request, Response, Router } from 'express';

import { escapeHtml } from '../escape-html.ts';
import { OpenApiDocument } from '../openapi.ts';

const TITLE = 'BookMonkey 5 API';

export class IndexRoute {

  public static create(router: Router, doc: OpenApiDocument) {
    doc.route(router, '', 'get', '/', null, (req, res) => res.send(renderIndexPage(formatSeconds(process.uptime()))));
  }
}

function formatSeconds(seconds: number) {
  const pad = (s: number) => (s < 10 ? '0' : '') + s;
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor(seconds % (60 * 60) / 60);
  const secs = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
}

function renderIndexPage(uptime: string) {
  return `<!DOCTYPE html><html><head><title>${TITLE}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui"><link rel="stylesheet" href="style.css" media="screen"></head><body class="markdown-body"><h1>${TITLE}</h1><img src="images/monkey-thinking.svg" width="300"><ul><li><a href="/books">GET /books</a></li><li><a href="/books/9783864909467">GET /books/9783864909467</a></li></ul><hr><p><strong>You can reset the book list to its initial state.</strong><br>Execute this function if there are no more records or when the contents are insufficient.</p><button onclick="resetBookList()" id="reset">Reset book list</button><span id="resetOK">OK</span><hr><strong>Explorable API documentation:&nbsp;<a href="/swagger-ui/">/swagger-ui/</a></strong><br><small>OpenAPI Specification:&nbsp;<a href="/swagger.json">/swagger.json</a></small><br><small>Uptime: ${escapeHtml(uptime)}</small><hr>  &copy;&nbsp;<a href="https://angular-buch.com">Angular-Buch Team</a><p class="sponsor"><svg class="heart" viewbox="0 0 32 29.6"><path fill="white" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"></path></svg>This server is kindly sponsored by Koyeb.<br>Koyeb is a developer-friendly serverless platform to deploy apps globally.<br><a href="https://www.koyeb.com/" target="_blank">Give them a try, free of charge!</a></p><script>function resetBookList() {
  const resetOK = document.querySelector('#resetOK');
  if (!confirm('Do you want to reset the book list?')) {
    return;
  }

  fetch('/books', { method: 'DELETE' }).then(() => {
    resetOK.style.visibility = 'visible';

    setTimeout(() => resetOK.style.visibility = 'hidden', 1000);
  });
}</script></body></html>`;
}
