
/***** Creamos las funciones (handlers) especificadas en las rutas. Ahora conectamos con API en cliente *****/

import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {

    const post = req.body
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()})

    try {
        await newPostMessage.save()
        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const uploadTime = async (req, res) => {

    const post = req.body
    const newPostMessage = new PostMessage(txt)

    try {
        await newPostMessage.save()
        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.tstatus(404).send("No post with that id")

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    // Id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully" })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: "Unaunthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id`)

    const post = await PostMessage.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        // Like the post
        post.likes.push(req.userId)
    } else {
        // Dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}
