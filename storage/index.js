'use strict';

let service = require('seneca')();
let Datastore = require('nedb');

let db = new Datastore({ filename: 'storage.db', autoload: true });

service.add('role:storage,cmd:save', (args, done) => {
  // TODO: wire up to nedb storage
  console.log(args);
  done(null, { data: 'SUCCESS!' });
});

service.add('role:storage,cmd:delete', (args, done) => {
  // TODO: wire yp to remove from nedb storage
  console.log('DELETING');
  done(null, { data: 'YAY' });
});

service.use('mesh', { auto: true, pin: 'role:storage' });
