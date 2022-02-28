if (window.Worker) {
  var pollingWorker = new Worker('pollingWorker.js');
  pollingWorker.postMessage({});
} else {
  var poll = require('./pollingWorker.js')
}