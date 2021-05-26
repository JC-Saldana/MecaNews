import { Backdrop, Button, FormHelperText } from '@material-ui/core';
import React, { useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import teclado from "../../img/Teclado.png"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: "#03040ac4",
        display: "flex",
        flexDirection: "column"
    },
}));


function Main({ setText, onRestart }) {
    const classes = useStyles();
    const [arr, setArr] = useState("")
    const [origen, setOrigen] = useState(null)


    const getText = (u) => {
        setArr(u)
    }

    setText(arr)

    const data = [
        {
            label: "Fila 1",
            value: "qweoi urqpytqpiw yywoeirq uweroqie yqyti qweirqu"
        },
        {
            label: "Fila 2",
            value: "sñdk ljfañl sdkhgañks djfsdkhfañ kdghad kjfhg kañ"
        },
        {
            label: "Fila 3",
            value: ".z,cx mnvz,xm bczcn mv.z,x cmvn .z,zcvnz.m nzcv"
        },
        {
            label: "Pangramas",
            value: "El viejo Señor Gómez pedía queso, kiwi y habas, pero le ha tocado un saxofón"
        }
    ]

    // handle onChange event en cada dropdown
    const handleChange = e => {
        getText(e.value)
        setOrigen(e.value)
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div className="main-section">
            <Button variant="outlined" color="primary" onClick={handleToggle}>
                Ver colocación dedos
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <img src={teclado} />
                <h1>¡Es muy sencillo!</h1>
                <h2><p>Si usas 2 dedos para escribir, <br />
                    olvida tus hábitos y cambia, sin prisa, <br />
                    por el dedo correcto para cada tecla. <br /></p>
                    <p>Coloca los dedos índice (naranja y rosa) <br/>
                     en la f y j como punto de partida.</p>
                     <p>Trata de no mirar el teclado... <br/>
                     ¡tienes otro en la pantalla si lo necesitas!</p>
                </h2>
            </Backdrop>
            <CardMedia
                className={classes.media}
                image="Client\src\img\Teclado.png"
                title="Paella dish"
            />
            <Select
                placeholder="Elige filas"
                className="url-select"
                value={data.find(obj => obj.value === origen)}
                options={data}
                onChange={handleChange}
            />
            <Button onClick={onRestart}>Restart</Button>

        </div>
    )
}

export default Main
