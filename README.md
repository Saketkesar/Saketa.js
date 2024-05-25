# Saketa.js

# RobotCaptcha

RobotCaptcha is a JavaScript library designed to protect websites from bots, DDoS attacks, phishing, and SQL injection attempts. It provides an easy-to-use CAPTCHA system with enhanced security features and animations.

## Usage

To use RobotCaptcha, include the library in your HTML file and initialize it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Usage of RobotCaptcha</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        #main-content {
            display: none;
        }
    </style>
</head>
<body>
    <div id="main-content">
        <!-- Main content of your website goes here -->
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="https://saketkesar.github.io/Saketa.js/saketa.js"></script>
    <script>
        window.onload = () => {
            new RobotCaptcha();
        };
    </script>
</body>
</html>
