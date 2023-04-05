const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require("path");

const app = express();

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all routes not matched by a static file
app.get('*', (req, res, next) => {
    if (req.headers.host.startsWith('www.')) {
        const redirectHost = req.headers.host.slice(4);
        return res.redirect(301, `https://${redirectHost}${req.url}`);
    }
    if (!req.originalUrl.startsWith('/static/')) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } else {
        next();
    }
});

const httpsServer = https.createServer({
    key: fs.readFileSync('../.cert/your_domain.key.txt'),
    cert: fs.readFileSync('../.cert/certificate.csr')
}, app);

const httpServer = http.createServer(app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});