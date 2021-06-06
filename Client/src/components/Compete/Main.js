
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import './compete.css'

function Compete({ setText, index }) {

    let Parser = require('rss-parser');
    let parser = new Parser();
    const CORS = "https://mecanews-cors.herokuapp.com/"

    const [arrTitle, setArrTitle] = useState("")
    const [arrOrigen, setArrOrigen] = useState("")

    const getText = (u) => {
        (async () => {
            u = CORS + u
            let feed = await parser.parseURL(u);
            let arrayTitle = [null]
            feed.items.forEach(item => {
                arrayTitle.push(item.title)

            }); setArrTitle(arrayTitle)
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

    const fateIndex = () => {
        const randomOrigen = Math.floor(Math.random() * data.length)
        getText(data[randomOrigen].value)
        setArrOrigen(data[randomOrigen].label)
    }
    useEffect(() => {
        fateIndex()
    }, [index])

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * arrTitle.length)
        setText(arrTitle[randomIndex])
    }, [arrTitle])

    return (

        <div className="footer-news">
            <span>Origen: {arrOrigen} </span>
            <Button onClick={() => { fateIndex() }}>
                Get text
            </Button>
        </div>
    )

}

export default Compete
