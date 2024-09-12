import os

def install_ddos_packages():
    print(f"\x1b[31m[\x1b[33mTeyMonzDDoS\x1b[31m]\x1b[0m \x1b[32m> \x1b[33mInstalling required packages and setting up Debian environment...")

    # Update and install Termux base packages
    os.system('pkg update -y && pkg upgrade -y')
    os.system('pkg install wget curl proot tar -y')

    # Install Node.js and npm
    os.system('pkg install nodejs-lts -y')

    # Install Chromium in Termux
    print(f"\x1b[33mInstalling Chromium in Termux...\x1b[0m")
    os.system('pkg install chromium -y')

    # Download and set up Debian environment using proot
    print(f"\x1b[33mSetting up Debian environment using proot...\x1b[0m")
    os.system('wget https://raw.githubusercontent.com/sp4rkie/debian-on-termux/master/debian_on_termux.sh')
    os.system('bash debian_on_termux.sh')  # Run the downloaded script

    # Enter the Debian environment
    print(f"\x1b[33mEntering Debian environment...\x1b[0m")
    os.system('proot-distro login debian')

    # Inside Debian, install Chromium browser
    print(f"\x1b[33mInstalling Chromium inside Debian...\x1b[0m")
    os.system('apt update && apt install chromium -y')

    # Exit Debian environment after Chromium installation
    print(f"\x1b[33mExiting Debian environment...\x1b[0m")
    os.system('exit')

    # Install the necessary npm packages for the DDoS tool
    print(f"\x1b[33mInstalling required npm packages...\x1b[0m")
    os.system('npm install axios')        # HTTP requests
    os.system('npm install puppeteer')    # CAPTCHA bypass using headless browser
    os.system('npm install chalk')        # Colored output in terminal
    os.system('npm install readline-sync') # Interactive input handling (rate, time, etc.)
    os.system('npm install figlet')       # ASCII art for tool banner
    os.system('npm install net')          # Raw TCP connections
    os.system('npm install request')      # HTTP requests

    print(f"\x1b[32mInstallation complete. You can now run the DDoS tool.\x1b[0m")

if __name__ == "__main__":
    try:
        install_ddos_packages()
    except Exception as e:
        print(f"\x1b[31mError during installation: {e}\x1b[0m")
