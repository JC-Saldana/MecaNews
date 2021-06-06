import {combineReducers} from "redux"

import posts from "./posts"
import scores from "./scores"
import auth from "./auth"

export default combineReducers({posts, scores, auth})