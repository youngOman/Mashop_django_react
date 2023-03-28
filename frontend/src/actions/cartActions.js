// 在Views中點擊元件觸發action

import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartsConstants";

// action creator 是一個異步函數
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // getState能在store.js把狀態pull出來
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product_id: data.id,
      name: data.name,
      desc: data.description,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "購物車裡的東東",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => { // getState 大多都是在需要訪問 store 的裡的數據以做一些操作時使用
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "購物車裡的東東",
    JSON.stringify(getState().cart.cartItems)
  );
};
