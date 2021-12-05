const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const router = require("./routes/index");
const donationRouter = require("./routes/charities");
const artistRouter = require("./routes/artist");
const onboardingRouter = require("./routes/Stripe/onboarding");
const paymentRouter = require("./routes/Stripe/payment");

const app = express();

// Connecting to mongodb
mongoose.connect(
	process.env.DATABASE_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (!err) {
			console.log("MongoDB Connected");
		} else {
			console.log("Error in connection : " + err);
		}
	}
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Working!");
});

// Base Routes
app.use("/api/auth", router.route);
app.use("/api/donation", donationRouter.route);
// app.use("/api/transactions", transactionRouter.route);
app.use("/api/artist", artistRouter.route);
app.use("/api/stripe-onBoarding", onboardingRouter.route);
app.use("/api/stripe-payment", paymentRouter.route);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
	console.log("Server Running on PORT " + PORT);
});
