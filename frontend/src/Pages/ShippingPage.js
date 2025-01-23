import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { saveShippingAddress } from "../actions/cartActions";
// Component
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart // 從 store 中取出 shippingAddress，避免使用者重新整理頁面時，資料消失

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
      <CheckoutSteps loginStep shippingStep/>
      <h1>運送地址</h1>

    <Form onSubmit={submitHandler}>
      <Form.Group controlId="address" className="m-3">
        <Form.Label>地址</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="請輸入地址"
          value={address ? address : ''} // 這裡是為了避免 React 警告，因為在第一次 render 時，address 是 undefined，所以會出現警告
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="city" className="m-3">
        <Form.Label>城市</Form.Label>
        <Form.Control
          required
          type="city"
          placeholder="請輸入城市"
          value={city ? city : ''}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="username"
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="postalCode" className="m-3">
        <Form.Label>郵遞區號</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="請輸入郵遞區號"
          value={postalCode ? postalCode : ''} 
          onChange={(e) => setPostalCode(e.target.value)}
          autoComplete="current-password"
        ></Form.Control>
      </Form.Group>

       <Form.Group controlId="country" className="m-3">
        <Form.Label>國家</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="請輸入居住國家"
          value={country ? country : ''}
          onChange={(e) => setCountry(e.target.value)}
          autoComplete="new-password"
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary" className="m-3">
         繼續
      </Button>
    </Form>
  </FormContainer>
  )
}

export default ShippingPage