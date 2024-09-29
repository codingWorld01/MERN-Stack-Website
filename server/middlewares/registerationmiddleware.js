const { z } = require('zod');

const loginSchema = z.object({

    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("It must be in Email format")
    .min(4, { message: "Email should at least 4 characters" })
    .max(40, { message: "Email can lesser than 40 characters" }),


    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(4, { message: "password should at least 4 characters" })
        .max(40, { message: "password can lesser than 40 characters" }),

})

const signupSchema = loginSchema.extend({

    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(4, { message: "Username should at least 4 characters" })
        .max(40, { message: "Username can lesser than 40 characters" }),

    phone: z
        .string({ required_error: "phone number is required" })
        .trim()
        .min(10, { message: "phone number should at least 10 characters" })
        .max(20, { message: "phone number can lesser than 20 characters" }),

})

module.exports = {signupSchema, loginSchema};