import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const CheckoutSteps = ({loginStep,shippingStep,paymentStep,placeOrderStep}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {loginStep ? (
                <LinkContainer to='/login'>
                    <Nav.Link>登入</Nav.Link>
                </LinkContainer>
            ) : ( <Nav.Link disabled>登入</Nav.Link> )}
        </Nav.Item>
        
        <Nav.Item>
            {shippingStep ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>運送地址</Nav.Link>
                </LinkContainer>
            ) : ( <Nav.Link disabled>運送地址</Nav.Link> )}
        </Nav.Item>

        <Nav.Item>
            {paymentStep ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>付款</Nav.Link>
                </LinkContainer>
            ) : ( <Nav.Link disabled>付款</Nav.Link> )}
        </Nav.Item>

        <Nav.Item>
            {placeOrderStep ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>確定下單</Nav.Link>
                </LinkContainer>
            ) : ( <Nav.Link disabled>確定下單</Nav.Link> )}
        </Nav.Item>
    </Nav>

    
  )
}

export default CheckoutSteps