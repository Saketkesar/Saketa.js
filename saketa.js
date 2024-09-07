class SecurityManager {
    constructor() {
        this.init();
    }

    init() {
        this.showLoadingScreen(); // Show loading screen at the start
        setTimeout(() => {
            this.removeLoadingScreen(); // Remove after 3 seconds
            this.detectBotAndAttacks();
            this.disableRightClickAndKeys();
            this.ddosProtection();
            this.preventDevTools();
        }, 3000); // 3-second delay
    }

    showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        `;

        // Security check text
        const loadingText = document.createElement('h1');
        loadingText.textContent = 'Security Check';
        loadingText.style.cssText = 'font-size: 24px; color: black; margin-bottom: 20px;';

        // Animated round button
        const loadingButton = document.createElement('div');
        loadingButton.id = 'loading-button';
        loadingButton.style.cssText = `
            width: 50px;
            height: 50px;
            border: 5px solid black;
            border-radius: 50%;
            border-top: 5px solid transparent;
            animation: spin 1s linear infinite;
        `;

        // Label below button
        const label = document.createElement('p');
        label.textContent = 'saketa.js created using AI by Saket Kesar';
        label.style.cssText = 'font-size: 16px; color: black; margin-top: 20px;';

        // Append elements to loading screen
        loadingScreen.appendChild(loadingText);
        loadingScreen.appendChild(loadingButton);
        loadingScreen.appendChild(label);
        document.body.appendChild(loadingScreen);

        // Animation for button spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    }

    detectBotAndAttacks() {
        let requestCount = 0;
        const maxRequests = 10;
        const timeWindow = 60000; // 1 minute
        const attacks = ['<script', 'SELECT * FROM', 'INSERT INTO', 'DELETE FROM', '--', 'DROP TABLE'];

        setInterval(() => {
            requestCount = 0;
        }, timeWindow);

        document.addEventListener('input', (event) => {
            requestCount++;
            if (requestCount > maxRequests) {
                alert('Too many requests. Please try again later.');
                return;
            }

            const input = event.target.value;
            for (let attack of attacks) {
                if (input.includes(attack)) {
                    alert('Potential attack detected. Please try again later.');
                    return;
                }
            }
        });

        // Proxy and VPN detection (basic implementation)
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                // Use a proxy/VPN detection API service here
                fetch(`https://proxycheck.io/v2/${ip}`)
                    .then(response => response.json())
                    .then(result => {
                        if (result[ip] && result[ip].proxy) {
                            alert('Proxy or VPN detected. Access denied.');
                        }
                    });
            });
    }

    ddosProtection() {
        window.addEventListener('load', () => {
            const interval = setInterval(() => {
                fetch(window.location.href)
                    .then(response => {
                        if (!response.ok) {
                            alert('DDoS protection triggered. Please try again later.');
                            clearInterval(interval);
                        }
                    });
            }, 5000); // Check every 5 seconds
        });
    }

    disableRightClickAndKeys() {
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('keydown', event => {
            if (event.ctrlKey && event.shiftKey && event.key === 'I' || event.key === 'i') {
                event.preventDefault();
            }
            if (event.ctrlKey && event.key === 'U' || event.key === 'u') {
                event.preventDefault();
            }
            if (event.ctrlKey && event.key === 'S' || event.key === 's') {
                event.preventDefault();
            }
            if (event.ctrlKey && event.shiftKey && event.key === 'C' || event.key === 'c') {
                event.preventDefault();
            }
            if (event.key === 'F12') {
                event.preventDefault();
            }
        });
    }

    preventDevTools() {
        // Detect if DevTools is open (basic technique)
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: () => {
                alert('DevTools detected. Access denied.');
                throw new Error('DevTools detected');
            }
        });
        console.log(element);
    }
}

window.SecurityManager = new SecurityManager();
