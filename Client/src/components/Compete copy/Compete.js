import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Preview from './Preview';
import { Link } from "react-router-dom"
import Speed from './Speed';
import { Button, CircularProgress, Paper, TextField, Avatar } from '@material-ui/core';
import michi from "../../img/michi.jpg"
import guepardo from "../../img/guepardo.png"
import sonic from "../../img/sonic.png"
import './compete.css'
import Main from './Main';
import { createScore, deleteScore, getScores } from '../../actions/scores';

const Compete = () => {

  const dispatch = useDispatch()

  const initialState = {
    text: "",
    userInput: '',
    symbols: 0,
    finished: false
  }

  const user = JSON.parse(localStorage.getItem("profile"))
  const userId = user?.result?.googleId || user?.result?._id
  const [state, setState] = useState(initialState)
  const [sec, setSec] = useState(0)
  const [started, setStarted] = useState(false)
  const [intervalo, setIntervalo] = useState()
  const [text, setText] = useState()
  const [index, setIndex] = useState(0)

  const scores = useSelector((state) => state.scores)
  const myScores = []

  scores.length ?
    scores.forEach(ele => {
      if (ele.userId === userId) {
        myScores.push(ele)
      }
    }) : console.log("No posts", scores)

  console.log(scores)
  console.log(myScores)




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
    dispatch(getScores())
  }, [])

  useEffect(() => {
    if (!started) {
      clearInterval(intervalo)
      console.log(false)
    }
    console.log(true)
  }, [started])

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
    dispatch(getScores())    /* revisar si es necesario */
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
      uploadTime()
      setIndex(index + 1)
      onRestart()
    }
    dispatch(getScores()) /* revisar si es necesario */
  }

  const uploadTime = () => {
    const score = ((text.length / 5) / sec) * 60
    console.log(text.length)
    console.log(text.length / 5)
    console.log(sec)
    console.log("Score: " + score)
    if (score > 50) {
      dispatch(createScore({ score: "Sonic", userId: user.result.name }))
    } else if (score < 25) {
      dispatch(createScore({ score: "Michi" }))
    } else {
      dispatch(createScore({ score: "Guepardo" }))
    }

    console.log("Subido: " + score)
  }

  const countCorrectSymbols = (userInput) => {
    const text = state.text.replace(' ', '');
    return userInput.replace(' ', '').split('').filter((s, i) => s === text[i]).length;
  }

  return (
    <div>


      <div className="dir">
        <Button component={Link} to="/" variant="outlined"><ArrowBackIosIcon className="backHome" /></Button>
        <h1 className="title">Compite</h1>
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
      <h1>Usuarios</h1>
      {scores.length}
      {
        !scores.length ?
          <div className="vacio">
            <CircularProgress />
            <p>Vacío...</p>
          </div>
          :
          (
            <div className="rss-paper-container">
              {scores.map(item => {
                if (item.score === "Sonic") {
                  return (
                    <Paper className="rss-paper">
                      <div className="left">
                        <Button onClick={() => dispatch(deleteScore(item._id))}>X</Button>
                        <p className="rss-paper-p">{item.userId}</p>
                        <img src={sonic} style={{ width: 40 }} />
                      </div>
                      <TextField value={item.score} className="right" />
                    </Paper>)
                } else if (item.score === "Guepardo") {
                  return (
                    <Paper className="rss-paper">
                      <div className="left">
                        <Button onClick={() => dispatch(deleteScore(item._id))}>X</Button>
                        <p className="rss-paper-p">{item.userId}</p>
                        <Avatar src={guepardo} />
                      </div>
                      <TextField value={item.score} className="right" />
                    </Paper>)
                } else {
                  return (
                    <Paper className="rss-paper">
                      <div className="left">
                        <Button onClick={() => dispatch(deleteScore(item._id))}>X</Button>
                        <p className="rss-paper-p">{item.userId}</p>
                        <img src={michi} style={{ width: 40 }} />
                      </div>
                      <TextField value={item.score} className="right" />
                    </Paper>)
                }
              })}
            </div>
          )
      }
    </div>
  );
}

export default Compete;
