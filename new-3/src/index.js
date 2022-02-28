if (window.Worker) {
  var pollingWorker = new Worker('pollingWorker.js');
  pollingWorker.postMessage({})
  pollingWorker.onmessage = function(e) {};
} else {
  var poll = require('./pollingWorker.js')
}