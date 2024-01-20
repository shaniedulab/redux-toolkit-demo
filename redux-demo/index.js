const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const applyMiddleware =  redux.applyMiddleware;

console.log('from index.js');
const CAKE_ORDERED='CAKE_ORDERED';
const CAKE_RESTOCKED='CAKE_RESTOCKED';
const ICECREAM_ORDERED='ICECREAM_ORDERED';
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED';

function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function reStockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function reStockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// (pevState, action) => newState
const initialCakeState = {
    noOfCakes: 10,
}

const initialIceCreamState = {
    noOfIceCream: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                noOfCakes: state.noOfCakes - action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                noOfCakes: state.noOfCakes + action.payload
            }
        default: 
            return state; 
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
            case ICECREAM_ORDERED:
                return {
                    ...state,
                    noOfIceCream: state.noOfIceCream - action.payload
                }
            case ICECREAM_RESTOCKED:
                return {
                    ...state,
                    noOfIceCream: state.noOfIceCream + action.payload
                }
        default: 
            return state; 
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))

console.log(store.getState());

const unsubscribe = store.subscribe(()=>{
    // console.log('update state',store.getState())
})

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(reStockCake(5));
const actions = bindActionCreators({orderCake, reStockCake , orderIceCream , reStockIceCream}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.reStockCake(5)

actions.orderIceCream();
actions.orderIceCream();

actions.reStockIceCream(7)
unsubscribe();