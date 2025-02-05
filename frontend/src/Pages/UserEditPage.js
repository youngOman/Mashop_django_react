import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { getUserDetails, updateUser } from "../actions/userActions"; // 自動載入用戶資料
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditPage = () => {
	const navigate = useNavigate();
	const { userID } = useParams(); // 要跟 App.js 裡定義的 :userID路由名稱一樣
	// console.log("useParams:", useParams());
	// console.log("userID:", userID);
	const [first_name, setFirst_name] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false); // 可以管理用戶權限，設定為管理員

	const dispatch = useDispatch(); // 用來發送 action 的 hook

	const userDetails = useSelector((state) => state.userDetails); // 列出用戶資料
	// console.log("Redux state userDetails:", userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate); // 更新用戶資料
	const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ id: userID, first_name, email, isAdmin }));
	};

	useEffect(() => {
		if (successUpdate) { // 如果更新成功，就重置用戶更新狀態
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else { // 否則就先檢查用戶是否存在，並列出用戶資料
			if (!user.first_name || user.id !== Number(userID)) {
				dispatch(getUserDetails(userID)); // 如果用戶不存在或者用戶id不等於當前用戶id，就發送請求
			} else {
				// 如果用戶存在，就自動載入用戶資料
				setFirst_name(user.first_name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, user, userID, successUpdate, navigate]);

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				回到用戶列表
			</Link>

			<h1>編輯用戶資料</h1>
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<FormContainer>
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='first_name' className='mb-3'>
							<Form.Label>用戶姓名</Form.Label>
							<Form.Control required type='name' placeholder='請輸入您的ID' value={first_name} onChange={(e) => setFirst_name(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='email' className='mb-3'>
							<Form.Label>電子郵件</Form.Label>
							<Form.Control required type='email' placeholder='請輸入電子郵件' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='username'></Form.Control>
						</Form.Group>

						<Form.Group controlId='isAdmin'>
							<Form.Check type='checkbox' label='是否為管理員' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
						</Form.Group>

						<p>{isAdmin ? "setAdmin測試(此用戶是管理員)" : "setAdmin測試(此用戶不是管理員！)"}</p>

						<Button type='submit' variant='primary' className='mt-3'>
							更新
						</Button>
					</Form>
				</FormContainer>
			)}
		</>
	);
};

export default UserEditPage;
