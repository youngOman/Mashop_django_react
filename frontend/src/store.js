// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// reducers
import { productListReducer, productDetailReducer, productDeleteReducer,productCreateReducer,productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	// Admin 相關
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from "./reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListAllReducer, orderDeliverReducer } from "./reducers/orderReducers";
// const reducer = combineReducers()

const cartItemsFromStorage = localStorage.getItem("購物車裡的東東") ? JSON.parse(localStorage.getItem("購物車裡的東東")) : []; // 要跟 ActionCreator裡的 localStorage.setItem('X',JSON.stringify(cartItems)) 一樣

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : {};

// 進入頁面時的初始State
export const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};
// 處理異步 action creator
const middleware = [thunk]; // 不需要applyMiddleware了

const store = configureStore({
	reducer: {
		// 儲存多個state的地方，到時會再各個component用useSelector指定要使用哪一個
		// 產品相關
		productList: productListReducer,
		productDetail: productDetailReducer,
		productDelete: productDeleteReducer,
		productCreate: productCreateReducer,
		productUpdate: productUpdateReducer,
		// 購物車相關
		cart: cartReducer,
		// 用戶相關
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userDetails: userDetailsReducer,
		userUpdateProfile: userUpdateProfileReducer,
		userList: userListReducer,
		userDelete: userDeleteReducer,
		userUpdate: userUpdateReducer,
		// 訂單相關
		orderCreate: orderCreateReducer,
		orderDetails: orderDetailsReducer,
		orderPay: orderPayReducer,
		orderListMy: orderListMyReducer,
		orderListAll: orderListAllReducer,
		orderDeliver: orderDeliverReducer,
	},
	preloadedState: initialState,
	middleware: middleware,
});

// createStore(reducer, [preloadedState], [enhancer]); // 舊寫法 deprecated
// configureStore({reducer, preloadedState, middleware, enhancers}) // 新寫法

export default store;
