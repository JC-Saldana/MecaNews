
import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import { AppBar, Button, Typography, Toolbar, Avatar, Paper } from "@material-ui/core"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"
import useStyles from "./styles"

const Navbar = () => {

    const classes = useStyles()
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
        <div className={classes.appBar} position="static" color="inherit">
            
            
            <Paper className={classes.toolbar}>
            <Button className={classes.home} component={Link} to="/" align="center"><HomeIcon></HomeIcon></Button>
                {/* What to show depending on user autentication*/}
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar sesión</Button>
                    </div>
                ) : (
                    <div className={classes.profile}>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Inicia sesión</Button>
                        <Typography variant="h6" align="center">para personalizar todo!</Typography>
                    </div>
                  
                )}
            </Paper>
        </div>
    )
}

export default Navbar
