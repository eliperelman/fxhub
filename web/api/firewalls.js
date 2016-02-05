'use strict';

let express = require('express');

let router = express.Router();

router.get('/', getAll);
router.post('/', createRule);
router.delete('/', deleteRule);

module.exports = router;

function getAll(request, response) {

}

function createRule(request, response) {
  let service = request.service;
  let data = request.body;

  service
    .act('role:firewall,cmd:add', data)
    .then(() => service.act('role:storage,cmd:save', data))
    .then(() => response.sendStatus(200))
    .catch(err => response.status(400).send(err));
}

function deleteRule(request, response) {
  let service = request.service;
  let data = request.body;

  service
    .act('role:firewall,cmd:remove', data)
    .then(() => service.act('role:storage,cmd:delete', data))
    .then(() => response.sendStatus(204))
    .catch(err => response.status(400).send(err));
}
