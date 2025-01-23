import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(JSON.parse(localStorage.getItem("paymentMethod")) || "");


  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps loginStep shippingStep paymentStep />
      <h1>付款方式</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">選擇付款方式</Form.Label>
          <Col>
            
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal or Credit Card"
              name="paymentMethod"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.id)}
            />
            <Form.Check
              type="radio"
              id="LinePay"
              label="LinePay"
              name="paymentMethod"
              checked={paymentMethod === "LinePay"}
              onChange={(e) => setPaymentMethod(e.target.id)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          繼續
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
