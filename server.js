const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const axios = require('axios');
const https = require('https');
const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening`);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // static method will use the current directory
                                    // to serve static files

app.get('/',  (req,res) => {
    res.sendFile('/index.html');
});

app.post('/success', (req,res) => {
    const formRequestBody = req.body;
    const listId = '9fe9636f6f';

    let membersData = {
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

    // turns data
    const jsonData = JSON.stringify(membersData);
    const url = `https://us20.api.mailchimp.com/3.0/lists/${listId}`;
    const options = {
        method: "POST",
        auth: `${membersData.members[0].merge_fields.FNAME}:a54125c1484791914ba3ba429d155840-us20`
    }

    // we want to post data to external resource
    // instead of getting data from an external server
    // https.request will make a request to post data to an external server

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            response.on('data', (data) => {
                console.log(JSON.parse(data));
            });
            res.sendFile(__dirname + '/success.html');
        } else if (response.statusCode !== 200) {
            response.on('data', (data) => {
                console.log(JSON.parse(data));
                res.sendFile(__dirname + '/failure.html');
            })
        }
    });

    // call methods on the https request method
    //
    request.write(jsonData);
    request.end();
});

