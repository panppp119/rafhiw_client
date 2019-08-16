import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import { ProductCard } from 'components/cards'

import './Products.scss'

class Products extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="products-page">
          <div className="container">
            <div className="products">
              <h3>สินค้า</h3>

              <div className="mobile">
                <div className="column">
                  <ProductCard />
                </div>
                <div className="column">
                  <ProductCard />
                </div>
              </div>

              <div className="desktop">
                <div className="column">
                  <ProductCard />
                </div>
                <div className="column">
                  <ProductCard />
                </div>
                <div className="column">
                  <ProductCard />
                </div>
                <div className="column">
                  <ProductCard />
                </div>
                <div className="column">
                  <ProductCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Products
