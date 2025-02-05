import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
// Component
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { listProductDetail } from "../actions/productActions";
import { updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productsConstants";

const ProductEditPage = () => {
	const navigate = useNavigate();
	const { productID } = useParams(); // 要跟 App.js 裡定義的 :productID 路由名稱一樣

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [ImageUploading, setImageUploading] = useState("");

	const dispatch = useDispatch(); // 用來發送 action 的 hook

	const productDetail = useSelector((state) => state.productDetail); // 列出用戶資料
	const { loading, error, product } = productDetail;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				id: productID,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (!product || !product.name || product.id !== Number(productID)) {
				dispatch(listProductDetail(productID));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, product, productID, navigate, successUpdate]);

	const uploadImageHandler = async (e) => {
		console.log(e.target.value);
		const file = e.target.files[0];

		const formData = new FormData();
		formData.append("product_image", file); // product_image 後端 uploadProductImage view 接收的參數名稱
		formData.append("product_id", productID);

		try {
			// const config = {
			// 	headers: { "Content-Type": "multipart/form-data" },
			// }
			const { data } = await axios.post("/api/products/upload/", formData); // 呼叫後端 uploadProductImage view
			console.log(data);
			setImage(data); // 後端的 return Response 值
			setImageUploading(false); // 避免重複點擊
		} catch (error) {
			setImageUploading(false);
		}
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				回到產品列表
			</Link>

			<h1>編輯產品資料</h1>

			{/* 更新產品資料時的 loading 和 error */}
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<FormContainer>
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name' className='mb-3'>
							<Form.Label>產品名稱</Form.Label>
							<Form.Control required type='name' placeholder='請輸入您的ID' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='price' className='mb-3'>
							<Form.Label>產品價格</Form.Label>
							<Form.Control required type='number' placeholder='請輸入產品價格' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>

						{/* Form.File 已在 5.x 及以上版本 deprecated  */}
						{/* <Form.File id='image-file' label='選擇產品圖片' custom onChange={uploadImageHandler}></Form.File> */}
						<Form.Group controlId='image' className='mb-3'>
							<Form.Label>產品圖片</Form.Label>
							<Form.Control required type='text' placeholder='請輸入產品圖片' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.Control type='file' onChange={uploadImageHandler} />
						</Form.Group>
						{ImageUploading && <Loader />}

						<Form.Group controlId='brand' className='mb-3'>
							<Form.Label>產品品牌</Form.Label>
							<Form.Control required type='text' placeholder='請輸入產品品牌' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='category' className='mb-3'>
							<Form.Label>產品類別</Form.Label>
							<Form.Control required type='text' placeholder='請輸入產品類別' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock' className='mb-3'>
							<Form.Label>產品庫存</Form.Label>
							<Form.Control required type='number' placeholder='請輸入產品庫存' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='description' className='mb-3'>
							<Form.Label>產品描述</Form.Label>
							<Form.Control required type='text' placeholder='請輸入產品描述' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary' className='mt-3' disabled={loadingUpdate}>
							更新產品資料
						</Button>
					</Form>
				</FormContainer>
			)}
		</>
	);
};

export default ProductEditPage;
