const kycModel = require("../models/kycModel");

exports.saveKYC = async (req, res) => {
    console.log("KYC form submission request received");
    console.log("Authenticated User:", req.user); // Debugging

    try {
        if (!req.user || !req.user.id) {
          return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const { companyName, participantName, email, contactNo, gst, panCardNumber, tshirtSize } = req.body;

        const companyLogo = req.files['companyLogo'] ? req.files['companyLogo'][0].path : '';
        const aadhaarImage = req.files['aadhaarImage'] ? req.files['aadhaarImage'][0].path : '';
        const passportPhoto = req.files['passportPhoto'] ? req.files['passportPhoto'][0].path : '';

        if (!companyName || !participantName || !email || !contactNo || !gst || !panCardNumber || !tshirtSize || !companyLogo || !aadhaarImage || !passportPhoto) {
          return res.status(400).json({ message: 'All fields are required.' });
        }

        const newKYC = new kycModel({
          userID: req.user.id,
          companyName,
          companyLogo,
          participantName,
          email,
          contactNo,
          aadhaarImage,
          passportPhoto,
          gst,
          panCardNumber,
          tshirtSize
        });

        await newKYC.save();

        res.status(201).json({ message: 'KYC form submitted successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};
