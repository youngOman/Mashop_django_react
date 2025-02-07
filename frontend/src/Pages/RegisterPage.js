import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

const RegisterPage = () => {
  const [first_name, setFirst_name] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/"; // 如果redirect有值就把redirect的值給redirect 沒有就給'/'

  const userRegister = useSelector((state) => state.userRegister); // 從store取出userLogin
  const { error, loading, userInfo } = userRegister; // 從userLogin取出error,Loader,userInfo

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("確認密碼不一致");
    } else {
      dispatch(register(first_name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      // 如果已是登入狀態就跳轉到 redirect，也就是當前頁面
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]); // 當userInfo,redirect,navigate有變動就觸發 useEffect

  return (
    <FormContainer>
      <h1>註冊</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {/* loading 是 action 的狀態 <Loadind /> 是寫好的 Component */}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className="my-2">
        <Form.Group controlId="first_name">
          <Form.Label>ID</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="請輸入您的ID"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-2">
          <Form.Label>電子郵件</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="請輸入電子郵件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-2">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm" className="my-2">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="請輸入確認密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          註冊
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          已經有帳號了嗎?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            登入
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
