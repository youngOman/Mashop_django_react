import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

	const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/?keyword=${keyword}&page=1`); // 這邊 ?keyword 不用加任何其他東西，否則 HomePage 的 useLocation 印不出 keyword
		} else {
			navigate(window.location.pathname); // 若沒有輸入關鍵字，則停留在當前頁面
		}
	};

	return (
		<Form onSubmit={submitHandler} className='d-flex' style={{ height: "38px" }}>
			<Form.Control 
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='搜尋商品...'
				className='me-2 form-control-sm'
			/>
			<Button type='submit' variant='outline-success' className='p-2'>
				<i className='fas fa-search'></i>
			</Button>
		</Form>
	);
};

export default SearchBar;
