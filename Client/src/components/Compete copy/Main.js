import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import Select from 'react-select'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSelector } from 'react-redux';
import Rss from './Rss';

function Compete({ setText, onRestart, index, setIndex }) {
    const posts = useSelector((state) => state.posts )
    let Parser = require('rss-parser');
    let parser = new Parser();
    const [arr, setArr] = useState("")
    const [origen, setOrigen] = useState(null)
    let array = [null]
    const data2 = posts
    const getText = (u) => {
        (async () => {
            let feed = await parser.parseURL(u);
            let num = 0
            feed.items.forEach(item => {
                // console.log(item.title + ':' + item.link)
                num++
                //console.log("........." + num + "........." + item.title)
                array.push(item.title)
                setArr(array)
            });
        })();
    }
    
    setText(arr[index])

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
 console.log("Main data: ", data)
 console.log("Main data 2: ", data2, posts)
  // handle onChange event en cada dropdown
  const handleChange = e => {
    getText(e.value)
    setOrigen(e.value)
  }

    return (
        <div className="main-section">
            <div className="row-1">
                <Select
                    placeholder="Origen"
                    className="url-select"
                    value={data2.find(obj => obj.value === origen)}
                    options={data2}
                    onChange={handleChange}
                />

            </div>
            <div className="row-2">
                <Button onClick={() => { if (index > 1) { setIndex(index - 1) } }}>
                    <ArrowBackIcon/>
                </Button>
                <Button onClick={onRestart}>Restart</Button>
                <Button onClick={() => { if (index < arr.length - 1) { setIndex(index + 1) } }}>
                    <ArrowForwardIcon/>
                </Button>
            </div>
            <Rss/>
        </div>
    )
}

export default Compete
