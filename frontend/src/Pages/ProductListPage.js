import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productsConstants"; // 重置新增產品的狀態

const ProductListPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let keyword = useLocation().search;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET }); // 進入頁面先重置新增產品狀態
		if (successCreate) {
			// 若成功新增產品，導向到該產品編輯頁面
			navigate(`/admin/product/${createdProduct.id}/edit`);
		} else {
			dispatch(listProducts(keyword));
		}
	}, [dispatch, navigate, successDelete, successCreate, createdProduct, keyword]); // 這邊放 successDelete，因為要在刪除使用者後自動重新載入頁面

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	const deleteProductHandler = (id) => {
		if (window.confirm("確定要刪除此產品嗎？")) {
			dispatch(deleteProduct(id));
		}
	};

	// 確保 products 有數據後再進行解構，否則 React 組件在一開始渲染時 product 為空陣列，會讀不到而報錯
	// if (!products || products.length < 2) {
	// 	// 如果數據還沒加載完成，直接返回 loading 或空的 UI
	// 	return <p>載入中或產品數量不足...</p>;
	// }
	// // 解構賦值
	// const [{ name: name1, brand: brand1 }, { name: name2, brand: brand2 }] = products;
	// console.log(name1, brand1);
	// console.log(name2, brand2);

	// const [product1, product2] = products;
	// console.log(product1,product2);

	return (
		<div>
			<h1>產品管理</h1>
			<Row className='align-items-center'>
				<Col className='text-right'>
					<Button className='my-3' variant='success' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> 新增產品
					</Button>
				</Col>
			</Row>
			{/* 刪除功能的載入狀態*/}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{/* 新增功能的載入狀態 */}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{/* 顯示所有產品的狀態 */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped hover responsive className='table-sm table-light'>
						<thead>
							<tr>
								<th>ID</th>
								<th>產品名稱</th>
								<th>價格</th>
								<th>分類</th>
								<th>品牌</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.price} </td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product.id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product.id)}>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</div>
	);
};

export default ProductListPage;
