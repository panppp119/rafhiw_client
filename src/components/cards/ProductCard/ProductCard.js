import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { List, Map } from 'immutable'

import CountdownTimer from 'components/CountdownTimer'
import PriceConvert from 'components/converts/PriceConvert';

import './ProductCard.scss'

class ProductCard extends React.Component {
  static defaultProps = {
    product: Map()
  }

  render () {
    const { product } = this.props

    const options =
      (product.get('options') &&
        product.get('options').sort((a, b) => {
          if (a.get('discount_amt') !== 0) {
            return a.get('discount_amt') - b.get('discount_amt');
          } else {
            return a.get('price_amt') - b.get('price_amt');
          }
        })) ||
      List();

    return (
      <Link id="product-card" to={`/p/${product.get('id')}`} as='div'>
        <div className="image"
          style={{
            backgroundImage: `url(${product.get('image') || 'https://rafhiw.com/uploads/default.png'})`
          }}
          aria-label={product.get('name')}
        />

        <div className="content">
          <CountdownTimer item={product} />

          <h4 className="name">{product.get('name')}</h4>
          <p className="price">
            {!options.isEmpty() && options.getIn([0, 'discount_amt']) !== 0 ? (
              <Fragment>
                <span
                  className="price"
                  style={{ textDecoration: 'line-through' }}
                >
                  <PriceConvert price={options.getIn([0, 'price_amt'])} />
                </span>

                <span className='discount'>
                  <PriceConvert price={options.getIn([0, 'discount_amt'])} />
                </span>
              </Fragment>
            ) : (
              <PriceConvert price={options.getIn([0, 'price_amt'])} />
            )}
          </p>
        </div>
      </Link>
    )
  }
}

export default ProductCard
