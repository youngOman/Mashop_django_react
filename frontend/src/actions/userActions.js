import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants.js";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" }, // 這是為了讓後端知道我們要傳的資料是 json 格式，沒有這行的話後端會認為是 form-data
    };
    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    ); // 記得要有 / 在最後面

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    }); // 成功的話

    localStorage.setItem("userInfo", JSON.stringify(data)); // 將登入資訊存到 localStorage
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // 檢查若 error.response && error.response.data.message 存在就回傳 error.response.data.message 否則就用預設的error.message
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET }) // 登出後要清空 user Object，否則會造成登出後還是會顯示上一個使用者的資料
};

export const register = (first_name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" }, // 這是為了讓後端知道我們要傳的資料是 json 格式，沒有這行的話後端會認為是 form-data
    };
    const { data } = await axios.post(
      "/api/users/register/",
      { first_name: first_name, email: email, password: password },
      config
    ); // 記得要有 / 在最後面

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data, // payload 是要傳給 reducer 的資料
    });
    // 註冊成功後就自動登入
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data)); // 將登入資訊存到 localStorage
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  // getState 大多都是在需要訪問 store 的裡的數據以做一些操作時使用
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState(); // 確保 User 是登入的狀態

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // 需要有 token 才能取得資料，因為後端有設 permission_classes
      },
    };
    const { data } = await axios.get(
      `/api/users/${id}/`,
      config
    ); // 這邊沒用 profile/ 是因為後端的路徑是 /api/users/<int:pk>/，所以要用 id

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data, 
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// 更新使用者資料
export const updateUserProfile = (user) => async (dispatch, getState) => {
  // getState 大多都是在需要訪問 store 的裡的數據以做一些操作時使用
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState(); // 確保 User 是登入的狀態

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // 需要有 token 才能取得資料，因為後端有設 permission_classes
      },
    };
    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user, // 這邊的 user 是從 ProfilePage.js 傳過來的
      config,
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data, // payload 是後端回傳的資料
    });
    // 當更新成功後，要讓使用者也用新的資料登入，所以要更新 localStorage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    
    // // 取得更新後的 token
    // const updatedToken = data.token;

    // // 更新使用者登入資訊，包括使用者資料和 token
    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: {
    //     ...data,
    //     token: updatedToken,
    //   },
    // });

    localStorage.setItem("userInfo", JSON.stringify(data)); // 將登入資訊存到 localStorage
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
