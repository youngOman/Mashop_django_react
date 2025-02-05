import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/"; // 如果redirect有值就把redirect的值給redirect 沒有就給'/'

  const userLogin = useSelector((state) => state.userLogin); // 從store取出userLogin
  const { error, loading, userInfo } = userLogin; // 這邊的 loading 是從 userActions 的 login 裡面的 loading

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler");
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      // 如果已是登入狀態就跳轉到 redirect，也就是當前頁面
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]); // 當userInfo,redirect,navigate有變動就觸發 useEffect

  return (
    <FormContainer>
      <h1>登入</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* 錯誤訊息是來自 backend 的 user_view 的 MytokenObtainPairView 的 Default 訊息 */}
      {/* loading 是 action 的狀態 <Loadind /> 是寫好的 Component */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>電子郵件</Form.Label>
          <Form.Control
            type="email"
            placeholder="請輸入電子郵件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3 w-100">
          登入
        </Button>
      </Form>

      <Row className="py-3 text-center">
        <Col>
          新會員嗎 ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            註冊帳號
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
