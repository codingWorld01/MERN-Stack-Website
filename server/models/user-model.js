const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }

})


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified(user.password)) {
        next();
    }

    try {
        const rounds = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(user.password, rounds);
        user.password = hashpassword;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateTocken = function () {
    try {
            return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY
        , 
        {
            expiresIn: "30d",
        });
    }
    catch(error) {
        console.log("Error in generate tocken ", error);
    }
}

userSchema.methods.compareit = async function (password) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("Error in comparing password " , error);
    }
}

const User = new mongoose.model("User", userSchema);
module.exports = User;