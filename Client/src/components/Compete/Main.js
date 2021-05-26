
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';

function Compete({ setText, index, setIndex }) {

    let Parser = require('rss-parser');
    let parser = new Parser();

    const [arrTitle, setArrTitle] = useState("")
    const [arrOrigen, setArrOrigen] = useState("")

    let arrayTitle = [null]

    const getText = (u) => {
        (async () => {
            let feed = await parser.parseURL(u);
            feed.items.forEach(item => {
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

    const fateIndex = () => {
        const randomIndex = Math.floor(Math.random() * arrTitle.length)
        setIndex(randomIndex)
        console.log("Random index: ", randomIndex, arrTitle.length, arrTitle)
    }

    useEffect(() => {
        
        const randomOrigen = Math.floor(Math.random() * data.length)
        getText(data[randomOrigen].value)
        setArrOrigen(data[randomOrigen].label)

        console.log("Random origen: ", randomOrigen, data)
            
    }, [])

    setText(arrTitle[index])

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
