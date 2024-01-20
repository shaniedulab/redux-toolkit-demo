const redux = require('redux');
const thunk = require('redux-thunk');
const axios = require('axios');

const createStore = redux.createStore
const applyMiddleware =  redux.applyMiddleware;

const initialState = {
    loading: false,
    user:[],
    error:''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCESSED = 'FETCH_USERS_SUCCESSED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESSED,
        payload: users
    }
}

const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESSED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then((resp)=>{
            const users = resp.data.map((user) => user.id)
            console.log('users',users);
            dispatch(fetchUsersSuccess(users));
        }).catch((err)=>{
            dispatch(fetchUsersFailed(err.message));
        })
    }
}

const store = createStore(reducer , applyMiddleware(thunk))

store.subscribe(() => {
    console.log('===>',store.getState());
})

store.dispatch(fetchUsers());