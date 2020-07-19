import React, { Fragment } from 'react'
import ImageGallery from 'react-image-gallery'
import { List } from 'immutable'
import { FaPlus, FaMinus } from 'react-icons/fa'

// import UserMessage from 'components/messages/UserMessage'
import CountdownTimer from 'components/CountdownTimer'
import PriceConvert from 'components/converts/PriceConvert'
import EventCard from 'components/cards/EventCard'
import ProductCard from 'components/cards/ProductCard'
import Img from 'components/Img'
import UserLayout from 'components/layouts/UserLayout'
import Loader from 'components/Loader'
import Pagination from 'components/Pagination'
import defaultImg from 'components/Img/default.png'

import './Product.scss'

class Product extends React.Component {
  state = {
    quantity: 1,
    option: 0,
    products: [],
    totalQuantity: 0,
    showChat: false,
    out: false,
  }

  componentDidMount() {
    const { user } = this.props
    const id = this.props.match.params.id

    this.props.loadProduct(id)
    !user.isEmpty() && this.props.loadCart()

    this.props.events.isEmpty() && this.props.loadEvents()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadCart(this.props.user.get('id'))
    }
    if (this.props.product.get(['options', 0, 'stock']) === 0) {
      this.setState({ stock: 0 })
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.loadProduct(this.props.match.params.id)
    }

