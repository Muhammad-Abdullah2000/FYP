import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

///// Sign Up User
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All feilds are required'));
    };

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpire: Date.now() + 3600000 // OTP valid for 1 hour
    });

    try {

        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: '465',
            secure: false,
            auth: {
                user: '',
                pass: ''
            }
        });

        const mailOptions = {
            from: '',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return next(errorHandler(500, 'Email could not be sent'));
            }
            res.status(200).json({ message: 'Signup successfully. OTP sent to your email' });
        });

    } catch (error) {

        next(error);

    };

};

export const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(errorHandler(400, 'Email and OTP are required'));
    }

    try {
        const user = await User.findOne({ email, otp, otpExpire: { $gt: Date.now() } });

        if (!user) {
            return next(errorHandler(400, 'Invalid OTP or OTP expired'));
        }

        user.otp = undefined;
        user.otpExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        next(error);
    }
};


///// Sign In User
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All feilds are required'));
    };

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        };

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        };

        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET,
        );

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);


    } catch (error) {
        next(error);
    }
};

export const toggleAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isAdmin = !user.isAdmin;
        await user.save();
        res.json({ message: 'User admin status updated', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//// Google Authentication
// export const google = async (req, res, next) => {

//     const { email, name, googlePhotoUrl } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             const { password, ...rest } = user._doc;

//             res.status(200).cookie('access_token', token, {
//                 httpOnly: true,
//             }).json(rest);

//         } else {
//             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//             const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//             const newUser = new User({
//                 username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
//                 email,
//                 password: hashedPassword,
//                 profilePicture: googlePhotoUrl,
//             });

//             await newUser.save();

//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             const { password, ...rest } = user._doc;

//             res.status(200).cookie('access_token', token, {
//                 httpOnly: true,
//             }).json(rest);
//         };

//     } catch (error) {
//         next(error);
//     }

// };

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

