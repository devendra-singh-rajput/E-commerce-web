// const client = new twilio('ACCOUNT_SID', 'AUTH_TOKEN');
// const fromPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

const sendSMS= async(req, res) => {
  const { mobileNumber } = req.body;

  // Validate the phone number format
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(mobileNumber)) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }
  const regex = /^[6-9][0-9]{9}$/;
  if (!regex.test(mobileNumber)) {
      return res.status(400).json({ message: 'Invalid phone number' });
  }
  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Send OTP via SMS using Twilio
//   client.messages
    // .create({
    //   body: `Your OTP code is: ${otp}`,
    //   to: mobileNumber,  // Mobile number to send OTP to
    //   from: fromPhoneNumber,
    // })
    // .then(() => {
        console.log(otp)
      res.status(200).json({data:otp, success: true, message: 'OTP sent successfully' });
    // })
    // .catch((error) => {
    //   console.error('Error sending OTP:', error);
    //   res.status(500).json({ success: false, message: 'Failed to send OTP' });
    // });
};

module.exports=sendSMS