'use strict';

let service = require('seneca')();
let wifi = require('./wifi');

service.add('role:wifi,cmd:add', (args, done) => {
  console.log(args);
  done(null, { data: 'SUCCESS!' });
});

service.use('mesh', { auto: true, pin: 'role:wifi' });
