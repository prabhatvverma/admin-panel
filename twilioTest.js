const accountSid = "AC0ee612aac819a57c970c108353508d44";
const authToken = "447c57b0c889f6cf3943c2682f4c2866";
const verifySid = "VA7a6d944b43d978dd48ada3206538bb29";
const client = require("twilio")(accountSid, authToken,{
    autoRetry: true,
    maxRetries: 3
});

client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+918756590708", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+919795969539", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });

