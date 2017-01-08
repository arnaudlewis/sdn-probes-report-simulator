'use strict'

const request = require('request');
const SEED_DELAY = process.argv[2] || 200; //ms
const data = require('./data/origins.json');

const SERVER_URL = 'http://algolia.dev/report';

function reportToServer(ping) {
  return new Promise(resolve => {
    const options = {
      url: SERVER_URL,
      method: "POST",
      json: true,
      headers: {
          "content-type": "application/json",
      },
      body: ping,
    };
    request(options, function(error, response, body) {
      console.log(ping.origin);
      if(error) reject(error);
      if(response.statusCode >= 400 && response.statusCode < 500) console.error(response.body)
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
