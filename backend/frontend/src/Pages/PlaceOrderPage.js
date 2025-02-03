import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card ,Table} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
// Components
import CheckoutSteps from "../components/CheckoutSteps";
import  Message from '../components/Message';

// import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderPage = () => {
  
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  // 計算此訂單的總金額
  cart.itemsPrice = cart.cartItems.reduce((acc,currentItem)=>acc+currentItem.price*currentItem.qty,0) // reduce() 接收兩個參數，第一個是 callback function，第二個是初始值，acc 作用是為了將每一個 item 的價格加總
  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 50 // 如果購物車的總金額大於 1000，則免運費，否則運費為 50
  // cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2)) // 稅金為總金額的 15%
  // cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice) // 總金額為總金額 + 運費
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
  
  const placeOrderHandler = () => {
    dispatch(createOrder({ // 將訂單資訊傳到後端
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
    // navigate('/placeorder')
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  if (!cart.paymentMethod) {
    navigate('/payment')
  }

  useEffect(()=>{
    if(success){
      navigate(`/order/${order.id}`)
      dispatch({type:'ORDER_CREATE_RESET'}) // 重置訂單資訊
    }
  },[success, navigate, order, dispatch])

  return (
    <div>
        <CheckoutSteps loginStep shippingStep paymentStep placeOrderStep />
        <Row>

          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>物流</h2>
                <p>
                  <strong>地址:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>付款方式：</h2>
                <strong>{cart.paymentMethod}</strong>
              </ListGroup.Item>
              
              <ListGroup.Item>
                {cart.cartItems.length === 0 ? ( 
                  <Message variant="info"> 你的購物車是空的！&emsp; <Link to='/'>回去逛逛？</Link> </Message>
                ) : (
                  <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>訂單明細</h2>
                    {cart.cartItems.length === 0 ? (
                      <Message variant="info">
                        你的購物車是空的！&emsp;<Link to="/">回去逛逛？</Link>
                      </Message>
                    ) : (
                      <Table responsive striped hover>
                        <thead>
                          <tr>
                            <th>商品</th>
                            <th></th>
                            <th>單價</th>
                            <th>數量</th>
                            <th>總計</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.cartItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Image src={item.image} fluid rounded width={50}></Image>    
                              </td>
                              <td>
                              <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                              </td>
                              
                              <td>{item.price}</td>
                              <td>{item.qty}</td>
                              <td>{item.price * item.qty}</td>
                              <td>
                              <Button
                                type='button'
                                variant='light'
                                onClick={()=>removeFromCartHandler(item.product_id)}
                              >
                                <i className='fas fa-trash'></i>
                              </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </ListGroup.Item>
                </ListGroup>
                
                ) }
              </ListGroup.Item>

            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">

                <ListGroup.Item>
                  <h2>訂單摘要</h2>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <Row>
                    <Col style={{ fontSize: '1.5rem' }}>商品總計</Col>
                    <Col style={{ fontSize: '1.5rem' }}>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col style={{ fontSize: '1.5rem' }}>運費</Col>
                    <Col style={{ fontSize: '1.5rem' }}>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col style={{ fontSize: '1.5rem' }}>總計</Col>
                    <Col style={{ fontSize: '1.5rem' }}>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    下訂單
                  </Button>
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderPage