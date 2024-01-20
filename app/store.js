const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice')
const iceCreamReducer = require('../features/iceCream/iceCreamSlice')
const reduxLoader = require('redux-logger');
const userReducer = require('../features/users/userSlice');


const logger = reduxLoader.createLogger();

const store = configureStore({
    reducer: {
        cake:cakeReducer,
        iceCream:iceCreamReducer,
        user:userReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

module.exports = store;