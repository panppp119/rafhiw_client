import React from 'react'
import { List } from 'immutable'

import UserLayout from 'components/layouts/UserLayout'
import { ProductCard } from 'components/cards'

import './Categories.scss'

class Categories extends React.Component {
  componentDidMount () {
    const slug = this.props.match.params.slug

    this.props.loadCategory(slug)
  }

  render () {
    const { category } = this.props

    const products = category.get('products') || List()

    return (
      <UserLayout>
        <div id="categories-page">
          <div className="container">
            <div className="products">
              <div className="mobile">
                {
                  !products.isEmpty() ? products.map((pd, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={pd} />
                      </div>
                    )
                  }) : <p>ไม่มีสินค้า</p>
                }
              </div>

              <div className="desktop">
                {
                  !products.isEmpty() ? products.map((pd, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={pd} />
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

export default Categories
