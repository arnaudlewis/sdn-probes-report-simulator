'use strict'

const request = require('request');
const SEED_DELAY = process.argv[2] || 200; //ms
const data = require('./data/origins.json');

const SERVER_URL = 'http://algolia.dev/api/report';

function reportToServer(ping) {
  return new Promise(resolve => {
    request.post(SERVER_URL, {form: ping})
    request(SERVER_URL, function(error, response, body) {
      if(error) reject();
      console.log(ping.origin);
      setTimeout(resolve, SEED_DELAY);
    });
  });
}

function run(dataset) {
  if(!dataset) return;
  const ping = dataset.shift();
  reportToServer(ping)
  .then(() => run(dataset))
  .catch(e => console.error(e));
}

run(data);
