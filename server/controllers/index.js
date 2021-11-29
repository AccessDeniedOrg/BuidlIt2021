const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");

// Register User 
const sendOtp = async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    User.findOne({ email: email }, async function (err, data) {
        //send mail
        if (!data) {
            //generate otp
            const otp = Math.floor(100000 + Math.random() * 900000);
            console.log(otp);
            const ttl = 5 * 60 * 1000;
            const expires = Date.now() + ttl;
            const data = `${email}.${name}.${password}.${otp}.${expires}`;
            const hash = crypto
                .createHmac("sha256", process.env.EMAIL_SECRET_KEY)
                .update(data)
                .digest("hex");
            const fullHash = `${hash}.${expires}`;

            await sendMail(email, name, otp);
            res.status(200).send({
                msg: "Registered",
                expires,
                hash: fullHash,
                name,
                email,
                password,
                otp,
            });
        } else {
            res.send({ msg: "User already exists. Try a different email." });
        }
    });
};

// Send OTP to user via email
const sendMail = async (email, name, otp) => {
    sgMail.setApiKey(process.env.EMAIL_API_KEY);

    // Client message body
    const output = `
        <div style="padding:10px;  color: black ;font-size:16px; line-height: normal;">
            <p style="font-weight: bold;" >Hello ${name},</p>
            <p>Your OTP to verify email is ${otp}</p>
            <p>If you have not registered on the website, kindly ignore the email</p>
            <br/>
            <p>Have a Nice Day!</p>            
        </div>
        `;

    // Client message
    const messageUser = {
        to: email,
        from: {
            name: "CHARITY REGISTRATION",
            email: "tarang.padia2@gmail.com", // senders email as registered with sendgrid
        },
        subject: "Email Verification",
        html: output,
    };

    await sgMail.send(messageUser).then((response) => {
        console.log(response[0].statusCode);
    });
    return;
};

// verify and register
const registerUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hash = req.body.hash;
    const otp = req.body.otp;

    let [hashValue, expires] = hash.split(".");

    let now = Date.now();

    if (now > parseInt(expires)) {
        return res.send({ msg: "OTP Timeout" });
    }

    const data = `${email}.${name}.${password}.${otp}.${expires}`;
    const newCalculatedHash = crypto
        .createHmac("sha256", process.env.EMAIL_SECRET_KEY)
        .update(data)
        .digest("hex");

    if (newCalculatedHash === hashValue) {
        var newPerson = new User({
            email: email,
            name: name,
            password: password,
        });

        newPerson.save(function (err, Person) {
            if (err) console.log(err);
            else console.log("Successfully registered");
        });

        res.status(200).send({ msg: "Verified Success" });
    } else {
        res.send({ msg: "Invalid OTP" });
    }
};

// Login
const loginUser = async (req, res) => {
    User.findOne({ email: req.body.email }, async function (err, data) {
        if (data) {
            if (data.password === req.body.password) {
                res.status(200).send({
                    msg: "Logged In",
                    name: data.name,
                    email: req.body.email,
                });
            } else {
                res.send({ msg: "Incorrect Password" });
            }
        } else {
            res.send({ msg: "Invalid Email" });
        }
    });
};

module.exports = {
    sendOtp,
    registerUser,
    loginUser,
};