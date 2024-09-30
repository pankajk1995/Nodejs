const contact = require("../model/contact");


exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    const newContact = new contact({ name, email, message });
    await newContact.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting contact form');
  }
};
