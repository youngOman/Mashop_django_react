import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listAllOrders } from "../actions/orderActions";

const OrderListPage = () => {
	const dispatch = useDispatch();

	const orderListAll = useSelector((state) => state.orderListAll);
	const { loading, error, orders } = orderListAll;
	// console.log(orders);

	useEffect(() => {
		dispatch(listAllOrders());
	}, [dispatch]);

	return (
		<div>
			<h1>訂單管理頁面</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive className='table-sm table-light'>
					<thead>
						<tr>
							<th>ID</th>
							<th>客戶名稱</th>
							<th>訂單日期</th>
							<th>訂單總金額</th>
							<th>訂單付款狀態</th>
							<th>訂單運送狀態</th>
							<th>訂單明細</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.user && order.user.first_name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								{/* 如果有付款就顯示 付款日期，否則就顯示 紅色叉叉 */}
								<td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: "red" }}></i>}</td>
								<td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: "red" }}></i>}</td>

								{/* <td>	
									<LinkContainer to={`/admin/orderlist/${order.id}`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button variant='danger' className='btn-sm'>
										<i className='fas fa-trash'></i>
									</Button>
								</td> */}
								<td>
									<LinkContainer to={`/order/${order.id}`}>
										<Button variant='light' className='btn-sm'>
											查看訂單明細 <i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default OrderListPage;
