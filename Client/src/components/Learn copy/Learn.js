import React, { useState } from 'react';
import Preview from './Preview';
import { Link } from "react-router-dom"
import { Button, Paper, TextField } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './learn.css'
import Main from './Main';
import Keyboard from './Keyboard';

const Learn = () => {
  const initialState = {
    text: "",
    userInput: '',
    symbols: 0,
    finished: false
  }

  const [state, setState] = useState(initialState)
  const [started, setStarted] = useState(false)
  const [text, setText] = useState()
  const [index, setIndex] = useState(1)


  const onRestart = () => {
    setState(initialState)
    setStarted(false)
    setColor(initialState)
  }

  const onUserInputChange = (e) => {
    if (text) {
      const v = e.target.value;
      if (started === false) {
        setStarted(true)
      }
      onFinish(v)
      setState({
        text: state.text,
        userInput: v,

      })
    }

  }

  const onFinish = (userInput) => {
    console.log("userinput" + userInput + "text" + state.text)
    if (userInput === state.text) {
      clearInterval(state.interval)
      console.log("truly finished")
      setState({
        finished: true
      })
    }
  }

  // para keyboard

  const changeColor = (key) => {
    let items = (initialState)
    let selectedColor = "lightgreen"
    console.log(items, initialState)
    // Switch solo para cambiar color manos
    switch (key) {
      case "1": case "q": case "a": case "z":
        items[1] = selectedColor
        break
      case "2": case "w": case "s": case "x":
        items[2] = selectedColor
        break
      case "3": case "e": case "d": case "c":
        items[3] = selectedColor
        break
      case "4": case "r": case "f": case "v":
        items[4] = selectedColor
        break
      case "5": case "t": case "g": case "b":
        items[5] = selectedColor
        break
      case "6": case "y": case "h": case "n":
        items[6] = selectedColor
        break
      case "7": case "u": case "j": case "m":
        items[7] = selectedColor
        break
      case "8": case "i": case "k": case ",":
        items[8] = selectedColor
        break
      case "9": case "o": case "l": case ".":
        items[9] = selectedColor
        break
      case "0": case "p": case "ñ": case "-":
        items[10] = selectedColor
        break
      default:

        break

    }
    // Cambia color teclado
    items[key] = selectedColor
    setColor(items)
  }

  const initialColor = "lightgray"
  const initialStateKeyboard = {

    a: initialColor, s: initialColor, d: initialColor, f: initialColor, g: initialColor,
    h: initialColor, j: initialColor, k: initialColor, l: initialColor, ñ: initialColor,

    q: initialColor, w: initialColor, e: initialColor, r: initialColor, t: initialColor,
    y: initialColor, u: initialColor, i: initialColor, o: initialColor, p: initialColor,

    a: initialColor, s: initialColor, d: initialColor, f: initialColor, g: initialColor,
    h: initialColor, j: initialColor, k: initialColor, l: initialColor, ñ: initialColor,

    1: initialColor, 2: initialColor, 3: initialColor, 4: initialColor, 5: initialColor,
    6: initialColor, 7: initialColor, 8: initialColor, 9: initialColor, 10: initialColor

  }

  const [color, setColor] = useState(initialStateKeyboard)
  const [textColor, setTextColor] = useState({
    a: "black",
    b: "black"
  });


  const handleKeyPress = (event) => {
    changeColor(text[state.userInput.length + 1])
  }

  // - para keyboard

  return (
    <div>
      <div className="dir">
        <Button component={Link} to="/" variant="outlined"><ArrowBackIosIcon className="backHome" /></Button>
        <h1 className="title">Aprende</h1>
      </div>
      <Paper className="paper" elevation={3}>
        <Main setText={setText} onRestart={onRestart} index={index} setIndex={setIndex} />
        <Keyboard color={color} textColor={setColor} />
        <Preview text={text} input={state.userInput} className="preview" />
        <TextField className="field" label="Let's Start!" variant="outlined"
          value={state.userInput}
          onChange={onUserInputChange}
          placeholder={text ? (
            "Go!"
          ) : (
            "Elige antes un texto!"
          )}
          readOnly={state.finished}
          onKeyPress={handleKeyPress}
        />
      </Paper>
    </div>
  );
}

export default Learn;
