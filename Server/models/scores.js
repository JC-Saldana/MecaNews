import mongoose from "mongoose"

// Schema: mongoose allows us to use uniformity between documents, so we create our norms
const scoreSchema = mongoose.Schema({
    userId: String,
    userName: String,
    category: String,
    scores: [],
    media: String,
    mediaCinco: String,
})

// Transform schema into model
const Scores = mongoose.model("Scores",scoreSchema)

export default Scores