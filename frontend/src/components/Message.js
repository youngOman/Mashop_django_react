import React from 'react'
import { Alert } from 'react-bootstrap';


const Message = ({variant,children}) => {
  return (
    <Alert variant={variant}>
      {children}
      {/* 這為HomePage Message中夾的{error} */}
    </Alert>
  )
}

export default Message