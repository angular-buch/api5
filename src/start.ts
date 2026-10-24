import { createApp } from './server.ts';

const port = Number(process.env.PORT) || 3000;

createApp().listen(port, () => {
  console.log(`BookMonkey 5 API server on port ${port}`);
});
