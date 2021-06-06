import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes"
import * as api from "../api/index.js"

/***** Creamos acciones especificadas en API. La enviamos a reducers *****/

// Action creators

export const getScores = () => async (dispatch) => {
    try {
        const { data } = await api.fetchScores();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const createScore = (score) => async (dispatch) => {
    try {
        const { data } = await api.createScore(score)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deleteScore = (id) => async (dispatch) => {
    try {
        await api.deleteScore(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}
