
const SET_ALL = "SET_ALL"
const SET_UID = "SET_UID"
const SET_LOAD ="SET_LOAD"


const defaultState = {
    UID: "",
    name:"",
    type:"",
    mark:"",
    price:"",
    imgs:[],
    shortDescription:"",
    fullDescription:"",
    load:false
}

export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_UID:return {...state, UID:action.payload}
        case SET_ALL:return {...state, UID:action.payload['_id'], name:action.payload['name'],type:action.payload['type'],mark:action.payload['mark'],price:action.payload['price'],imgs:action.payload['imgs'],shortDescription:action.payload['shortDescription'],fullDescription:action.payload['description']}
        case SET_LOAD:return {...state, load:action.payload}
        default:
            return state
    }
}

export const setAll = (prod) => ({type: SET_ALL, payload: prod})
export const setUID = (UID) => ({type: SET_UID, payload: UID})
export const setLOAD = (LOAD) => ({type: SET_LOAD, payload: LOAD})
