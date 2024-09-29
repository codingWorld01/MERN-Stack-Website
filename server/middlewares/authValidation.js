const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authValidation = async (req, res, next) => {
    try {

        const token = req.header('Authorization');

        if (!token) {
            res
                .status(401)
                .json({ msg: "Invalid HTTP token" })
        }

        const jwttoken = token.replace('Bearer ', '');

        // console.log("jwttoken ", jwttoken);

        const isverified = jwt.verify(jwttoken, "THISISMERNSTACKPROJECT");
        // console.log(isverified);

        if (isverified) {
            const userData = await User.findOne({ email: isverified.email }).select({
                password: 0,
            });
            // console.log("userData ", userData);
            req.user = userData;
            req.token = token;
            req.userId = userData._id;
            next();
        }
    } catch (error) {
        console.log(`Error found in authvalidation ${error}`);
    }
}

module.exports = authValidation;
