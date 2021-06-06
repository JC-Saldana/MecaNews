import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js"
import scoreRoutes from "./routes/scores.js"
import userRoutes from "./routes/user.js"

const app = express()
dotenv.config()

// Express middleware to connect to application
    // Añade prefijo posts a todas las rutas postRoutes


app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use("/posts", postRoutes)
app.use("/scores", scoreRoutes)
app.use("/user", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello to Memories API funcionando Carlos")
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`CORS enabled web Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
 
mongoose.set('useFindAndModify', false);