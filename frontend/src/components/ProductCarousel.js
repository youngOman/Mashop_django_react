import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// 載入元件
import Loader from "./Loader";
import Message from "./Message";
// 載入 action
import { listTopRatedProducts } from "../actions/productActions";

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const { loading, error, products }  = useSelector((state) => state.productTopRated);

	useEffect(() => {
		dispatch(listTopRatedProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause="hover" className="product-carousel">
			{products.map((product) => (
				<Carousel.Item key={product.id} className="carousel-item">
					<Link to={`/product/${product.id}`}>
						<div className="image-container">
							<Image
								src={product.image}
								alt={product.name}
								className="carousel-image"
							/>
						</div>
						<Carousel.Caption className="carousel-caption">
							<h2>{product.name} <span>${product.price}</span></h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
