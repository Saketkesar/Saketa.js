class RobotCaptcha {
    constructor() {
        this.captchaText = '';
        this.init();
    }

    init() {
        this.createCaptchaContainer();
        this.generateCaptcha();
        this.drawCaptcha();
        this.detectBotAndAttacks();
        this.disableRightClickAndKeys();
    }

    createCaptchaContainer() {
        if (document.getElementById('captcha-container')) {
            document.getElementById('captcha-container').remove();
        }

        const container = document.createElement('div');
        container.id = 'captcha-container';
        container.style.cssText = 'text-align: center; padding: 20px; background: white; box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; border-radius: 10px; animation: fadeIn 0.5s ease-in-out;';

        const title = document.createElement('h2');
        title.textContent = 'Please complete the CAPTCHA';

        const canvas = document.createElement('canvas');
        canvas.id = 'captchaCanvas';
        canvas.width = 200;
        canvas.height = 50;
        canvas.style.cssText = 'margin-bottom: 20px; border: 1px solid #ccc;';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'captchaInput';
        input.placeholder = 'Enter CAPTCHA';

        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh';
        refreshButton.style.cssText = 'margin-right: 10px;';
        refreshButton.addEventListener('click', () => this.init());

        const verifyButton = document.createElement('button');
        verifyButton.textContent = 'Verify';
        verifyButton.addEventListener('click', () => this.verifyCaptcha());

        container.appendChild(title);
        container.appendChild(canvas);
        container.appendChild(input);
        container.appendChild(refreshButton);
        container.appendChild(verifyButton);
        document.body.appendChild(container);

        anime({
            targets: '#captcha-container',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }

    generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.captchaText = '';
        for (let i = 0; i < 6; i++) {
            this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    drawCaptcha() {
        const canvas = document.getElementById('captchaCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background noise
        for (let i = 0; i < 30; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fill();
        }

        // Draw CAPTCHA text
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(this.captchaText, 50, 35);

        // Draw lines for extra security
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
    }

    verifyCaptcha() {
        const userInput = document.getElementById('captchaInput').value;
        if (userInput === this.captchaText) {
            document.getElementById('captcha-container').remove();
            document.getElementById('main-content').style.display = 'block';
        } else {
            alert('Incorrect CAPTCHA. Please try again.');
            this.init(); // Generate new CAPTCHA
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
                document.getElementById('captcha-container').remove();
                return;
            }

            const input = event.target.value;
            for (let attack of attacks) {
                if (input.includes(attack)) {
                    alert('Potential attack detected. Please try again later.');
                    document.getElementById('captcha-container').remove();
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
                            document.getElementById('captcha-container').remove();
                        }
                    });
            });

        // DDoS protection
        window.addEventListener('load', () => {
            const interval = setInterval(() => {
                fetch(window.location.href)
                    .then(response => {
                        if (!response.ok) {
                            alert('DDoS protection triggered. Please try again later.');
                            clearInterval(interval);
                            document.getElementById('captcha-container').remove();
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
        });
    }
}

window.RobotCaptcha = RobotCaptcha;
