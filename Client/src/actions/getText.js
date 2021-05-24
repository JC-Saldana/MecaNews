import { AUTH } from "../constants/actionTypes"
import * as api from "../api/index.js"

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        history.push("/")
    } catch (error) {
        console.log(error)
    }
}

export const getText = async (req, res) => {
    try {
        const apiUrl = 'http://feeds.weblogssl.com/xataka2';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data));
        dispatch({ type: AUTH, data })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}