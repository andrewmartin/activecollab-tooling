const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const routes = require('./routes');
const nextApp = next({ dev });

const PORT = process.env.PORT || 4000;

const handler = routes.getRequestHandler(nextApp);

nextApp.prepare().then(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', require('./api/router'));

  app.use(handler);

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
