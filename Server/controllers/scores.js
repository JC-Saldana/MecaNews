
/***** Creamos las funciones (handlers) especificadas en las rutas. Ahora conectamos con API en cliente *****/

import mongoose from "mongoose"
import Scores from "../models/scores.js"

export const getScores = async (req, res) => {
    try {
        const scores = await Scores.find()

        res.status(200).json(scores)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createScore = async (req, res) => {

    const score = req.body
    const scores = new Scores({ ...score, creator: req.userId, createdAt: new Date().toISOString()})
  
    try {
        await scores.save()
        res.status(201).json(scores)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteScore = async (req, res) => {
    const { id } = req.params

    // Id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    await Scores.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully" })
}