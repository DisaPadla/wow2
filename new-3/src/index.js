if (window.Worker) {
  var pollingWorker = new Worker(new URL('./pollingWorker.js'), import.meta.url);
  pollingWorker.postMessage({})
  pollingWorker.onmessage = function(e) {};
} else {
  var poll = require('./pollingWorker.js')
}