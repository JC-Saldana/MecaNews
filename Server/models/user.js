import mongoose from "mongoose"

// Schema: mongoose allows us to use uniformity between documents, so we create our norms
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
})

// Transform schema into model
export default mongoose.model("User", userSchema)