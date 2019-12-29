import React from 'react'
import ImageGallery from 'react-image-gallery';
import { List } from 'immutable'
import { Link } from 'react-router-dom'
import { FaShoppingBasket } from 'react-icons/fa'

import UserLayout from 'components/layouts/UserLayout'
import PriceConvert from 'components/converts/PriceConvert'
import { EventCard, ProductCard } from 'components/cards'

import './Home.scss'

class Home extends React.Component {
  state = {
    category: null
  }

  componentDidMount () {
    this.props.categories.isEmpty() && this.props.loadCategories()
    this.props.loadProducts()
    this.props.loadEvents()
    this.props.loadHighlight()
  }

  handleChange = (e) => {
    this.setState({ category: e.target.value })
  }

  onPushCategory = () => {
    this.state.category !== null && this.props.history.push(`/c/${this.state.category}`)
  }

  render () {
    const { categories, events, products, highlight } = this.props

    const images = highlight
      .map(image => ({
        original: image.get('image'),
        thumbnail: image.get('image')
      }))
      .toJS();

    return (
      <UserLayout>
        <div id="home-page">
          <div className="container">
            <div className="row">
              <div className="categories desktop">
                <h3>หมวดหมู่</h3>

                <ul className='cats'>
                  {
                    categories.map((category, i) => {
                      const sub_categories = category.get('sub_categories') || List()

                      return (
                        <li key={i}>
                          <Link to={`/c/${category.get('slug')}`}>
                            {category.get('name')}
                          </Link>

                          <ul className='sub-cats'>
                            {
                              sub_categories.map((sub_category, si) => {
                                return (
                                  <li key={si}>
                                    <Link to={`/sc/${sub_category.get('slug')}`}>
                                      {sub_category.get('name')}
                                    </Link>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>

              <div className="highlight">
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  autoPlay
                  slideInterval={7000}
                  showFullscreenButton={false}
                  showNav={false}
                  showThumbnails={false}
                  showBullets={true}
                />
              </div>

              <div className="categories mobile">
                <h3>หมวดหมู่</h3>

                <div className='scroll-responsive'>
                  <div className="categories-menu">
                    {
                      categories.map((category, i) => {
                        return (
                          <Link to={`/c/${category.get('slug')}`} key={i}>
                            <FaShoppingBasket /><br />
                            {category.get('name')}
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              <div className="recommended">
                <h3>สินค้าแนะนำ</h3>

                <div className="recommended-products">
                  {
                    products.slice(0, 4).map((product, i) => {
                      const options = product.get('options') || List()
                      var noItem = options.filter(opt => opt.get('stock') <= 0).size > 0

                      return (
                        <div className="product" key={i}>
                          <Link to={`/p/${product.get('id')}`}>
                            <div className="image"
                              aria-label={product.get('name')}
                              style={{ backgroundImage: `url(${product.get('image')})` }}
                            >
                              {
                                noItem && (
                                  <div className="no-item">
                                    สินค้าหมด
                                  </div>
                                )
                              }
                            </div>

                            <div className="info">
                              <h4>{product.get('name')}</h4>
                              <p>
                                <span
                                  className="price"
                                  style={{ textDecoration: 'line-through' }}
                                >
                                  <PriceConvert price={
                                    (options.getIn([0, 'price_amt']) +
                                    options.getIn([0, 'hiw_amt']) +
                                    options.getIn([0, 'ship_amt'])) + (
                                      (options.getIn([0, 'price_amt']) +
                                      options.getIn([0, 'hiw_amt']) +
                                      options.getIn([0, 'ship_amt'])) * (15 / 100)
                                    )
                                  } />
                                </span>

                                <span className='discount'>
                                  <PriceConvert price={
                                    (options.getIn([0, 'discount_amt']) +
                                    options.getIn([0, 'hiw_amt']) +
                                    options.getIn([0, 'ship_amt'])) + (
                                      (options.getIn([0, 'discount_amt']) +
                                      options.getIn([0, 'hiw_amt']) +
                                      options.getIn([0, 'ship_amt'])) * (15 / 100)
                                    )
                                  } />
                                </span>
                              </p>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="row">
              <div className="events">
                <h3>งานลดราคา<Link to='/events'>เพิ่มเติม</Link></h3>

                <div className="mobile">
                  {
                    !events.isEmpty() ? events.map((event, i) => {
                      return (
                        <div className="column" key={i}>
                          <EventCard event={event} />
                        </div>
                      )
                    }) : <p className='no-item'>ไม่มีงาน</p>
                  }
                </div>

                <div className="desktop">
                  {
                    !events.isEmpty() ? events.map((event, i) => {
                      return (
                        <div className="column" key={i}>
                          <EventCard event={event} />
                        </div>
                      )
                    }) : <p className='no-item'>ไม่มีงาน</p>
                  }
                </div>
              </div>
            </div>

            <div className="row">
              <div className="products">
                <h3>สินค้า<Link to='/products'>เพิ่มเติม</Link></h3>

                <div className="mobile">
                  {
                    !products.isEmpty() ? products.map((product, i) => {
                      return (
                        <div className="column" key={i}>
                          <ProductCard product={product} />
                        </div>
                      )
                    }) : <p className='no-item'>ไม่มีสินค้า</p>
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
                    }) : <p className='no-item'>ไม่มีสินค้า</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Home
