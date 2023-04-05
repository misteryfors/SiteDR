const SET_CHATS = "SET_CHATS"
const ADD_CHAT = "ADD_CHAT"
const ADD_MESSAGE = "ADD_MESSAGE"
const ADD_MESSAGES = "ADD_MESSAGES"
const SET_MESSAGES = "SET_MESSAGES"
const defaultState = {
    chats: null,
    messages:[]
}

export default function chatsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CHATS: return {...state, chats: action.payload}
        case SET_MESSAGES: return {...state, messages: action.payload}
        case ADD_CHAT: return {...state, chats: [...state.chats, action.payload]}
        case ADD_MESSAGE: return {...state, messages: [...state.messages, action.payload]}
        case ADD_MESSAGES: return {...state, chats: state.chats[action.payload.id].add(action.payload.message)}
        default:
            return state
    }
}

export const setChats = chats => ({type: SET_CHATS, payload: chats})
export const addChat = chat => ({type: ADD_CHAT, payload: chat})
export const addMessage = message => ({type: ADD_MESSAGE, payload: message})
export const addMessages = messages => ({type: ADD_MESSAGES, payload: messages})
export const setMessages = messages => ({type: SET_MESSAGES, payload: messages})
