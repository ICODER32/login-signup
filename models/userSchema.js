const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    work: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [
        { token: { type: String, required: true } }
    ]
})
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token

    } catch (error) {
        console.log(error)
    }
}


const User = new mongoose.model('mernuser', userSchema)

module.exports = User

