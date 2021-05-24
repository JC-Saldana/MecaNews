
import bcrypt from "bcryptjs" // To hash the password
import jwt from "jsonwebtoken" // Para guardar usuario en navegador

import User from "../models/user.js"

// LLegan los datos desde req.body
export const signin = async (req, res) => {
    // Desestructuramos
    const { email, password } = req.body
    try {

        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "testt", { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exists" })
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" })

        const hashedPassword = await bcrypt.hash(password, 12) // 12 is the salt (dificultad passwd)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, "testt", { expiresIn: "1h" })

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}