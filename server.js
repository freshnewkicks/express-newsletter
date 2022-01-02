const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

app.get('/', (req,res) => {
    res.send('Express app on Heroku is operational..')
})