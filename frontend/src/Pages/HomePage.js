import React, { useEffect } from "react";
// import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
// Component
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
	// const [products,setProducts] = useState([])
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList); // 從store.js的 reducer pull出來
	const { error, loading, products, page, pages } = productList; // 並進行解構

	let keyword = useLocation().search;
	// console.log(keyword);

	useEffect(() => {
		dispatch(listProducts(keyword));
		// // console.log('useEffect有作用啦');
		// async function fetchProducts(){
		//   const {data} = await axios.get("api/products/");
		//   setProducts(data);
		//   // console.log({data});
		// }
		// fetchProducts();
	}, [dispatch, keyword]);

	return (
		<div>
			{/* 有 keyword 就「不」顯示 ProductCarousel */}
			{!keyword && <ProductCarousel />}
			
			<h1>最新產品(2025更新)</h1>
			{loading ? (
				<h1>
					<Loader />
				</h1>
			) : error ? (
				<h3>
					<Message variant='danger'>{error}</Message>
				</h3> // 要測試錯誤可以去 action 改axios.get
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product.id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword} isAdmin={false} />
				</>
			)}
		</div>
	);
};

export default HomePage;
