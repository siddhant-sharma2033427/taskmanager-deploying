import User from "../models/User.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";
const JWT_SECRET = "TaskManager@123";

export const NewUser = async (req, res) => {
    try {
        console.log("reg",req.body)
        //checking for errors in body
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //checking weather any user with the email exists or not if he does exits and do not move further
        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(400).json({ error: "Sorry the user with this email already exists", user });
        }

        //generating salt for encrypting password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //creating new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email.toLowerCase()
        });
        const data = {
            user: {
                id: user.id
            }
        }
        //creating jsonwebtoken and returning so that we can store it to user browser for authentication
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken,success:true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const UserLogin = async (req, res) => {
    let success = true;
    console.log("controller",req.body);

    //validating weather all the credientials are right or not based on condition from route.js
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    let { email, password } = req.body;
    try {
        email = email.toLowerCase();
        //checking weather user exists or not
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        //checking weather user password is matching with db password or not
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        //assigning jwt token for authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        console.log(authtoken);
        res.status(200).json({ success, authtoken });

    } catch (error) {
        console.error(error.message,"controller");
        res.status(500).send("Internal Server Error");
    }
}

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
export const GetUser = async (req, res) => {
    try {
        //extracting user id from middleware 
        let userId = req.user.id;
        // returning user details after removing password
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}