import mongoose from "mongoose"

// Schema: mongoose allows us to use uniformity between documents, so we create our norms
const postSchema = mongoose.Schema({
    label: String,
    value: String,
    userId: String,
})

// Transform schema into model
const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage