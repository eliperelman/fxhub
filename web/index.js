'use strict';

let api = require('./api');
let bodyParser = require('body-parser');
let express = require('express');
let seneca = require('seneca');

let app = express();
let service = seneca();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(service.export('web'));
app.use((request, response, next) => {
  request.service = {
    act: (spec, data) => {
      return new Promise((resolve, reject) => {
        request.seneca.act(spec, data, (err, response) => {
          err ?
            reject(err) :
            resolve(response);
        });
      });
    }
  };

  next();
});
app.use('/api', api);

service
  .use('mesh', { auto: true })
  .ready(() => {
    app.listen(process.env.PORT);
    service.log.info(`Web service listening on port ${process.env.PORT}`);
  });
