import os

def install_ddos_packages():
    print(f"\x1b[31m[\x1b[33mTeyMonzDDoS\x1b[31m]\x1b[0m \x1b[32m> \x1b[33mInstalling required packages for DDoS script...")

    # Update and install Termux base packages
    os.system('pkg update -y && pkg upgrade -y')
    os.system('pkg install wget curl -y')

    # Install Node.js and npm
    print(f"\x1b[33mInstalling Node.js...\x1b[0m")
    os.system('pkg install nodejs-lts -y')

    # Install required npm packages for the DDoS tool
    print(f"\x1b[33mInstalling required npm packages...\x1b[0m")
    os.system('npm install axios')        # For HTTP requests
    os.system('npm install chalk')        # For colored terminal output
    os.system('npm install figlet')       # For ASCII art
    os.system('npm install readline-sync') # For interactive terminal input
    os.system('npm install ws')           # WebSocket package for WebSocket flooding
    os.system('npm install dgram')        # For UDP-based attacks (for reflection and amplification)
    os.system('npm install puppeteer')    # Headless browser for Cloudflare bypass
    os.system('npm install http2')        # HTTP/2 support
    os.system('npm install http3')        # HTTP/3 (QUIC) support
    
    # Print completion message
    print(f"\x1b[32mInstallation complete. You can now run the DDoS tool using main.js and bypass-techniques.js.\x1b[0m")

if __name__ == "__main__":
    try:
        install_ddos_packages()
    except Exception as e:
        print(f"\x1b[31mError during installation: {e}\x1b[0m")