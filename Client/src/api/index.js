import axios from "axios"

//const API = axios.create({ baseURL: "https://type-news.herokuapp.com" })
const API = axios.create({ baseURL: "http://localhost:5000" })

// Accion que ocurre en cada request
API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorisation = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req
})

/***** Aquí se reciben funciones del servidor. Luego ir a actions *****/

export const fetchPosts = () => API.get("/posts")
export const createPost = (newPost) => API.post("/posts", newPost)
export const uploadTime = (newTime) => API.post("/posts", newTime)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)


export const getText = (formData) => API.get("/user/signup", formData)