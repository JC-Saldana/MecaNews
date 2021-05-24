import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

function Getxt() {

    let Parser = require('rss-parser');
    let parser = new Parser();
    const [arrTitle, setArrTitle] = useState("")
    const [arrOrigen, setArrOrigen] = useState("")

    let arrayTitle = [null]

    const getText = (u) => {
        (async () => {
            let feed = await parser.parseURL(u);
            let num = 0
            feed.items.forEach(item => {
                // console.log(item.title + ':' + item.link)
                num++
                //console.log("........." + num + "........." + item.title)
                arrayTitle.push(item.title)
                setArrTitle(arrayTitle)
            });
        })();
    }



    const data = [
        {
            label: "El país",
            value: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/deportes/portada"
        },
        {
            label: "Xataca",
            value: "http://feeds.weblogssl.com/xataka2"
        },
        {
            label: "ABC",
            value: "https://www.abc.es/rss/feeds/abc_ultima.xml"
        },
        {
            label: "Cointelegraph",
            value: "https://es.cointelegraph.com/rss"
        },
        {
            label: "Genbeta",
            value: "http://feeds.weblogssl.com/genbeta"
        },
    ]

    const data2 = [
        "http://feeds.weblogssl.com/xataka2",
        "http://feeds.weblogssl.com/genbeta"
    ]

    // handle onChange event en cada dropdown
    useEffect(() => {
        const random = Math.floor(Math.random() * data.length)
        getText(data[random].value)
        setArrOrigen(data[random].label)
    }, [])


    return (

        <div className="footer-news">
            <h2>Latest News</h2><br/>
            <span>Origen: {arrOrigen} </span>
            <span className="span-footer">{arrTitle[1]} </span>
        </div>

    )
}

export default Getxt
