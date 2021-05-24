import mongoose from "mongoose"

// Schema: mongoose allows us to use uniformity between documents, so we create our norms kadfñaljk
const postSchema = mongoose.Schema({
    time: []
})

// Transform schema into model
const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage