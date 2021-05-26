import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
 
function Compete() {
    const user = JSON.parse(localStorage.getItem("profile"))
    const userId = user?.result?.googleId || user?.result?._id
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const [postData, setPostData] = useState({ label: "pj:", value: "pj:", userId: userId })
    const data2 = posts

    console.log("Rss data 2: ", data2, posts)

    const handleSubmit = (e) => {
        console.log(postData)
        e.preventDefault()
        dispatch(createPost({ ...postData }))
    }
    return (
        <div className="main-section">
            <div className="dir">
                <Button component={Link} to="/Practice" variant="outlined"><ArrowBackIosIcon className="backHome" /></Button>
                <h1>Practica</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <TextField label="label" value={postData.label} onChange={(e) => setPostData({ ...postData, label: e.target.value })} />
                <TextField label="value" value={postData.value} onChange={(e) => setPostData({ ...postData, value: e.target.value })} />
                <Button type="submit" >Añadir RSS</Button>
            </form>

        </div>
    )
}

export default Compete
