import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import { ProductCard } from 'components/cards'

import './Products.scss'

class Products extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render () {
    const { products } = this.props

    return (
      <UserLayout>
        <div id="products-page">
          <div className="container">
            <div className="products">
              <div className="mobile">
                {
                  !products.isEmpty() ? products.map((product, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={product} />
                      </div>
                    )
                  }) : <p>ไม่มีสินค้า</p>
                }
              </div>

              <div className="desktop">
                {
                  !products.isEmpty() ? products.map((product, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={product} />
                      </div>
                    )
                  }) : <p>ไม่มีสินค้า</p>
                }
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Products
