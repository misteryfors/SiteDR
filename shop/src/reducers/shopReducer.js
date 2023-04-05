const SET_PRODUCTS = "SET_PRODUCTS"
const ADD_PRODUCTS = "ADD_PRODUCTS"
const DEL_PRODUCTS = "DEL_PRODUCTS"
const SET_PAGE = "SET_PAGE"
const SET_PAGE_COUNT = "SET_PAGE_COUNT"

const defaultState = {
    products: [],
    page:1,
    pageCount:0
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PRODUCTS: return {...state, products: action.payload}
        case ADD_PRODUCTS: return {...state, products: [...state.products, action.payload]}
        case DEL_PRODUCTS: return {...state, products: state.products.filter(product => product._id != action.payload) }
        case SET_PAGE: return {...state, page: action.payload}
        case SET_PAGE_COUNT: return {...state, pageCount: action.payload}
        default:
            return state
    }
}

export const setPage = (page) => ({type: SET_PAGE, payload: page})
export const setPageCount = (pageCount) => ({type: SET_PAGE_COUNT, payload: pageCount})
export const setProducts = (products) => ({type: SET_PRODUCTS, payload: products})
export const addProducts = (product) => ({type: ADD_PRODUCTS, payload: product})
export const delProducts = (productsId) => ({type: DEL_PRODUCTS, payload: productsId})