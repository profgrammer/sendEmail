const express = require('express');
const app = express();
const bp = require('body-parser');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 25,
    auth: {
        user: 'add email here',
        pass: 'password goes here'
    }
});

  



app.use(express.static('public'));
app.use(bp.json());

app.get('/', (req, res) => {
    res.render('index.html');
})

app.post('/register', (req, res) => {
    console.log(req.body.email, req.body.name);
    transporter.sendMail({
        from: 'from email',
        to: req.body.email,
        subject: 'Successfully registered for the event',
        text: `Hello ${req.body.name}, you have successfully registered for the event.`
    }, (error, info) => {
        if (error) {
            console.log(error);
            res.json(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.json(info.response);
          }
    })
})

app.listen(3000, console.log('listening on port 3000'));