import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
// React-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages import 有default的 export 不用加 { }
// import [Component名稱] from "./Pages/[檔案名稱]";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";

import OrderPage from "./Pages/OrderPage";
import OrderListPage from "./Pages/OrderListPage";

import UserListPage from "./Pages/UserListPage";
import UserEditPage from "./Pages/UserEditPage";

import NotFoundPage from "./Pages/NotFoundPage";
import AdminRoute from "./components/AdminRoute";

import ProductListPage from "./Pages/ProductListPage";
import ProductEditPage from "./Pages/ProductEditPage";

function App() { // 網頁路由
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<main className='py-3'>
					<Container>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route path='/profile' element={<ProfilePage />} />
							<Route path='/shipping' element={<ShippingPage />} />
							<Route path='/payment' element={<PaymentPage />} />
							<Route path='/placeorder' element={<PlaceOrderPage />} />

							<Route path='/order/:orderId' element={<OrderPage />} />
						

							<Route path='/product/:id' element={<ProductPage />} />
							<Route path='/cart/:productId?' element={<CartPage />} />
							
							{/* 若非後台管理員直接無法訪問該頁面 */}
							<Route path='/admin/userlist' element={<AdminRoute><UserListPage /></AdminRoute>} />
							<Route path='/admin/user/:userID/edit' element={<AdminRoute><UserEditPage /></AdminRoute>} />
							<Route path='/admin/productlist' element={<AdminRoute><ProductListPage /></AdminRoute>} />
							<Route path='/admin/product/:productID/edit' element={<AdminRoute><ProductEditPage /></AdminRoute>} />
							<Route path='/admin/orderlist' element={<AdminRoute><OrderListPage /></AdminRoute>} />

							{/* 通配路由，處理所有未匹配的路徑 */}
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</Container>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
