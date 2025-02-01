import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./bootstrap.min.css";
import App from './App';
// import reportWebVitals from './reportWebVitals';
// redux
import { Provider } from 'react-redux';
import store, { initialState } from "./store";

// bootstrap 載在index.js 拷貝cdn放在/public/index.html

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} initialState={initialState} >
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
