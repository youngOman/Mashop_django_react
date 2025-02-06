// cdnjs.com 找 font-awesome
import { React, useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";
import SearchBar from "./SearchBar";
import { getUserDetails } from "../actions/userActions";

const Header = () => {
	const dispatch = useDispatch();

	const [avatarPic, setAvatarPic] = useState("");

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const {  user } = userDetails;

	// 🚀 當 userInfo 變化時，自動更新 user 資料
	useEffect(() => {
		if (userInfo) {
			dispatch(getUserDetails("profile"));
		}
	}, [dispatch, userInfo]);

	// 🚀 當 userDetails 更新時，獲取 avatar
	useEffect(() => {
		if (user) {
			setAvatarPic(user.avatar); // ✅ 確保讀取的是 `userprofile.avatar`
		}
	}, [user]);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Navbar bg='light' expand='lg'>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>niceshop</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						{userInfo ? (
							<div className="d-flex align-items-center">
								<Image src={ avatarPic || "/media/avatars/default_avatar.png"} roundedCircle style={{ width: "40px", height: "40px"}} />
								<NavDropdown title={userInfo.first_name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>個人資料</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>登出</NavDropdown.Item>
								</NavDropdown>
							</div>
						) : (
							<LinkContainer to='/login'>
								<Nav.Link>
									{" "}
									<i className='fa-solid fa-right-to-bracket'></i>登入
								</Nav.Link>
							</LinkContainer>
						)}

						{/* 第一個選單 */}
						{/* <NavDropdown title='關於我們' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>

							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
						</NavDropdown> */}

						{/* 第二個 後台管理專用 選單 */}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title='後台管理專用' id='admin-menu'>
								<LinkContainer to='/admin/userlist'>
									<NavDropdown.Item>用戶管理</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/productlist'>
									<NavDropdown.Item>產品管理</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>訂單管理</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Item>Another action</NavDropdown.Item>

								<NavDropdown.Item>Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>Separated link</NavDropdown.Item>
							</NavDropdown>
						)}
						<LinkContainer to='/cart'>
							<Nav.Link>
								<i className='fa-solid fa-cart-shopping'></i> 購物車
							</Nav.Link>
						</LinkContainer>
					</Nav>

					<div className='ms-auto'>
						<SearchBar />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
