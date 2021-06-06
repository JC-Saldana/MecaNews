import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import Select from 'react-select'
import './main.css'
import { useSelector } from 'react-redux';

function Compete({ setText, onRestart, index, setIndex, link, setLink }) {

    const user = JSON.parse(localStorage.getItem("profile"))
    const userId = user?.result?.googleId || user?.result?._id

    const posts = useSelector((state) => state.posts)

    let Parser = require('rss-parser');
    let parser = new Parser();
    const CORS = "https://mecanews-cors.herokuapp.com/"
 
    const [arr, setArr] = useState("")
    const [arrLink, setArrLink] = useState("")

    const [origen, setOrigen] = useState(null)

    let array = [null]
    let arrayLink = [null]

    const data2 = []
    
    posts.forEach(ele => {
        if (ele.userId === userId) {
            data2.push(ele)
        } else {
            return null
        }
    })

    const getText = (u) => {
        (async () => {
            u = CORS + u
            let feed = await parser.parseURL(u);
            let num = 0
            feed.items.forEach(item => {
                // console.log(item.title + ':' + item.link)
                num++
                //console.log("........." + num + "........." + item.title)

                array.push(item.title)
                arrayLink.push(item.link)
                setArr(array)
                setArrLink(arrayLink)
                console.log(array)
            });
        })();
    }


    setText(arr[index])
    setLink(arrLink[index])

    const data = [
        {
            label: "El mundo - última hora",
            value: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml"
        },
        {
            label: "Genbeta",
            value: "http://feeds.weblogssl.com/genbeta"
        },
        {
            label: "Inicia sesión para +",
            value: ""
        },
    ]

    // handle onChange event en cada dropdown
    const handleChange = e => {
        onRestart()
        setOrigen(e.value)
        getText(e.value)
    }

    return (
        <div className="main-section">
            <div className="row-1">
                <Button href={link} target="_blank">ver noticia </Button>
                <Select
                    placeholder="Origen"
                    className="url-select"
                    value={data2.find(obj => obj.value === origen)}
                    options={
                        user ? (data2) : (data)
                    }
                    onChange={handleChange}    
                />

            </div>
            <div className="row-2">
                <Button onClick={() => { if (index > 1) { setIndex(index - 1) } }}>
                    <ArrowBackIcon />
                </Button>
                <Button onClick={onRestart}>Restart</Button>
                <Button onClick={() => { if (index < arr.length - 1) { setIndex(index + 1) } }}>
                    <ArrowForwardIcon />
                </Button>
            </div>
        </div>
    )
}

export default Compete
