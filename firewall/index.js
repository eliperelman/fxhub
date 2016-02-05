'use strict';

let service = require('seneca')();
let firewall = require('./firewall');

service.add('role:firewall,cmd:add', (args, done) => {
  firewall
    .forwardPort(args.external, args.internal, args.ip, args.protocol)
    .then(() => done(null, {}))
    .catch(done);
});

service.use('mesh', { auto: true, pin:'role:firewall' });
