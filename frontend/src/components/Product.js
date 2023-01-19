import React from 'react';
import { Card } from 'react-bootstrap';
import Rate from './Rate';
import { Link } from 'react-router-dom';

// 顯示在HomePage的產品樣式component

const Product = ({product}) => {

  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product.id}`}>
          <Card.Img src={product.image} />
        </Link>
        {/* 商品名稱 */}
        <Card.Body>
          <Link to={`/product/${product.id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        {/* 商品評價 */}
          <Card.Text as="div">
            <div className="my-3">
              <Rate
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>
        {/* 商品價格 */}
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product