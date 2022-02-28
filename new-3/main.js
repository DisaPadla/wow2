if (window.Worker) {
  var pollingWorker = new Worker('../polling.js');
  pollingWorker.postMessage('');
} else {
  var poll = require('../polling.js')
}