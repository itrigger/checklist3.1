import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import checksReducer from './reducers/checks'


let reducers = combineReducers(
    {
        checksReducer
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;