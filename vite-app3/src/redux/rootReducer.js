import {combineReducers} from '@reduxjs/toolkit'
import Reducer from './Reducer'
import LoginReducer from './LoginReducer'
const rootReducer=combineReducers({

    data:Reducer,
    auth:LoginReducer,

})

export default rootReducer