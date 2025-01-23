import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100 text-center'>
			<h1 className='display-1 text-danger'>404</h1>
			<p className='lead'>兄弟...你迷路的吧，來點 Mygo</p>
			<Link to='/' className='btn btn-primary'>
				回到首頁
			</Link>
		</div>
	);
};

export default NotFoundPage;
