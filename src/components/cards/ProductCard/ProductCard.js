import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { List, Map } from 'immutable'

import CountdownTimer from 'components/CountdownTimer'
import PriceConvert from 'components/converts/PriceConvert'

import './ProductCard.scss'

class ProductCard extends React.Component {
  static defaultProps = {
    product: Map(),
  }

  render() {
    const { product } = this.props

    let options =
      (product.get('options') &&
        product.get('options').sort((a, b) => {
          if (a.get('discount_amt') !== 0) {
            return a.get('discount_amt') - b.get('discount_amt')
          } else {
            return a.get('price_amt') - b.get('price_amt')
          }
        })) ||
      List()
    var noItem = options.filter((opt) => opt.get('stock') <= 0).size > 0

    options = options.map((option) => {
      const discount =
        option.get('discount_amt') !== 0
          ? option.get('discount_amt') +
            option.get('ship_amt') +
            option.get('hiw_amt')
          : option.get('price_amt') +
            option.get('ship_amt') +
            option.get('hiw_amt')
      const original =
        option.get('price_amt') + option.get('ship_amt') + option.get('hiw_amt')
      const originalIncludeVat = original + original * (15 / 100) || 0
      const discountIncludeVat = discount + discount * (15 / 100) || 0

      let newOption = {
        ...option.toJS(),
        originalIncludeVat,
        discountIncludeVat,
      }

      return newOption
    })

    return (
      <div id='product-card'>
        <Link to={`/p/${product.get('id')}`}>
          <div
            className='image'
            style={{
              backgroundImage: `url(${
                product.get('image') || process.env.REACT_APP_DEFAULT_IMAGE
              })`,
            }}
            aria-label={product.get('name')}
          >
            {noItem && <div className='no-item'>สินค้าหมด</div>}
          </div>

          <div className='content'>
            <CountdownTimer item={product} />

            <h4 className='name'>{product.get('name')}</h4>
            <p className='price'>
              {!options.isEmpty() &&
              options.getIn([0, 'discount_amt']) !== 0 ? (
                <Fragment>
                  <span
                    className='price'
                    style={{ textDecoration: 'line-through' }}
                  >
                    <PriceConvert
                      price={options.getIn([0, 'originalIncludeVat'])}
                    />
                  </span>

                  <span className='discount'>
                    <PriceConvert
                      price={options.getIn([0, 'discountIncludeVat'])}
                    />
                  </span>
                </Fragment>
              ) : (
                <PriceConvert
                  price={options.getIn([0, 'originalIncludeVat'])}
                />
              )}
            </p>
          </div>
        </Link>
      </div>
    )
  }
}

export default ProductCard
