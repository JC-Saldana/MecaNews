import React, { useEffect, useState } from 'react'

function Getxt() {

    let Parser = require('rss-parser');
    let parser = new Parser();
    const CORS = "https://mecanews-cors.herokuapp.com/"

    const [arrTitle, setArrTitle] = useState("")
    const [arrOrigen, setArrOrigen] = useState("")

    let arrayTitle = [null]

    const getText = (u) => {
        (async () => {
            u = CORS + u
            let feed = await parser.parseURL(u);
            let num = 0
            feed.items.forEach(item => {
                console.log(num + " - " + item.title)
                num++
                arrayTitle.push(item.title)
                setArrTitle(arrayTitle)
            });
        })();
    }

    const data = [
        {
            label: "El mundo - última hora",
            value: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml"
        },
        {
            label: "Xataka",
            value: "http://feeds.weblogssl.com/xataka2"
        },
        {
            label: "Genbeta",
            value: "http://feeds.weblogssl.com/genbeta"
        },
    ]

    useEffect(() => {
        const random = Math.floor(Math.random() * data.length)
        getText(data[random].value)
        setArrOrigen(data[random].label)
    }, [])


    return (

        <div className="footer-news">
            <h2>- Ultima hora -</h2><br/>
            <span>Origen: {arrOrigen} </span>
            <span className="span-footer">{arrTitle[1]} </span>
        </div>

    )
}

export default Getxt
