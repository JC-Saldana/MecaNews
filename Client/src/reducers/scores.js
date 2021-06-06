
// Redux

/***** Recibimos acción. Vamos a Post para hacer dispatch a esta acción *****/

import {FETCH_ALL, CREATE, UPDATE, DELETE} from "../constants/actionTypes"

export default (scores = [], action) => {
    switch (action.type) {
        case DELETE:
            return scores.filter((score) => score._id !== action.payload)
        case UPDATE:
            return scores.map((score) => score._id === action.payload._id ? action.payload : score)
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return action.payload
            
        default:
            return scores
    } 
}