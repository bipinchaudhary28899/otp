const express = require("express");
const app = express();

const port = 8000;
const config = require("./config");
const path = require("path");

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = "AC4c2caab6cbde721ca09d309b08478075";
const authToken = "086f8de53dcb8c44abe2d21eb2a87376";
const client = require("twilio")(accountSid, authToken);

// for otp createion..

app.post("/login", (req, res) => {
  client.verify
    .services("VA6dba972120400fb646b68e05b3470fdb")
    .verifications.create({ to: `+91${req.body.mobile}`, channel: "sms" })
    .then((verification) => {
      console.log(verification);
      res.render("code", {
        mobileNumber: req.body.mobile,
      });
    });
});

// for verification...
app.post("/verify", (req, res) => {
  client.verify
    .services("VA6dba972120400fb646b68e05b3470fdb")
    .verificationChecks.create({
      to: `+91${req.body.mobile}`,
      code: req.body.OTP,
    })
    .then((verification_check) => {
      console.log(verification_check);
      res.render('welcome');
    });
});

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(port, () => {
  console.log("server is running at " + port);
});
