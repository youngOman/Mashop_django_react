// 接受State後決定要對State做什麼action(loaddatas) update store
// Reducer=javascript的function，function(currentState,action)，
// 第一個參數為current state，也就是目前state的資料，另一個則是action，如果我們想要更改store內的state資料，則要透過action的幫忙。

// 一開始的State預設為空array

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../constants/productsConstants';


export const ProductListReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: // 請求中
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS: // 成功
            return { loading: false, products: action.payload } // 請求到資料了=loading結束
        case PRODUCT_LIST_FAIL: // 錯誤
            return { loading: false, error: action.payload } 
        default:
            return state;
    }
}

export const ProductDetailReducer = (state = {product :{reviews:[]}},action) =>{
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST: // 請求中
            return { loading: true, ...state }
        case PRODUCT_DETAIL_SUCCESS: // 成功
            return { loading: false, product: action.payload } // 請求到資料了=loading結束
        case PRODUCT_DETAIL_FAIL: // 錯誤
            return { loading: false, error: action.payload } 
        default:
            return state;
    }
}