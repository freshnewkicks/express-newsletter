const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.listen(3000, () => {
    console.log(`Listening on Port 3000`)
});