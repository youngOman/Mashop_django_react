import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
// Component
import Rate from "../components/Rate";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Image, ListGroup, Button, Form, Card } from "react-bootstrap";
// Action
import { listProductDetail, createProductReview } from "../actions/productActions";
// Constant
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productsConstants";

// 單個產品的頁面
const ProductPage = () => {
	const { id } = useParams(); // V6 以後要用此方式來取得 App.js 傳回來的路由 :id，跟 App.js Route的 /product/:id 同名
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(1);
	const [comment, setComment] = useState("");

	const productDetail = useSelector((state) => state.productDetail);
	const { error, loading, product } = productDetail; // 要跟store.js的reducer取名一樣

	const { userInfo } = useSelector((state) => state.userLogin);

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productCreateReview;

	useEffect(() => {
		if (successCreateReview) {
			setRating(1);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetail(id));

		// async function fetchProduct() {
		//   // 這邊為django的 urls.py的urls
		//   const { data } = await axios.get(`/api/products/${id}`); // url前面要加 / 才不會出現django的url跟react的url疊家的情況 http://localhost:3000/product/api/products/3

		//   setProduct(data);
		// }
		// fetchProduct();
	}, [dispatch, id, successCreateReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
		// console.log("狠狠地丟到購物車裡",id)
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(product.id, { rating, comment }));
	};

	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				回首頁
			</Link>
			{loading ? (
				<h1>
					<Loader />
				</h1>
			) : error ? (
				<h3>
					<Message variant='danger'>{error}</Message>
				</h3>
			) : (
				<>
					<Card className='p-3 shadow-sm rounded'>
						<Row>
							<Col md={4}>
								<Image src={product.image} alt={product.name} fluid className='rounded'></Image>
							</Col>
							<Col md={8}>
								{/* flush = 去除 border */}
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h3>{product.name}</h3>
									</ListGroup.Item>

									<ListGroup.Item>
										<h4>商品規格：{product.description}</h4>
									</ListGroup.Item>

									<ListGroup.Item>
										<Rate value={product.rating} text={`${product.numReviews} 個評價`} color={`#f8e825`} />
									</ListGroup.Item>

									<ListGroup.Item>
										<h3>${product.price}</h3>
									</ListGroup.Item>

									<ListGroup.Item>
										<Col>庫存狀態：{product.countInStock > 0 ? "還有貨" : "沒了QQ下次請快"}</Col>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row className='align-items-center'>
												<Col md={2}>剩餘庫存</Col>
												<Col xs='auto'>
													<Form.Control as='select' value={qty} className='form-select' onChange={(e) => setQty(e.target.value)}>
														{
															// [0,1,2,...]
															[...Array(product.countInStock).keys()].map((x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															))
														}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button onClick={addToCartHandler} className='w-100 btn-block' disabled={product.countInStock === 0} type='button'>
											加入購物車
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Col>
						</Row>
					</Card>

					<Row className='my-3'>
						<Col md={6}>
							<h2>商品評價</h2>
							<ListGroup>
								{product.reviews.length === 0 && <Message variant='info'>目前還沒有評論～</Message>}
								{product.reviews.map((review) => (
									<ListGroup.Item key={review.id}>
										<div className='my-2 text-bold'>用戶名稱：{review.name}</div>
										<div className='my-2'>
											<Rate value={review.rating} color={`#f8e825`} />
										</div>
										<div className='my-2'>{review.createdAt.substring(0, 10)}</div>
										<div className='my-2'>{review.comment}</div>
									</ListGroup.Item>
								))}

								<ListGroup.Item>
									<h2 className='my-3'>撰寫評論</h2>
									{loadingCreateReview && <Loader />}
									{errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
									{successCreateReview && <Message variant='success'>評論已送出！</Message>}
									{userInfo ? (
										<Form onSubmit={submitReviewHandler}>
											<Form.Group controlId='rating' className='my-2'>
												<Form.Label>評價</Form.Label>
												<Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
													<option value=''>選擇評價</option>
													<option value='1'>1星 - 非常差</option>
													<option value='2'>2星 - 差</option>
													<option value='3'>3星 - 普通</option>
													<option value='4'>4星 - 好</option>
													<option value='5'>5星 - 超讚</option>
												</Form.Control>
											</Form.Group>

											<Form.Group controlId='comment'>
												<Form.Label>評論</Form.Label>
												<Form.Control as='textarea' rows={5} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='輸入您對此商品的評論...' />
											</Form.Group>

											<Button type='submit' variant='primary' className='my-2'>
												送出評論
											</Button>
										</Form>
									) : (
										<Message variant='info'>
											請先 <Link to='/login'>登入</Link> 再來撰寫評論
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default ProductPage;
