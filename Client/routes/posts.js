
/***** Aquí empieza todo. Creamos una ruta. Luego creamos su función en controller *****/

import express from "express"

import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js"
import auth from "../middleware/auth.js" // Lo añadiremos para permitir según hayan iniciado sesión o no 

const router = express.Router()

// Como se añadió prefijo, no se accede desde localhost:5000, sino localhost:5000/posts
router.get("/", getPosts)
router.post("/", auth, createPost)

// Patch es para actualizar. Actualiza id de forma dinámica
router.patch("/:id", auth, updatePost)

router.delete("/:id", auth, deletePost)
router.patch("/:id/likePost", auth, likePost)

export default router