    this.props.products.isEmpty() &&
      !this.props.product.isEmpty() &&
      this.props.loadProducts(
        this.props.product.getIn(['category', 'slug'], ''),
      )
  }

  handleClickChat = (bool) => {
    if (this.props.user.isEmpty()) {
      this.props.history.push('/sign_in')
    } else {
      this.setState({ showChat: bool ? bool : !this.state.showChat })
    }
  }

  addProduct(stock) {
    const { createCart, updateCart, cart, user, product } = this.props
    const { quantity, product_option_id } = this.state

    var poId = product_option_id || product.getIn(['options', 0, 'id'])

    const pd = {
      quantity: quantity,
      product_option_id: poId,
      product_id: product.get('id'),
    }

    if (user.isEmpty()) {
      this.props.history.push('/sign_in')
    } else if (cart.isEmpty()) {
      createCart({
        products: cart.get('products') || [pd],
        user_id: user.get('id'),
      })
    } else {
      var pds = cart.get('products') || List()
      var index = pds.findIndex((pd) => pd.get('product_option_id') === poId)

      if (index !== -1) {
        var qt = pds.getIn([index, 'quantity'], (pdQt) => pdQt + quantity)

        if (qt > stock) {
          alert('ของในคลังสินค้าไม่เพียงพอ')
        } else {
          updateCart(cart.get('id'), {
            product: pd,
            cart_qt: cart.get('total_qt') || 0,
            quantity: quantity || 0,
            user_id: user.get('id'),
          })
        }
      } else {
        updateCart(cart.get('id'), {
          product: pd,
          cart_qt: cart.get('total_qt') || 0,
          quantity: quantity || 0,
          user_id: user.get('id'),
        })
      }
    }
  }

  decreaseQuantity(e, stock, id) {
    const quantity = this.state.quantity - 1

    this.setState({
      quantity: quantity <= 1 ? 1 : quantity,
      product_option_id: id,
    })
  }

  increaseQuantity(e, stock, id) {
    const quantity = this.state.quantity + 1

    this.setState({
      quantity: quantity > stock ? stock : quantity,
      product_option_id: id,
    })
  }

  handleSelectOption(e, key, stock) {
    e.preventDefault()

    this.setState({
      option: key,
      quantity: 1,
      product_option_id: e.target.name,
      stock,
    })
  }

  gotoCart(stock) {
    this.addProduct(stock)
    this.props.history.push('/cart')
  }

  render() {
    const {
      product,
      events,
      products,
      loadingProduct,
      loadingEvents,
    } = this.props
    const { quantity } = this.state

    const options =
      (product && !product.isEmpty() && product.get('options')) || List()
    const attachments = (!product.isEmpty() && product.get('images')) || List()
    const reviews = (!product.isEmpty() && product.get('reviews')) || List()
    const loaderSize = 25

    const images = attachments
      .map((attachment) => ({
        original: attachment.get('image'),
        thumbnail: attachment.get('image'),
      }))
      .toJS()

    const pagination = [
      { link: '/', name: 'หน้าแรก' },
      {
        link: `/c/${product.getIn(['category', 'slug'], '')}`,
        name: product.getIn(['category', 'name'], ''),
      },
      {
        link: `/sc/${product.getIn(['sub_category', 'slug'], '')}`,
        name: product.getIn(['sub_category', 'name'], ''),
      },
      { link: `/p/${product.get('id')}`, name: product.get('name') },
    ]

    return (
      <UserLayout>
        <div id='product-page'>
          <div className='container'>
            <div className='desktop'>
              <Pagination pagination={pagination} />
            </div>

            <div
              className='product'
              style={{ paddingTop: loadingProduct ? '15%' : 0 }}
            >
              <Loader loading={loadingProduct}>
                <div className='column'>
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    autoPlay
                  />

                  <div
                    className='owner'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div className='avatar' style={{ marginRight: 10 }}>
                      <Img
                        src={product.getIn(['owner', 'image']) || defaultImg}
                        alt={product.getIn(['owner', 'first_name'])}
                      />
                    </div>

                    <div className='info' style={{ marginRight: 10 }}>
                      <h4>
                        {product.getIn(['owner', 'first_name'])}{' '}
                        {product.getIn(['owner', 'last_name'])}
                      </h4>
                    </div>

                    {/* <button
                      className='primary'
                      style={{ maxWidth: 200 }}
                      onClick={() => this.handleClickChat()}
                    >
                      แชทกับผู้ขาย
                    </button> */}
                  </div>
                </div>

                <div className='column product-detail'>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h3>{product.get('name')}</h3>
                        </td>
                        <td>
                          <CountdownTimer item={product} />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <h4>หมวดหมู่สินค้า</h4>
                        </td>
                        <td>
                          {product.getIn(['category', 'name'])} /{' '}
                          {product.getIn(['sub_category', 'name'])}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <h4>ชื่องาน</h4>
                        </td>
                        <td>{product.getIn(['event', 'name'])}</td>
                      </tr>

                      <tr>
                        <td>
                          <h4>รายละเอียด</h4>
                        </td>
                        <td>{product.get('description')}</td>
                      </tr>

                      <tr>
                        <td>
                          <h4>ที่ตั้ง</h4>
                        </td>
                        <td>
                          <a
                            href={`https://maps.google.com/?q=${product.getIn([
                              'event',
                              'location',
                              'lat',
                            ])},${product.getIn(['event', 'location', 'lng'])}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {product.getIn(['event', 'location', 'name'], '')}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan='2' className='option'>
                          {options.map((option, i) => {
                            return (
                              <button
                                name={option.get('id')}
                                className={
                                  this.state.option === i ? 'primary' : 'option'
                                }
                                disabled={option.get('stock') <= 0}
                                key={i}
                                onClick={(e) => this.handleSelectOption(e, i)}
                              >
                                {option.get('name')}
                              </button>
                            )
                          })}
                        </td>
                      </tr>

                      {options.map((option, i) => {
                        const stock = option.get('stock') || 0
                        const discount =
                          option.get('discount_amt') !== 0
                            ? option.get('discount_amt') +
                              option.get('ship_amt') +
                              option.get('hiw_amt')
                            : option.get('price_amt') +
                              option.get('ship_amt') +
                              option.get('hiw_amt')
                        const original =
                          option.get('price_amt') +
                          option.get('ship_amt') +
                          option.get('hiw_amt')
                        const originalIncludeVat =
                          original + original * (15 / 100) || 0
                        const discountIncludeVat =
                          discount + discount * (15 / 100) || 0

                        return this.state.option === i ? (
                          <Fragment key={i}>
                            <tr>
                              <td>
                                <h4>ราคาสินค้า</h4>
                              </td>
                              <td>
                                {option.get('discount_amt') !== 0 ? (
                                  <Fragment>
                                    <span
                                      className='price'
                                      style={{ textDecoration: 'line-through' }}
                                    >
                                      <PriceConvert
                                        price={originalIncludeVat}
                                      />
                                    </span>
                                    <span className='discount'>
                                      <PriceConvert
                                        price={discountIncludeVat}
                                      />
                                    </span>
                                  </Fragment>
                                ) : (
                                  <span>
                                    <PriceConvert price={originalIncludeVat} />
                                  </span>
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <h4>จำนวน</h4>
                              </td>
                              <td>
                                <div className='quantity-input'>
                                  <button
                                    disabled={quantity === 1 || stock <= 0}
                                    className='primary'
                                    onClick={(e) =>
                                      this.decreaseQuantity(
                                        e,
                                        stock,
                                        option.get('id'),
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </button>

                                  <input
                                    type='number'
                                    disabled
                                    value={stock > 0 ? quantity : 0}
                                  />

                                  <button
                                    disabled={quantity === stock || stock <= 0}
                                    className='primary'
                                    onClick={(e) =>
                                      this.increaseQuantity(
                                        e,
                                        stock,
                                        option.get('id'),
                                      )
                                    }
                                  >
                                    <FaPlus />
                                  </button>

                                  {stock > 0 ? (
                                    <span>
                                      มีสินค้าทั้งหมด {option.get('stock') || 0}{' '}
                                      ชิ้น
                                    </span>
                                  ) : (
                                    <span>สินค้าหมด</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <div className='actions'>
                                  <div className='button-field'>
                                    <button
                                      className='primary'
                                      onClick={() => this.addProduct(stock)}
                                      disabled={stock <= 0}
                                    >
                                      เพิ่มไปยังรถเข็น
                                    </button>
                                  </div>
                                  <div className='button-field'>
                                    <button
                                      name='buy'
                                      className='primary'
                                      onClick={() => this.gotoCart(stock)}
                                      disabled={stock <= 0}
                                    >
                                      ซื้อสินค้า
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </Fragment>
                        ) : null
                      })}
                    </tbody>
                  </table>
                </div>
              </Loader>
            </div>

            <div className='product-reviews'>
              <h3>รีวิว</h3>

              <div className='reviews'>
                <Loader loading={loadingProduct} size={loaderSize}>
                  {reviews.map((review, i) => {
                    return (
                      <div className='review' key={i}>
                        <img
                          src={review.get('image')}
                          alt={`${review.get('first_name')}-img`}
                        />
                        <div className='info'>
                          <h4>
                            {review.get('first_name')} {review.get('last_name')}
                          </h4>
                          <p className='small'>
                            - {review.get('product_option_name')} (
                            {review.get('rating')}/5)
                          </p>
                          <p>{review.get('comment')}</p>
                        </div>
                      </div>
                    )
                  })}
                </Loader>
              </div>
            </div>

            <div className='products'>
              <h3>สินค้าใกล้เคียง</h3>

              <Loader loading={loadingProduct} size={loaderSize}>
                <div className='mobile'>
                  {products.size > 0 ? (
                    products.map((pd, i) => {
                      let num = 0

                      if (
                        pd.get('id') !== product.get('id') &&
                        pd.get('category_id') === product.get('category_id') &&
                        num < 2
                      ) {
                        num++

                        return (
                          <div className='column' key={i}>
                            <ProductCard product={pd} user={this.props.user} />
                          </div>
                        )
                      } else {
                        return null
                      }
                    })
                  ) : (
                    <p>ไม่มีสินค้าใกล้เคียง</p>
                  )}
                </div>

                <div className='desktop'>
                  {products.size > 0 ? (
                    products.map((pd, i) => {
                      let num = 0

                      if (
                        pd.get('id') !== product.get('id') &&
                        pd.get('category_id') === product.get('category_id') &&
                        num < 5
                      ) {
                        num++

                        return (
                          <div className='column' key={i}>
                            <ProductCard product={pd} user={this.props.user} />
                          </div>
                        )
                      } else {
                        return null
                      }
                    })
                  ) : (
                    <p>ไม่มีสินค้าใกล้เคียง</p>
                  )}
                </div>
              </Loader>
            </div>

            <div className='events'>
              <h3>งานลดราคา</h3>

              <div className='mobile'>
                <Loader loading={loadingEvents} loaderSize>
                  {!events.isEmpty() ? (
                    events.slice(0, 2).map((event, i) => {
                      return (
                        <div className='column' computer={4} mobile={8} key={i}>
                          <EventCard event={event} />
                        </div>
                      )
                    })
                  ) : (
                    <p>ไม่มีงานลดราคา</p>
                  )}
                </Loader>
              </div>

              <div className='desktop'>
                {!events.isEmpty() ? (
                  events.slice(0, 5).map((event, i) => {
                    return (
                      <div className='column' key={i}>
                        <EventCard event={event} />
                      </div>
                    )
                  })
                ) : (
                  <p>ไม่มีงานลดราคา</p>
                )}
              </div>
            </div>

            {/* <UserMessage
              handleClickChat={this.handleClickChat}
              showChat={this.state.showChat}
              seller={product && product.get('owner')}
              user={this.props.user}
            /> */}
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Product
