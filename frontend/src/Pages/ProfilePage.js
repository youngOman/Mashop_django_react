import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

const ProfilePage = () => {
	const [first_name, setFirst_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState({ text: "", variant: "" });

	const [avatarPic, setAvatarPic] = useState("");
	const [preview, setPreview] = useState("");
	const [profilePicUploading, setProfilePicUploading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	// console.log(user);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log("userInfo:", userInfo);

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile; // 從userUpdateProfile取出success，為了得知這個 action 是否成功

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	// console.log(orders);

	useEffect(() => {
		if (!userInfo) {
			// 如果沒有登入就跳轉到登入頁面
			navigate("/login");
		} else {
			if (!user || !user.first_name || success || userInfo.id !== user.id) { // 若目前用戶的 id(userInfo.id) 與取得指定用戶的 id(user.id) 不同，就重新發送獲取用戶資料的請求
				dispatch({ type: USER_UPDATE_PROFILE_RESET }); // 若更新成功就重置 userUpdateProfile 的狀態
				dispatch(getUserDetails("profile"));
				dispatch(listMyOrders());
			} else { // 否則設置用戶資料
				setFirst_name(user.first_name);
				setEmail(user.email);
				setAvatarPic(user.avatar);
			}
		}
	}, [dispatch, navigate, userInfo, user, success]);
	// console.log("目前用戶資料", user);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage({ text: "密碼不一樣啦！！", variant: "danger" });
		} else {
			dispatch(
				updateUserProfile({
					id: user.id,
					first_name: first_name,
					email: email,
					password: password,
				})
			); // 把 id,first_name,email,password 傳遞給 action的 user 參數
			setMessage({ text: "更新成功！", variant: "success" });
		}
	};

	// 選擇新圖片時觸發
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarPic(file);
			setPreview(URL.createObjectURL(file)); // 預覽圖片
		}
	};
	// 上傳新頭像
	const updateAvatar = async (file) => {
		if (!avatarPic) {
			alert("請選擇圖片");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", avatarPic);

		try {
			setProfilePicUploading(true);
			const { data } = await axios.post("/api/users/profile/avatar/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`, // 確保用戶已登入
				},
			});
			console.log("頭像更新成功", data);
			setAvatarPic(""); // 清空已選圖片
			dispatch(getUserDetails("profile")); // 馬上重新獲取用戶資料，更新頭像
		} catch (error) {
			console.error("更新失敗", error.response?.data || error.message);
		} finally {
			setProfilePicUploading(false);
		}
	};

	console.log("Preview：",preview);
	console.log("AvatarPic：",avatarPic);

	return (
		<Row>
			<Col md={3}>
				<h2 className="mb-3">我的檔案</h2>
				{message?.text && <Message variant={message.variant}>{message.text}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />} {/* loading 是 action 的狀態、<Loader /> 是寫好的 Component */}
				<Form onSubmit={submitHandler}>
					{/* 頭像上傳區 */}

					<Form.Group controlId='profilePic' className='m-3'>
						<Form.Label>個人照片</Form.Label>
						<div className='d-col align-items-center'>
							<Image src={preview || avatarPic || "/media/avatars/default_avatar.png"} roundedCircle className="mb-2" style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }} />
							<Form.Control type='file' accept='image/*' onChange={handleFileChange} disabled={profilePicUploading} />
						</div>
						<Button className='mt-2' onClick={updateAvatar} disabled={profilePicUploading}>
							{profilePicUploading ? "上傳中..." : "上傳頭像"}
						</Button>
						{profilePicUploading && <Loader />}
					</Form.Group>

					
					<Form.Group controlId='first_name' className='m-3'>
						<Form.Label>ID</Form.Label>
						<Form.Control required type='name' placeholder='請輸入您的ID' value={first_name} onChange={(e) => setFirst_name(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='email' className='m-3'>
						<Form.Label>電子郵件</Form.Label>
						<Form.Control required type='email' placeholder='請輸入電子郵件' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='username'></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='m-3'>
						<Form.Label>密碼</Form.Label>
						<Form.Control type='password' autoComplete='current-password' placeholder='請輸入密碼' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='passwordConfirm' className='m-3'>
						<Form.Label>確認密碼</Form.Label>
						<Form.Control type='password' placeholder='請輸入確認密碼' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='new-password'></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary' className='m-3'>
						更新資料
					</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2 style={{ marginBottom: "20px" }}>我的訂單</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped hover responsive className='table-sm table-light'>
						{/* 表格標頭 */}
						<thead className='table-dark'>
							<tr>
								<th>訂單ID</th>
								<th>日期</th>
								<th>總價</th>
								<th>付款狀態</th>
								<th>出貨狀態</th>
							</tr>
						</thead>
						{/* 表格內容 */}
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td>{order.id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>${Math.round(order.totalPrice)}</td>
									<td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: "red" }}></i>}</td>
									<td>
										<LinkContainer to={`/order/${order.id}`}>
											<Button className='btn-sm' variant='dark'>
												訂單詳情
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfilePage;
