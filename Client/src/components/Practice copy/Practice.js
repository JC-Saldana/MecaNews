import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import { Link } from "react-router-dom"
import Speed from './Speed';
import { Button, Paper, TextField } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './practice.css'
import Main from './Main';

const Learn = () => {

  const initialState = {
    text: "",
    userInput: '',
    symbols: 0,
    finished: false
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [state, setState] = useState(initialState)
  const [sec, setSec] = useState(0)
  const [started, setStarted] = useState(false)
  const [intervalo, setIntervalo] = useState()
  const [text, setText] = useState()
  const [news, setNews] = useState()
  const [index, setIndex] = useState(1)
  const [link, setLink] = useState()

  /* Timer */
  let startTime

  const startTimer = () => {
    console.log("Start")
    setSec(0)
    startTime = new Date()
    setIntervalo(setInterval(() => {
      tick()
    }, 1000))
  }


  useEffect(() => {
    if (!started) {
      clearInterval(intervalo)
    }
  })


  function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
  }

  const tick = () => {
    setSec(getTimerTime())
  }

  /* -- Timer -- */

  const onRestart = () => {
    console.log(state.finished)
    setState(initialState)
    setStarted(false)
    setSec(0)
    console.log(state)
  }

  const onUserInputChange = (e) => {
    if (text) {
      const v = e.target.value;
      if (started === false) {
        setStarted(true)
        startTimer()
      }

      setState({
        text: state.text,
        userInput: v,
        symbols: countCorrectSymbols(v),
        finished: state.finished
      })
      onFinish(v)
    }
  }

  const onFinish = (userInput) => {
    console.log("userinput" + userInput + "text" + text)
    if (userInput === text) {
      clearInterval(state.interval)
      console.log("truly finished")
      //subir sec
      setIndex(index + 1)
      onRestart()
    }
  }

  const countCorrectSymbols = (userInput) => {
    const text = state.text.replace(' ', '');
    return userInput.replace(' ', '').split('').filter((s, i) => s === text[i]).length;
  }

  return (
    <div>

      <div className="dir">
        <Button component={Link} to="/" variant="outlined"><ArrowBackIosIcon className="backHome"/></Button>
        <h1 className="title">Practica</h1>
        {user ? (
            <Button component={Link} to="/Rss" variant="outlined">+ Noticias</Button>
          ) : (
     
            <Button component={Link} to="/auth" variant="contained" color="primary">Personalizar noticias</Button>
          )}
        
      </div>

      <Paper className="paper" elevation={3}>
        <Main setText={setText} onRestart={onRestart} index={index} setIndex={setIndex} setNews={setNews} link={link} setLink={setLink} />
        <Preview text={text} userInput={state.userInput} />
        <TextField className="field" label="Let's Start!" variant="outlined"
          value={state.userInput}
          onChange={onUserInputChange}
          placeholder={text ? (
            "Go!"
          ) : (
            "Elige antes un texto!"
          )}
          readOnly={state.finished}
          news={news}
        />
      </Paper>
      <Speed sec={sec} symbols={state.symbols} />
    </div>
  );
}

export default Learn;
