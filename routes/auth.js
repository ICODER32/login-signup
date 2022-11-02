const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword, work } = req.body;

    try {
        if (!name || !email || !phone || !password || !cpassword || !work) {
            res.status(400).send('Please Fill Out details')
            return
        } else if (password !== cpassword) {
            res.status(400).send('Passwords are not matching')
            return
        } else {
            const userEx = await User.findOne({ email })
            if (userEx) {
                res.status(400).send({ message: "User already Exists" })
                return
            } else {
                const hashedPass = await bcrypt.hash(password, 12)
                const user = new User({ name, email, phone, password: hashedPass, work })
                const createdUser = await user.save()
                res.send(createdUser)
                return
            }

        }

    } catch (error) {
        res.status(500).send(error)
    }
})

// Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ message: "Enter valid credentials" })
        return
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).send({ message: "Invalid Credentials" })
            return
        } else {
            const passCompare = await bcrypt.compare(password, user.password)
            if (passCompare) {
                const token = await user.generateAuthToken();
                res.cookie('jwttoken', token, {
                    expires: new Date(Date.now() + 258920000),
                    httpOnly: true,
                })
                res.status(200).send(user)
                return
            } else {
                res.status(400).send({ message: "Enter valid credentials" })
                return
            }
        }
    } catch (error) {
        res.status(500).send(error)
        return
    }
})

module.exports = router