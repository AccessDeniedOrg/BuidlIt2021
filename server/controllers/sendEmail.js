const sgMail = require("@sendgrid/mail");

const sendMail = async (email, name, emailBody, subject) => {
	sgMail.setApiKey(process.env.EMAIL_API_KEY);

	// Client message
	const messageUser = {
		to: email,
		from: {
			name: name,
			email: "tarang.padia2@gmail.com", // senders email as registered with sendgrid
		},
		subject: subject,
		html: emailBody,
	};

	await sgMail.send(messageUser).then((response) => {
		console.log(response[0].statusCode);
	});
	return;
};

module.exports = {
	sendMail,
};
