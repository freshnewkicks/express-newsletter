const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const axios = require('axios');
const https = require('https');
const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening`);
});

// app.listen(3000, () => {
//     console.log('Local server listening on 3000');
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // static method will use the current directory
                                    // to serve static files

mailchimp.setConfig({
    apiKey: "a54125c1484791914ba3ba429d155840-us20",
    server: "us20.admin.mailchimp.com/"
});

app.get('/',  (req,res) => {
    res.sendFile('/index.html');
});

app.post('/success', (req,res) => {
    const formRequestBody = req.body;
    const listId = '9fe9636f6f';

    let data = {
        members: [
            {
                email_address: formRequestBody.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: formRequestBody.name,
                    AGREED: formRequestBody.agreed
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = `https://us20.api.mailchimp.com/3.0/lists/${listId}`;
    const options = {
        method: "POST",
        auth: `${data.members[0].merge_fields.FNAME}:a54125c1484791914ba3ba429d155840-us20`
    }
    const request = https.request(url, options, function(response){
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


// List Id
// 9fe9636f6f
