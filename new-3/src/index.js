var pollingWorker = new Worker('./pollingWorker.js');
pollingWorker.addEventListener('message', function contentReceiverFunc(e) {});