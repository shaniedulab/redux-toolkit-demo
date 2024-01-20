const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const iceCreamActions = require('./features/iceCream/iceCreamSlice').iceCreamActions;
const fetchUsers = require('./features/users/userSlice').fetchUsers;
console.log('initializing', store.getState());



const unsubscribe = store.subscribe(()=>{
    console.log('updated', store.getState());
})

store.dispatch(fetchUsers())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(3))

// unsubscribe();