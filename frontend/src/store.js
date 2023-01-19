import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
// reducers
import { ProductListReducer,ProductDetailReducer } from './reducers/ProductReducers'

// createStore(reducer, [preloadedState], [enhancer]); 舊的寫法

const reducer = combineReducers({ // 儲存多個state的地方，到時會再各個component用useSelector指定要使用哪一個
  ProductList : ProductListReducer, 
  ProductDetail : ProductDetailReducer, 
})

export const initialState ={

};
// dispatch 中介軟體 action 
const middleware = [thunk]; // 不需要applyMiddleware了

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});


export default store