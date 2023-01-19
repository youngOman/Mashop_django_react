import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../constants/productsConstants';

export const listProducts = () => async(dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/products/");
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload : data, // reducers的action.payload
        }) // 成功的話
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message}) // 檢查若 error.response && error.response.data.message 存在就回傳 error.response.data.message 否則就用預設的error.message
    }
    
}

export const listProductDetail = (id) => async(dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload : data, // reducers的action.payload
        }) // 成功的話
    } catch (error) {
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message}) // 檢查若 error.response && error.response.data.message 存在就回傳 error.response.data.message 否則就用預設的error.message
    }
    
}