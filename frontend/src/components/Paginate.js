import React from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {


	const navigate = useNavigate();

	if (keyword) {
		keyword = keyword.split("?keyword=")[1]?.split("&")[0] || ""; 
	}

	page = Number(page) || 1;

	const handleClick = (x) => {
		navigate(`${isAdmin ? "/admin/productlist" : "/"}?keyword=${keyword}&page=${x}`);
	};

	console.log(Array(pages).keys());
	return (
		<Pagination className="justify-content-center">
			{[...Array(pages).keys()].map((x) => (
				<Pagination.Item
					key={x + 1}
					active={x + 1 === page}
					onClick={() => handleClick(x + 1)}
					className=""
				>
					{x + 1}
				</Pagination.Item>
			))}
		</Pagination>
	);
};

export default Paginate;
