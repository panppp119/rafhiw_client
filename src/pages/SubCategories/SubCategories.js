import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import { ProductCard } from 'components/cards'

import './SubCategories.scss'

class SubCategories extends React.Component {
  componentDidMount () {
    const slug = this.props.match.params.slug

    this.props.loadSubCategory(slug)
  }

  render () {
    const { products } = this.props

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
                        <ProductCard {...pd} />
                      </div>
                    )
                  }) : <h3>ไม่มีสินค้า</h3>
                }
              </div>

              <div className="desktop">
                {
                  !products.isEmpty() ? products.map((pd, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard {...pd} />
                      </div>
                    )
                  }) : <h3>ไม่มีสินค้า</h3>
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
