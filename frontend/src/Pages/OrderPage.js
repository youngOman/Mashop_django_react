import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
// actions
import { getOrderDetails, payOrder } from "../actions/orderActions";
// components
// import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import PayPalPayment from "../components/PayPalPayment";

const OrderPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams(); // useParams() 回傳的是物件，所以要用 {} 解構

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  // console.log(order);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  // 將 loading、success 分別指派給名，是因為上面已經有 loading 了，怕混淆

  if (!loading && !error) {
    // 避免 order 不存在，出現 cannot read property of undefined
    order.itemsPrice = order.orderItems.reduce(
      (acc, currentItem) => acc + currentItem.price * currentItem.qty,
      0
    ); // reduce() 接收兩個參數，第一個是 callback function，第二個是初始值，acc 作用是為了將每一個 item 的價格加總
  }

  // const addPayPalScript = async () => {
  //   // const { data: clientId } = await axios.get("/api/config/paypal"); // 這邊的 axios 是因為我們在 index.html 裡面引入了 axios CDN
  //   // console.log(clientId);
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  useEffect(() => {
    
    if (!order || successPay || order.id !== Number(orderId)) {
      // 沒 RESET 會一直導致跑 <Loader />
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      setSdkReady(true);
    }
  }, [dispatch, navigate, order, orderId, successPay]);

  const successPaymenyHadler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h2>訂單編號：{order ? order.id : ""}</h2>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>收件人資訊</h2>
                <p>
                  <strong>姓名：</strong>
                  {order.user.first_name} {order.user.last_name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {/* 打開 Email 的外部連結所以才不用 LinkContainer */}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>地址：</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                  {"  "}
                  {order.shippingAddress.postalCode},{"  "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    已送達 {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">未送達</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>付款方式</h2>
                <p>
                  <strong>付款方式：</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">已付款 {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">未付款</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>訂單商品</h2>
                {order.orderItems.length === 0 ? (
                  <Message>訂單內沒有商品</Message>
                ) : (
                  <Table striped hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>商品圖片</th>
                        <th>商品名稱</th>
                        <th>數量</th>
                        <th>價格</th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                              style={{ width: "70px", height: "50px" }}
                            />
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {item.name}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {item.qty}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {item.price}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
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
                    <Col>商品總價</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>運費：</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>總計：</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {/* PayPal 付款元件 */}
                {!order.isPaid && (
                  <ListGroup.Item>
                    {" "}
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalPayment amount={order.totalPrice} onSuccess={successPaymenyHadler} />
                    )}
                  </ListGroup.Item>
                )}
                
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderPage;
