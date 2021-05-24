import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import Select from 'react-select'

function Compete({ setText, onRestart, index, setIndex }) {

    let Parser = require('rss-parser');
    let parser = new Parser();
    const [arr, setArr] = useState("")
    const [origen, setOrigen] = useState(null)
    let array = [null]

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
        /*{
            label: "Cointelegraph",
            value: "https://es.cointelegraph.com/rss"
        }*/
        {
            label: "Genbeta",
            value: "http://feeds.weblogssl.com/genbeta"
        },
    ]
 
  // handle onChange event en cada dropdown
  const handleChange = e => {
    getText(e.value)
    setOrigen(e.value)
  }

    return (
        <div className="main-section">
            <Select
                placeholder="Select Option"
                className="url-select"
                value={data.find(obj => obj.value === origen)}
                options={data} 
                onChange={handleChange}
            />
            <Button onClick={() => { if (index > 1) { setIndex(index - 1) } }}>
                <p>Prev</p>
            </Button>
            <Button onClick={() => { if (index < arr.length - 1) { setIndex(index + 1) } }}>
                <p>Next</p>
            </Button>
            <Button onClick={onRestart}>Restart</Button>          
        </div>
    )
}

export default Compete
