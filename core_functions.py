import requests
import random
import ssl
import cloudscraper
import scapy.all as scapy
from scapy.layers.tls.extensions import TLS_Ext_SupportedGroups, TLS_Ext_ECPointFormats
from scapy.layers.tls.handshake import TLSClientHello
import hashlib

# CAPTCHA API Key (can be set during runtime)
CAPTCHA_API_KEY = None

# JA3 Fingerprinting Functions
def extract_ja3_data(packet):
    if packet.haslayer(TLSClientHello):
        tls_layer = packet[TLSClientHello]
        
        # TLS Version
        version = tls_layer.version
        
        # Cipher Suites
        ciphers = ','.join(str(cipher) for cipher in tls_layer.ciphers)
        
        # Extensions
        extensions = ','.join(str(ext.type) for ext in tls_layer.ext)
        
        # Elliptic Curves
        curves = ''
        for ext in tls_layer.ext:
            if isinstance(ext, TLS_Ext_SupportedGroups):
                curves = ','.join(str(group) for group in ext.groups)
        
        # EC Point Formats
        point_formats = ''
        for ext in tls_layer.ext:
            if isinstance(ext, TLS_Ext_ECPointFormats):
                point_formats = ','.join(str(format) for format in ext.ecpl)
        
        return f"{version},{ciphers},{extensions},{curves},{point_formats}"
    return None

def generate_ja3_hash(ja3_string):
    return hashlib.md5(ja3_string.encode()).hexdigest()

def capture_and_fingerprint(interface='eth0', count=10):
    print(f"Capturing {count} TLS Client Hello packets on interface {interface}...")
    packets = scapy.sniff(iface=interface, filter="tcp port 443", count=count)
    
    for packet in packets:
        ja3_string = extract_ja3_data(packet)
        if ja3_string:
            ja3_hash = generate_ja3_hash(ja3_string)
            print(f"JA3 String: {ja3_string}")
            print(f"JA3 Hash: {ja3_hash}")
            print("---")

# Load proxies from file
def load_proxies():
    try:
        with open("proxy.txt", "r") as proxy_file:
            proxies = proxy_file.readlines()
            proxies = [proxy.strip() for proxy in proxies if proxy.strip()]
            return proxies
    except FileNotFoundError:
        print("[ERROR] proxy.txt file not found!")
        return []

# Select a random proxy from the list
def get_random_proxy(proxies):
    if proxies:
        proxy = random.choice(proxies)
        return {"http": f"http://{proxy}", "https": f"https://{proxy}"}
    return None

# Generate randomized polymorphic HTTP headers
def generate_polymorphic_headers():
    headers = {
        'User-Agent': random.choice([
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ]),
        'Accept': random.choice(['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', '*/*']),
        'Referer': random.choice(['https://www.google.com/', 'https://www.facebook.com/', 'https://www.youtube.com/']),
        'Accept-Encoding': random.choice(['gzip, deflate, br', 'identity']),
        'Accept-Language': random.choice(['en-US,en;q=0.5', 'en-GB,en;q=0.5', 'fr-FR,fr;q=0.5']),
        'Connection': random.choice(['keep-alive', 'close'])
    }
    return headers

# Custom TLS context for fingerprinting (TLS version and cipher suites) with JA3 fingerprinting
def create_tls_fingerprint_context():
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_3)  # Use TLSv1.3 for stronger encryption and stealth
    # Define cipher suites for the custom context (for JA3 evasion)
    context.set_ciphers('ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305')
    return context

# 2captcha CAPTCHA bypass
def solve_captcha(site_key, page_url):
    if not CAPTCHA_API_KEY:
        print("[ERROR] CAPTCHA API key not provided.")
        return None

    captcha_data = {
        'key': CAPTCHA_API_KEY,
        'method': 'userrecaptcha',
        'googlekey': site_key,
        'pageurl': page_url,
        'json': 1
    }
    try:
        # Send CAPTCHA solving request
        captcha_id = requests.post("http://2captcha.com/in.php", data=captcha_data).json()['request']
        
        # Poll for solution
        result = None
        while result is None:
            time.sleep(5)
            check_url = f"http://2captcha.com/res.php?key={CAPTCHA_API_KEY}&action=get&id={captcha_id}&json=1"
            response = requests.get(check_url).json()
            if response['status'] == 1:
                result = response['request']
            elif response['status'] == 0:
                print("[INFO] CAPTCHA solving in progress...")
        
        return result
    except Exception as e:
        print(f"[ERROR] CAPTCHA solving failed: {e}")
        return None