const Contact = require('../models/contact-model');

const ContactController = async (req, res) => {
    try {
        const data = req.body;
        await Contact.create(data);
        res.status(200).json({ message: 'Contact Form send successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Contact form not delivered' })
    }
}

module.exports = ContactController;