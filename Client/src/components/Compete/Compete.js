import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Preview from './Preview';
import { Link } from "react-router-dom"
import Speed from './Speed';
import { Button, Grid, Paper, setRef, TextField } from '@material-ui/core';
import './styles.css'
import Main from './Main';
import { createPost, getPosts  } from '../../actions/posts';

const Compete = () => {
  const dispatch = useDispatch()
  const initialState = {
    text: "",
    userInput: '',
    symbols: 0,
    finished: false
  }

  const [state, setState] = useState(initialState)
  const [sec, setSec] = useState(0)
  const [started, setStarted] = useState(false)
  const [intervalo, setIntervalo] = useState()
  const [text, setText] = useState()
  const [index, setIndex] = useState(0)




  /* Timer */
  let startTime

  const startTimer = () => {
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
  }, [started])

  useEffect(() => {
    dispatch(getPosts())
  }, [])




  function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
  }

  const tick = () => {
    setSec(getTimerTime())
  }

  /* -- Timer -- */

  const onRestart = () => {
    setState(initialState)
    setStarted(false)
    setSec(0)
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
      // subir resultados
      //dispatch(uploadTime({time: sec}))


      // - subir resultados
      console.log("subido")
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
        <Button component={Link} to="/" variant="outlined"><ArrowBackIosIcon className="backHome" /></Button>
        <h1>Compite</h1>
      </div>

      <Paper className="paper" elevation={3}>
        <h1>{sec}</h1>
        <Main setText={setText} onRestart={onRestart} index={index} setIndex={setIndex} />
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
        />      
      </Paper>
      <Speed sec={sec} symbols={state.symbols} />
        
    </div>
  );
}

export default Compete;
