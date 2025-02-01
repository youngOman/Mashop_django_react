import React,{useEffect} from 'react'
import { Link, useLocation, useParams,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Row,Col,ListGroup,Image,Form,Button,Card  } from 'react-bootstrap';
import  Message from '../components/Message';
import { addToCart,removeFromCart } from '../actions/cartActions'; 

const CartPage = () => {
  const { productId } = useParams(); // useParams() 回傳的是物件，所以要用 {} 解構
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  
  // console.log(qty)
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty));
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  const checkOutHandler = (id) => {
    // navigate(`/login?redirect=shipping`);
    navigate(`/shipping`);
  }
  return (
    <Row>
      <Col md={8}>
        <h1>購物車</h1>
        {cartItems.length === 0 ? (
        <Message variant='info'>你的購物車是空的！&emsp;  
          <Link to='/'>回去逛逛？</Link>
        </Message> ) : 
          (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product_id}>
                  <Row>

                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                    </Col>
                    <Col md={2}>
                      {item.desc}
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>
                      ${item.price}
                    </Col>

                    <Col md={2}>
                      <Form.Control 
                          as='select'
                          value={item.qty}
                          onChange={(e)=>dispatch(addToCart(item.product_id,Number(e.target.value)))}
                      >
                        {
                          // [0,1,2,...]
                          [...Array(item.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={()=>removeFromCartHandler(item.product_id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
      </Col>
      
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h3>購物車目前有 {cartItems.reduce((acc,item)=>acc + item.qty,0)} 個產品</h3>
              <h3>購物車總金額：${cartItems.reduce((acc,item)=>acc + item.qty*item.price,0)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                前往結帳
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartPage