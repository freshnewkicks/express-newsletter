const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

mailchimp.setConfig({
    apiKey: "a54125c1484791914ba3ba429d155840-us20",
    server: "https://us20.admin.mailchimp.com/"
});

app.get('/', async ( req,res) => {
    const mailchimpResponse = await mailchimp.ping.get();
    res.write(
        `Response: ${mailchimpResponse}`
    );
    res.send();
});