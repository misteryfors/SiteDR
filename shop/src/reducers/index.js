import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import chatsReducer from "./chatsReducer";


const rootReducer = combineReducers({
    user: userReducer,
    chats: chatsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))