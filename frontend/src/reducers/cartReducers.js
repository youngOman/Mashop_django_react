import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM 
} from "../constants/cartsConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM: 
            // 不增加一個新個商品，只要改變 product 的 qty 
            const item = action.payload;
            // 檢查 action.payload 回傳的資料是否存在於 cartItems 
            // 這邊的 x及 item 後面都是用product_id來比對
            const existItem = state.cartItems.find(x => x.product_id === item.product_id)  // 檢查這個產品是否存在，若有回傳object
            if(existItem){
                return {
                    ...state,
                    // 若此pruduct經檢查後存在，就用新的item取代
                    cartItems:state.cartItems.map( x=>x.product_id===existItem.product_id ? item : x) 
                }
            }else{
                return {
                    // 若產品不存在回傳original state
                    ...state,
                    // 如果這個product不是我們要update qty的那個就回傳original data，並將item加入cartItems
                    cartItems:[...state.cartItems,item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                // 將 id 不等於 action.payload 的產品保留，如果真找到跟 action.payload 一樣的 id，就把它移除，並回傳新的陣列
                // 總之，這行會回傳一個商品已經被刪除的陣列，所以就可以來 UPDATE state.cartItems
                cartItems:state.cartItems.filter(x=> x.product_id !== action.payload)
            }
        default:
            return state;
    }
};
