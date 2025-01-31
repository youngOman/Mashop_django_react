// 根據傳入的 state & action 來處理新的 state。
// Reducer = javascript的 function，function(currentState,action)，
// 第一個參數為 current state，也就是目前 state 的資料，另一個則是 action，如果我們想要更改 store 內的 state 資料，則要透過 action 的幫忙
// 一開始的 state 預設為空 array

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_DETAIL_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_RATED_REQUEST,
	PRODUCT_TOP_RATED_SUCCESS,
	PRODUCT_TOP_RATED_FAIL,
} from "../constants/productsConstants";

// 沒有分頁功能的 reducer
// export const productListReducer = (state = { products: [] }, action) => {
// 	// 列出所有產品
// 	switch (action.type) {
// 		case PRODUCT_LIST_REQUEST: // 請求中
// 			return { loading: true, products: [] };
// 		case PRODUCT_LIST_SUCCESS: // 成功
// 			return { loading: false, products: action.payload }; // 請求到資料，loading 結束
// 		case PRODUCT_LIST_FAIL: // 錯誤
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };

// 含有分頁功能
export const productListReducer = (state = { products: [] }, action) => {
	// 列出所有產品
	switch (action.type) {
		case PRODUCT_LIST_REQUEST: // 請求中
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS: // 成功
			return { loading: false, products: action.payload.products, page: action.payload.page, pages: action.payload.pages }; // 請求到資料，loading 結束
		case PRODUCT_LIST_FAIL: // 錯誤
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDetailReducer = (state = { product: { reviews: [] } }, action) => {
	switch (action.type) {
		case PRODUCT_DETAIL_REQUEST: // 請求中
			return { loading: true, ...state };
		case PRODUCT_DETAIL_SUCCESS: // 成功
			return { loading: false, product: action.payload }; // 請求到資料了=loading結束
		case PRODUCT_DETAIL_FAIL: // 錯誤
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDeleteReducer = (state = {}, action) => {
	// 刪除產品
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true }; // 刪除不需要回傳資料
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productCreateReducer = (state = {}, action) => {
	// 新增產品
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = { product: [] }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case PRODUCT_UPDATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_UPDATE_RESET:
			return { product: [] }; // 重置 product 狀態，清空舊資料，避免影響下一次操作或導致錯誤的資料顯示
		default:
			return state;
	}
};

export const productCreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

// 取得評分高的產品
export const productTopRatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_TOP_RATED_REQUEST:
			return { loading: true };
		case PRODUCT_TOP_RATED_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_TOP_RATED_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
