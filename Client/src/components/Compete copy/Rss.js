import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import Select from 'react-select'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSelector } from 'react-redux';

function Compete({ setText, onRestart, index, setIndex }) {
    const posts = useSelector((state) => state.posts)

    const data2 = posts

    console.log("Rss data: ", data)
    console.log("Rss data 2: ", data2, posts)
    const handleChange = e => {
        getText(e.value)
        setOrigen(e.value)
    }

    return (
        <div className="main-section">
            <form onSubmit={handleSubmit}>
                <TextField label="label" value={postData.label} onChange={(e) => setPostData({ ...postData, label: e.target.value })} />
                <TextField label="value" value={postData.value} onChange={(e) => setPostData({ ...postData, value: e.target.value })} />
                <Button type="submit" >Añadir RSS</Button>
            </form>

        </div>
    )
}

export default Compete
