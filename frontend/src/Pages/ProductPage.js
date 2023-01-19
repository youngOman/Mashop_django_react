import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link,useParams } from 'react-router-dom';
import Rate from '../components/Rate'
// import axios  from 'axios';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Row,Col,Image,ListGroup,Button } from 'react-bootstrap';
import { listProductDetail } from '../actions/productActions';

// 單個產品的頁面

const ProductPage = () => {
  // 跟App.js的Route的 /product/:id 同名
  const { id } = useParams(); // 記得v6以後要用這種方式來取得product的id
  // const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const ProductDetail = useSelector(state => state.ProductDetail);
  const { error,loading,product } = ProductDetail // 要跟store.js的reducer取名一樣

  useEffect(() => {
    dispatch(listProductDetail(id))
    // async function fetchProduct() {
    //   // 這邊為django的 urls.py的urls
    //   const { data } = await axios.get(`/api/products/${id}`); // url前面要加 / 才不會出現django的url跟react的url疊家的情況 http://localhost:3000/product/api/products/3

    //   setProduct(data);
    // }
    // fetchProduct();
  }, [dispatch,id]);

  // let product = {}

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">回首頁</Link>
      {loading ? <h1><Loading/></h1> 
        : error ? <h3><Message variant='danger'>{error}</Message></h3>
        : (
          <>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rate
                    value={product.rating}
                    text={`${product.numReviews} 個評價`}
                    color={`#f8e825`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>${product.price}</h3>
                </ListGroup.Item>
                  {/* flush = 去除border */}
                <ListGroup.Item>
                  <h3>庫存狀態：{product.countInStock > 0 ? '還有貨' : '沒了QQ下次請快' }</h3>
                </ListGroup.Item>
                  <Button
                      size="lg"
                      className='btn-block'
                      disabled={product.countInStock === 0}
                      type='button'>
                      Add to Cart
                  </Button>
              </ListGroup>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md="auto">
              <ListGroup.Item>
                      <h3>商品規格：{product.description}</h3>
              </ListGroup.Item>
            </Col>
          </Row>
      </>
        )
      }
    </div>
  );
}

export default ProductPage