// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// reducers
import {
  ProductListReducer,
  ProductDetailReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

// const reducer = combineReducers()

const cartItemsFromStorage = localStorage.getItem("購物車裡的東東")
  ? JSON.parse(localStorage.getItem("購物車裡的東東"))
  : []; // 要跟 ActionCreator裡的 localStorage.setItem('X',JSON.stringify(cartItems)) 一樣

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// 進入頁面時的初始State
export const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
// 處理異步 action creator
const middleware = [thunk]; // 不需要applyMiddleware了

const store = configureStore({
  reducer: {
    // 儲存多個state的地方，到時會再各個component用useSelector指定要使用哪一個
    ProductList: ProductListReducer,
    ProductDetail: ProductDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
  },
  preloadedState: initialState,
  middleware: middleware,
});

// createStore(reducer, [preloadedState], [enhancer]); // 舊寫法 deprecated
// configureStore({reducer, preloadedState, middleware, enhancers}) // 新寫法

export default store;
