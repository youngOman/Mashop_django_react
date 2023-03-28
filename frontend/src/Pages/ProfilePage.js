import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// Component
import Loading from "../components/Loading";
import Message from "../components/Message";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfilePage = () => {
  const [first_name, setFirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({text:"",variant:""});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile; // 從userUpdateProfile取出success，為了得知這個 action 是否成功

  useEffect(() => {
    if (!userInfo) {  
      // 如果沒有登入就跳轉到登入頁面
      navigate("/login");
    } else {
        if (!user || !user.first_name || success) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET }); // 若更新成功就重置 userUpdateProfile 的狀態
          dispatch(getUserDetails("profile"));
        } else {
          setFirst_name(user.first_name);
          setEmail(user.email);
        }
    }
  }, [dispatch, navigate, userInfo, user, success]);


  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({text:"密碼不一樣啦！！",variant:"danger"});
    } else {
      // console.log("更新中...");
      dispatch(
        updateUserProfile({
          id: user.id,
          first_name: first_name,
          email: email,
          password: password,
        })
      ); // 把 id,first_name,email,password 傳遞給 action的 user 參數
      setMessage({text:"更新成功！",variant:"success"});
    }
  };

  // useEffect(() => {
  //   console.log('nothing')
  //   if (user && Object.keys(user).length > 0) {
  //     // 確認 user 已經取得
  //     console.log(user); // 這裡應該會顯示 user 物件
  //   }
  // }, [user]);

  return (
    <Row>
      <Col md={3}>
        <h2>我的檔案</h2>
      </Col>

      {message && <Message variant={message.variant}>{message.text}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loading />} {/* loading 是 action 的狀態 <Loadind /> 是寫好的 Component */}

      <Form onSubmit={submitHandler}>
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

        <Form.Group controlId="email">
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

        <Form.Group controlId="password">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入確認密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 mb-3">
          更新資料
        </Button>
      </Form>

      <Col md={2}>
        <h2>我的訂單</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
