import axios from "axios";
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
	// PRODUCT_CREATE_RESET, // 在 ProductListPage 使用
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	// PRODUCT_CREATE_REVIEW_RESET, // 在 ProductPage 使用
	PRODUCT_TOP_RATED_REQUEST,
	PRODUCT_TOP_RATED_SUCCESS,
	PRODUCT_TOP_RATED_FAIL,
} from "../constants/productsConstants";

export const listProducts =
	(keyword = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LIST_REQUEST });
			const { data } = await axios.get(`/api/products/${keyword}`);
			dispatch({
				type: PRODUCT_LIST_SUCCESS,
				payload: data, // reducers的action.payload
			}); // 成功的話
		} catch (error) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			}); // 檢查若 error.response && error.response.data.message 存在就回傳 error.response.data.message 否則就用預設的error.message
		}
	};

export const listProductDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAIL_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);
		// if (!data) { // 若要查看此偵錯結果的話要在 catch 這邊 console.log 查看
		// 	throw new Error("找不到此產品？");
		// }
		dispatch({
			type: PRODUCT_DETAIL_SUCCESS,
			payload: data, // reducers的action.payload
		}); // 成功的話
	} catch (error) {
		// console.log("Error in listProductDetail:", error.message);
		dispatch({
			type: PRODUCT_DETAIL_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		}); // 檢查若 error.response && error.response.data.message 存在就回傳 error.response.data.message 否則就用預設的error.message
	}
};

// 刪除產品
export const deleteProduct = (id) => async (dispatch, getState) => {
	// action 的函式命名一般都是 動詞在前+名詞
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/api/products/delete/${id}`, config);

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// console.log(config);
		const { data } = await axios.post(
			`/api/products/create/`,
			{}, // 預設空物件
			config
		);

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/products/update/${product.id}`, product, config);

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({
			// 更新成功後，自動載入更新後的產品資料
			type: PRODUCT_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		});
	}
};

// 用戶新增產品評論
export const createProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/products/${productId}/reviews/`, review, config); // 送出評論

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		});
	}
};

// 取得評分高的產品
export const listTopRatedProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_RATED_REQUEST });
		const { data } = await axios.get(`/api/products/top-rated/`);
		dispatch({
			type: PRODUCT_TOP_RATED_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_RATED_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
