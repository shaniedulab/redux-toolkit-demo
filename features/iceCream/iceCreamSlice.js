const { cakeActions } = require('../cake/cakeSlice');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    noOfIceCream : 20
}

const iceCreamSlice = createSlice({
    name:'iceCream',
    initialState,
    reducers: {
        ordered: (state) => {
            state.noOfIceCream--
        },
        restocked: (state, action) => {
            state.noOfIceCream += action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(cakeActions.ordered, (state)=>{
            state.noOfIceCream--
        })
    }
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions