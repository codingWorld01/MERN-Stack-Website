const User = require('../models/user-model');
const bcrypt = require('bcryptjs')
const home = async (req, res) => {
    try {
        res.send('Welcome to Home page')
    }
    catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { username, email, phone, password, isAdmin } = req.body;

        const emailexits = await User.findOne({ email: email });

        if (emailexits) {
            return res.status(400).json({ extradetails: "Email exits" });
        }

        const data = await User.create({ username, email, phone, password, isAdmin });

        res.status(201).json({ msg: data, tocken: await data.generateTocken(), userId: data._id.toString() });
    }
    catch (error) {
        console.log("Error kyu aa "+error);
    }
}


const login = async function (req, res) {
    try {
        
        const { email, password } = req.body;
        const userexist = await User.findOne({ email });

        if (!userexist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const pass = await userexist.compareit(password);
        if (pass) {
            res.status(201).json({ msg: "Login Successfully", tocken: await userexist.generateTocken(), userId: userexist._id.toString() });
        }
        else {
            res.status(400).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.log("Error in login ", error);
    }
}

const user = async function (req, res) {
    try {
        const userData = req.user;
        return res.status(200).json(userData);
    } catch (error) {
        console.log(`Error Found in ${error}`);
    }
}

module.exports = { home, register, login, user};
