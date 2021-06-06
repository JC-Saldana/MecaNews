import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import { GoogleLogin } from "react-google-login"
import { useDispatch } from "react-redux"
import { useHistory, userHistory } from "react-router-dom"

import Icon from "./icon"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from "./styles"
import Input from "./Input"
import {signin, signup } from "../../actions/auth"

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    // Toggle show password
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        // Spreads properties pero solo cambia la del target value
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        // ?. es para no tener error si no tenemos res
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: "AUTH", data: { result, token } })
            history.push("/") // Es de react.router.dom y permite volver
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Crear cuenta" : "Iniciar sesión"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="Nombre" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Apellidos" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repite contraseña" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignup ? "Crear cuenta" : "Iniciar sesión"}
                    </Button>
                    <GoogleLogin
                        clientId="437519144342-cararuu15u7thq0gj6klojh9q2ej7hll.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Ya tienes cuenta? Úsala aquí!" : "No tienes cuenta? Crea una!"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
