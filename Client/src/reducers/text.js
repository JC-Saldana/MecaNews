
import { TEXT } from "../constants/actionTypes"

const textReducer = (state = { textData: null }, action) => {
    switch (action.type) {
        case TEXT:
            console.log(data)
            return {...state, authData: action?.data}
        default:
            return state
    }
}

export default textReducer