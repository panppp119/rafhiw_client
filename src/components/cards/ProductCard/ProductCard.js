import React from 'react'
import { Link } from 'react-router-dom'

import CountdownTimer from 'components/CountdownTimer'

import './ProductCard.scss'

class ProductCard extends React.Component {
  render () {
    return (
      <Link id="product-card" to='/p/' as='div'>
        <div className="image"
          style={{
            backgroundImage: 'url()'
          }}
          alt=''
        />

        <CountdownTimer />

        <div className="content">
          <p className="name">Name</p>
          <p className="price">Price</p>
        </div>
      </Link>
    )
  }
}

export default ProductCard
