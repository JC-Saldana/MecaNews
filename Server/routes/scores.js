
/***** Aquí empieza todo. Creamos una ruta. Luego creamos su función en controller *****/

import express from "express"

import { getScores, createScore, deleteScore } from "../controllers/scores.js"
import auth from "../middleware/auth.js" // Lo añadiremos para permitir según hayan iniciado sesión o no 

const router = express.Router()

// Como se añadió prefijo, no se accede desde localhost:5000, sino localhost:5000/score
router.get("/", getScores)
router.post("/", auth, createScore)
router.delete("/:id", auth, deleteScore)
// Patch es para actualizar. Actualiza id de forma dinámica

export default router