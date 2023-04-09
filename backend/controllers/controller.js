const express = require("express")
const route = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("../db/conn");
const User = require("../model/userSchema");
const contactUs = require("../model/contactSchema");
const Otp = require("../model/otpSchema")
const nodemailer = require("nodemailer")


const home = (req, res) => {
    res.send("This is my home page route.")
}




const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(422).json({ error: "Email is required" })
        }

        const emailExists = await User.findOne({
            email: req.body.email
        });

        if (!emailExists) {
            return res.status(422).json({ error: "This email does not exist" })
        }

        const randomOtp = Math.floor(100000 + Math.random() * 900000);

        const generateOtp = await Otp.create({
            otpNumber: randomOtp,
            email: req.body.email,
            expiry: Date.now() + 2 * 60 * 1000 // OTP expires in 2 minute
        });


        //sending mail through nodemailer
        //use smtp for nodemailer transport
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.USERPASSWORD
            }
        })

        //sending an email with text
        const mailOptions = {
            from: process.env.USEREMAIL,
            to: req.body.email,
            subject: "Movie Mania Forget Password Otp",
            text: `Otp to reset your password is ${generateOtp.otpNumber}`
        }
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(info)
            }
        })

        return res.status(200).json({ msg: "Email sent successfully" })

    } catch (error) {
        console.log("error=>", error)
        return res.status(500).json({ error: "Something went wrong" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, otpNumber } = req.body;

        if (!email, !newPassword, !otpNumber) {
            return res.status(422).json({ error: "Please Fill all the fields" })
        }


        // Find user by email
        const admin = await User.findOne({ email: req.body.email });


        if (!admin) {
            return res.status(422).json({ error: "Invalid email" })
        }

        // Find OTP record by OTP
        const otpRecord = await Otp.findOne({
            otpNumber: req.body.otpNumber,
            expiry: { $gt: Date.now() }, // Check if OTP is not expired,
            email: req.body.email
        }).sort({ createdAt: 'desc' });


        if (!otpRecord) {
            return res.status(422).json({ error: "OTP not found or expired" });
        }

        console.log('otpRecord', otpRecord);

        // Hash new password
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
        // Update admin's password
        console.log('hashedPassword', hashedPassword);
        await User.updateOne({ email: req.body.email }, { password: hashedPassword });


        return res.status(200).json({ msg: "Password updated successfully" })

    } catch (error) {
        console.log('error=>', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}



const contact = async (req, res) => {
    const { name, email, contact, query } = req.body;
    if (!name || !email || !contact || !query) {
        return res.status(422).json({ error: "Please fill all the feilds" })
    }
    try {
        const userQuery = new contactUs({ name, email, contact, query });
        const resp = await userQuery.save();
        console.log(resp)
        res.status(201).json({ msg: resp })
        //sending mail through nodemailer
        //use smtp for nodemailer transport
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.USERPASSWORD
            }
        })

        //sending an email with text
        const mailOptions = {
            from: process.env.USEREMAIL,
            to: req.body.email,
            subject: "Query at Movie Mania",
            text: `Hello ${req.body.name} we have recieved your message our team will contact you soon`
        }
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(info)
            }
        })
        return res.status(200).json({ msg: "Query Submitted Successfully" })
    }
    catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

const signup = async (req, res) => {

    const { name, email, password, cpassword, phone } = req.body

    if (!name || !email || !password || !cpassword || !phone) {
        return res.status(422).json({ error: "Please fill all feilds" })
    }

    try {
        const userAlreadyExist = await User.findOne({ email: email });

        if (userAlreadyExist) {
            return res.status(422).json({ error: "Email already exist" })
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" })
        }
        const pass = await bcrypt.hash(password, 10)
        const cpass = await bcrypt.hash(cpassword, 10)
        const user = new User({ name, email, password: pass, cpassword: cpass, phone });
        const newUser = await user.save();

        return res.status(201).json({ msg: "User created" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all fields" })
        }
        const userLogin = await User.findOne({ email });
        if (!userLogin) {
            res.status(400).json({ error: "Invalid credentials" })
        }
        if (userLogin) {
            const validPass = await bcrypt.compare(password, userLogin.password)
            if (!validPass) {
                return res.status(400).json({ error: "Invalid credentials" })
            }
            else {
                //generate token
                const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY, {
                    expiresIn: "1d"
                })
                //cookie generate
                res.header("x-auth-token", token)
                const result = {
                    userLogin,
                    token
                }
                return res.status(201).json({ status: 201, result })
            }
            //res.json({token:token})

        }
    } catch (error) {
        console.log("error=>", error)
        return res.status(500).json({ error: "Something went wrong" });
    }
}

const validuser = async (req, res) => {
    try {
        const ValidUserOne = await User.findOne({ _id: req.userId })
        res.status(201).json({ status: 201, ValidUserOne })
    } catch (error) {
        res.status(401).json({ status: 401, error })

    }
}

const logout = async (req, res) => {
    try {
        // req.rootUser.token = req.rootUser.token.filter((currelem)=>{
        //     return currelem.token !== token
        // })       
        res.removeHeader("x-auth-token")
        req.rootUser.save()
        return res.status(200).json({ msg: "Logged out successfully" })

    } catch (error) {
        return res.status(500).json({ status: 500, error })
        console.log(error)
    }
}
module.exports = { home, forgetPassword, resetPassword, contact, signup, login, validuser, logout }
