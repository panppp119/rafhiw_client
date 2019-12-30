import React from 'react'
import { List } from 'immutable'

import UserLayout from 'components/layouts/UserLayout'
import Pagination from 'components/Pagination'
import { ProductCard } from 'components/cards'

import './SubCategories.scss'

class SubCategories extends React.Component {
  componentDidMount () {
    const slug = this.props.match.params.slug

    this.props.loadSubCategory(slug)
  }

  render () {
    const { subCategory, location } = this.props

    const products = subCategory.get('products') || List()
    const splitLocation = location.pathname.split('/')
    const length = splitLocation.length

    const pagination = [
      { link: '/', name: 'หน้าแรก' },
      { link: `/c/${subCategory.getIn(['category', 'slug'], '')}`, name: subCategory.getIn(['category', 'name'], '') },
      { link: `/sc/${splitLocation[length - 1]}`, name: subCategory.get('name') }
    ]

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
                <Pagination pagination={pagination} />

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
