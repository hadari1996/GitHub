import React, { FC } from 'react'

interface CartProps {
    display: string
}

const Cart:FC<CartProps> = ({display}) => {
  return (
    <div style={{display: display}}>Cart</div>
  )
}

export default Cart