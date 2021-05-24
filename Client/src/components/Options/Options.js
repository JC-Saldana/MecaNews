
import React, { useState, useEffect } from 'react'
import Getxt from './Getxt';
import { Link, useHistory, useLocation } from "react-router-dom"
import { Button, Paper, Grid } from "@material-ui/core"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"
import './styles.css'
import Typing from 'react-typing-animation';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/")
        setUser(null)
    }

    // Log out en 1h

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem("profile")))

    }, [location])

    return (
        <div className="main">
            <Typing className="title">
                <Typing.Delay ms={1000} />
                <Typing.Speed ms={200} />
                <h1>...Learn</h1>
                <Typing.Speed ms={15} />
                <Typing.Delay ms={500} />
                <Typing.Backspace count={8} />
                <h1>Chill with news</h1>
                <Typing.Speed ms={8} />
                <Typing.Delay ms={500} />
                <Typing.Backspace count={15} />
                <h1>Compete</h1>
            </Typing>
            <main>
                <Paper className="paper">
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="center">
                            <Button component={Link} to="/learn" variant="outlined" color="default" >Aprende</Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button component={Link} to="/practice" variant="outlined" color="default">Practica</Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button component={Link} to="/compete" variant="outlined" color="default" disabled={!user?.result}>Compite</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        
            <footer>
                <Getxt />
                <Button component={Link} to="/practice" variant="outlined" color="default">Sigue leyendo</Button>
            </footer>

        </div>


    )
}

export default Navbar
