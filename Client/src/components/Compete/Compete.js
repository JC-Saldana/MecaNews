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
    }
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
    dispatch(getScores())
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
    console.log(userInput)
    console.log(text)
    console.log(userInput === text)
    if (userInput === text) {
      console.log("Finished")
      clearInterval(state.interval)
      uploadTime()
      setIndex(index + 1)
      onRestart()
    }
    dispatch(getScores())
  }

  const uploadTime = () => {
    const score = [((text.length / 5) / sec) * 60]
    const myTimes = []
    let media = 0
    let mediaCinco = 0
    let primeraVez = false

    console.log(myScores)

    if (!myScores.length) { primeraVez = true }

    if (!primeraVez) {
      myScores[0].scores.map(item => {
        myTimes.push(item)
      })
    }
    console.log("Primera entrada")

    myTimes.push(Math.round(score))

    let sumArray = null

    myTimes.map(item => {
      sumArray += Number(item)
    })

    media = Math.round(sumArray / myTimes.length)

    const lastFive = myTimes.slice(Math.max(myTimes.length - 5, 0))
    lastFive.map(item => {
      mediaCinco += Number(item)
    })
    console.log("-----------" + mediaCinco)
    mediaCinco = Math.round(mediaCinco / Math.round(lastFive.length))

    console.log("-----------" + mediaCinco)
    if (!primeraVez) { dispatch(deleteScore(myScores[0]._id)) }


    console.log("myTimes: ", myTimes, "score: " + score, "Media: " + media)


    if (mediaCinco > 50) {
      dispatch(createScore({ userId: userId, userName: user.result.name, category: "Sonic", scores: myTimes, media: media, mediaCinco: mediaCinco }))
    } else if (mediaCinco < 25) {
      dispatch(createScore({ userId: userId, userName: user.result.name, category: "Michi", scores: myTimes, media: media, mediaCinco: mediaCinco }))
    } else {
      dispatch(createScore({ userId: userId, userName: user.result.name, category: "Guepardo", scores: myTimes, media: media, mediaCinco: mediaCinco }))
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
        <h1 className="title">Compite</h1>
      </div>

      <Paper className="paper" elevation={3}>
        <h1>{sec}</h1>
        <Main setText={setText} onRestart={onRestart} index={index} setIndex={setIndex} />
        <Preview text={text} userInput={state.userInput} />
        <TextField className="field" label="Escribe aquí" variant="outlined"
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
      <div className="scores">
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
                  if (item.category === "Sonic") {
                    return (
                      <Paper className="compete-paper">
                        <div className="left">
                          <img src={sonic} style={{ width: 60 }} />
                        </div>
                        <div className="right">
                          <div className="arriba">
                            <p className="rss-paper-c">{item.userName}</p>
                            <TextField value={item.scores} className="right" />
                          </div>
                          <div className="abajo">
                            <p className="rss-paper-c">PPM Medio histórico: {item.media}</p>
                            <p className="rss-paper-c">Media 5: {item.mediaCinco}</p>
                          </div>
                        </div>
                      </Paper>)
                  } else if (item.category === "Guepardo") {
                    return (
                      <Paper className="compete-paper">
                        <div className="left">
                          <img src={guepardo} style={{ width: 60 }} />
                        </div>
                        <div className="right">
                          <div className="arriba">
                            <p className="rss-paper-c">{item.userName}</p>
                            <TextField value={item.scores} className="right" />
                          </div>
                          <div className="abajo">
                            <p className="rss-paper-c">PPM Medio histórico: {item.media}</p>
                            <p className="rss-paper-c">Media 5: {item.mediaCinco}</p>
                          </div>
                        </div>
                      </Paper>)
                  } else {
                    return (
                      <Paper className="compete-paper">
                        <div className="left">
                          <img src={michi} style={{ width: 60 }} />
                        </div>
                        <div className="right">
                          <div className="arriba">
                            <p className="rss-paper-c">{item.userName}</p>
                            <TextField value={item.scores} className="right" />
                          </div>
                          <div className="abajo">
                            <p className="rss-paper-c">PPM Medio histórico: {item.media}</p>
                            <p className="rss-paper-c">Media 5: {item.mediaCinco}</p>
                          </div>
                        </div>
                      </Paper>)
                  }
                })}
              </div>
            )
        }
      </div>

    </div>
  );
}

export default Compete;
