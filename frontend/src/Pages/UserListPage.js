import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listUsers,deleteUser } from "../actions/userActions";

const UserListPage = () => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		dispatch(listUsers());
	}, [dispatch,successDelete]); // 這邊放入 successDelete，因為要在刪除使用者後自動重新載入頁面

    const deleteUserHandler = (id) => { // 按鈕點擊後觸發
        // console.log("delete",id);
		if(window.confirm("確定要刪除此使用者嗎？")){
			dispatch(deleteUser(id));
		}
    }

	return (
		<div>
			<h1>用戶們</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive className='table-sm table-light'>
					<thead>
						<tr>
							<th>ID</th>
							<th>名字</th>
							<th>電子郵件</th>
							<th>後台管理員</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.first_name}</td>
								<td>{user.email}    </td>
								<td>{user.isAdmin ? <i className='fas fa-check' style={{ color: "green" }}></i> : <i className='fas fa-times' style={{ color: "red" }}></i>}</td>
								<td>
									<LinkContainer to={`/admin/user/${user.id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user.id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UserListPage;
