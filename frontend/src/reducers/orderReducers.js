// 負責更新應用程式的狀態，根據 action 決定如何改變 state。
import { act } from "react";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_RESET,
	ORDER_LIST_ALL_REQUEST,
	ORDER_LIST_ALL_SUCCESS,
	ORDER_LIST_ALL_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_CREATE_RESET:
			return {}; // 這邊直接回傳空物件，因為我們不像 cartReducers.js 那樣需要保留購物車的其他資訊
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };

		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };

		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true };

		case ORDER_PAY_FAIL:
			return { loading: false, error: action.payload };

		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

// 用戶歷史訂單
export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { loading: true };

		case ORDER_LIST_MY_SUCCESS:
			return { loading: false, orders: action.payload };

		case ORDER_LIST_MY_FAIL:
			return { loading: false, error: action.payload };

		case ORDER_LIST_MY_RESET:
			return { orders: [] };

		default:
			return state;
	}
};

// 管理員檢視所有訂單
export const orderListAllReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_ALL_REQUEST:
			return { loading: true };

		case ORDER_LIST_ALL_SUCCESS:
			return { loading: false, orders: action.payload };

		case ORDER_LIST_ALL_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

// 管理員更新訂單運送狀態為 已運送
export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return { loading: true };

		case ORDER_DELIVER_SUCCESS:
			return { loading: false, success: true };

		case ORDER_DELIVER_FAIL:
			return { loading: false, error: action.payload };

		case ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};
