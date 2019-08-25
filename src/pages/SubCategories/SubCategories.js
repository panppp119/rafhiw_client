import React from 'react'
import { List } from 'immutable'

import UserLayout from 'components/layouts/UserLayout'
import { ProductCard } from 'components/cards'

import './SubCategories.scss'

class SubCategories extends React.Component {
  componentDidMount () {
    const slug = this.props.match.params.slug

    this.props.loadSubCategory(slug)
  }

  render () {
    const { subCategory } = this.props

    const products = subCategory.get('products') || List()

    return (
      <UserLayout>
        <div id="sub-categories-page">
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

export default SubCategories
