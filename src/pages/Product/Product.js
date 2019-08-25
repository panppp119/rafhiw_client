import React, { Fragment } from 'react';
import ImageGallery from 'react-image-gallery';
// import Numeral from 'numeral';
import { List } from 'immutable';
import { FaPlus, FaMinus } from 'react-icons/fa'

// import UserMessage from 'components/messages/UserMessage';
// import Breadcrumbs from 'components/Breadcrumbs';
import CountdownTimer from 'components/CountdownTimer';
import PriceConvert from 'components/converts/PriceConvert';
import EventCard from 'components/cards/EventCard';
import ProductCard from 'components/cards/ProductCard';
import Img from 'components/Img';
import UserLayout from 'components/layouts/UserLayout'

import './Product.scss';

class Product extends React.Component {
  state = {
    quantity: 1,
    option: 0,
    products: [],
    totalQuantity: 0,
    showChat: false
  };

  componentDidMount() {
    const { user } = this.props;
    const id = this.props.match.params.id;

    this.props.loadProduct(id);
    !user.isEmpty() && this.props.loadCart();

    this.props.events.isEmpty() && this.props.loadEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadCart(this.props.user.get('id'));
    }
  }

  handleClickChat = bool => {
    this.setState({ showChat: bool });
  };

  addProduct = (e) => {
    const {
      createCart,
      updateCart,
      cart,
      user,
      product
    } = this.props;
    const { quantity, product_option_id } = this.state;
    const name = e.target.name
    const products = cart.get('products') || List()

    var poId = product_option_id || product.getIn(['options', 0, 'id']);
    var stock = product.getIn(['options', 0, 'stock']);

    const pd = {
      quantity: quantity,
      product_option_id: poId,
      product_id: product.get('id')
    };

    if (user.isEmpty()) {
      this.props.history.push('/sign_in')
      console.log(1)
    } else if (cart.isEmpty()) {
      console.log(2)
      createCart({
        products: cart.get('products') || [pd],
        totalQuantity: cart.get('total_qt') + quantity || quantity,
        user_id: user.get('id')
      });
    } else {
      console.log(3, cart.toJS())

      if (products.findIndex(pd => pd.get('product_option_id') === poId) !== -1) {
        var index = products.findIndex(pd => pd.get('product_option_id') === poId)
        var productQt = products.getIn([index, 'quantity']) || 0

        productQt += quantity
        console.log('3-1', productQt)

        if (productQt > stock) {
          alert('ของในคลังสินค้าไม่เพียงพอ');
          console.log('3-1-1')
        }
        else {
          console.log('3-1-2')
          updateCart(cart.get('id'), {
            products: products.size > 0 ? products : [pd],
            totalQuantity:
              cart.get('totalQuantity') + quantity || quantity,
            user_id: user.get('id')
          });

          if (name === 'buy') {
            this.props.history.push('/cart');
          }
        }
      }
      else {
        console.log('3-2')
        // products.push(pd)
      }
      // var pds =
      //   (!cartProducts.isEmpty() && cartProducts.get('products')) || List();
      // var index = pds && pds.findIndex(p => p.product_option_id === poId);
      //
      // if (index !== -1) {
      //   pds[index].quantity += quantity;
      // } else {
      //   pds.push(pd);
      // }
      //
      // if (index !== -1 && pds[index].quantity > stock) {
      //   alert('ของในคลังสินค้าไม่เพียงพอ');
      // } else {
      //   updateCart(cart.get('id'), {
      //     products: pds.length > 0 ? pds : [pd],
      //     totalQuantity:
      //       cartProducts.get('totalQuantity') + quantity || quantity,
      //     user_id: user.get('id')
      //   });
      //
      //   if (name === 'buy') {
      //     this.props.history.push('/cart');
      //   }
      // }
    }
  };

  decreaseQuantity(e, stock, id) {
    const quantity = this.state.quantity - 1;

    this.setState({
      quantity: quantity <= 1 ? 1 : quantity,
      product_option_id: id
    });
  }

  increaseQuantity(e, stock, id) {
    const quantity = this.state.quantity + 1;

    this.setState({
      quantity: quantity > stock ? stock : quantity,
      product_option_id: id
    });
  }

  handleSelectOption(e, key) {
    e.preventDefault();

    this.setState({
      option: key,
      quantity: 1,
      product_option_id: e.target.name
    });
  }

  render() {
    const { product, events, products } = this.props;
    const { quantity } = this.state;

    const options = (!product.isEmpty() && product.get('options')) || List();
    const attachments = (!product.isEmpty() && product.get('images')) || List();

    // const sections = [
    //   {
    //     title: product.getIn(['category', 'name']),
    //     path: `/c/${product.getIn(['category', 'slug'])}`,
    //     link: true
    //   },
    //   {
    //     title: product.getIn(['sub_category', 'name']),
    //     path: `/c/${product.getIn(['category', 'slug'])}/${product.getIn([
    //       'sub_category',
    //       'slug'
    //     ])}`,
    //     link: true
    //   },
    //   { title: product.get('name') }
    // ];

    const images = attachments
      .map(attachment => ({
        original: attachment.get('image'),
        thumbnail: attachment.get('image')
      }))
      .toJS();

    return (
      <UserLayout>
        <div id="product-page">
          {/* <Breadcrumbs sections={sections} /> */}
          <div className="container">
            <div className="product">
              <div className="column">
                <ImageGallery items={images} showPlayButton={false} autoPlay />

                <div className="owner">
                  <div className="avatar">
                    <Img
                      src={product.getIn(['owner', 'image'])}
                      alt={product.getIn(['owner', 'first_name'])}
                    />
                  </div>

                  <div className="info">
                    <h4>
                      {product.getIn(['owner', 'first_name'])}{' '}
                      {product.getIn(['owner', 'last_name'])}
                    </h4>

                    {/* <Rating
                      icon="star"
                      disabled
                      rating={Numeral(product.getIn(['owner', 'rating'])).format(
                        '0,0'
                      )}
                      maxRating={5}
                    /> */}

                    {/* <Button
                      content="แชท"
                      onClick={() => this.handleClickChat(true)}
                    /> */}
                  </div>
                </div>
              </div>

              <div className="column">
                <table>
                  <tbody>
                    <tr>
                      <td><h3>{product.get('name')}</h3></td>
                      <td><CountdownTimer item={product} /></td>
                    </tr>

                    <tr>
                      <td><h4>หมวดหมู่สินค้า</h4></td>
                      <td>
                        {product.getIn(['category', 'name'])} /{' '}
                        {product.getIn(['sub_category', 'name'])}
                      </td>
                    </tr>

                    <tr>
                      <td><h4>ชื่องาน</h4></td>
                      <td>{product.getIn(['event', 'name'])}</td>
                    </tr>

                    <tr>
                      <td><h4>รายละเอียด</h4></td>
                      <td>{product.get('description')}</td>
                    </tr>

                    <tr>
                      <td><h4>ที่ตั้ง</h4></td>
                      <td>
                        <a
                          href={`https://maps.google.com/?q=${product.getIn([
                            'event',
                            'location',
                            'lat'
                          ])},${product.getIn(['event', 'location', 'lng'])}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product.getIn(['event', 'location', 'name'], '')}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan='2' className='option'>
                        {options.map((option, i) => {
                          return (
                            <button name={option.get('id')}
                              className={this.state.option === i ? 'primary' : 'option'}
                              key={i}
                              onClick={(e) =>
                                this.handleSelectOption(e, i)
                              }
                            >
                              {option.get('name')}
                            </button>
                          );
                        })}
                      </td>
                    </tr>

                    {options.map((option, i) => {
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
                                    className="price"
                                    style={{ textDecoration: 'line-through' }}
                                  >
                                    <PriceConvert
                                      price={option.get('price_amt')}
                                    />
                                  </span>
                                  <span className="discount">
                                    <PriceConvert
                                      price={option.get('discount_amt')}
                                    />
                                  </span>
                                </Fragment>
                              ) : (
                                <span>
                                  <PriceConvert
                                    price={option.get('price_amt')}
                                  />
                                </span>
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <h4>จำนวน</h4>
                            </td>
                            <td>
                              <div className="quantity-input">
                                <button disabled={quantity === 1}
                                  className='primary'
                                  onClick={(e) =>
                                    this.decreaseQuantity(
                                      e,
                                      option.get('stock'),
                                      option.get('id')
                                    )
                                  }
                                >
                                  <FaMinus />
                                </button>

                                <input type="number" disabled value={quantity} />

                                <button disabled={quantity === option.get('stock')}
                                  className='primary'
                                  onClick={(e) =>
                                    this.increaseQuantity(
                                      e,
                                      option.get('stock'),
                                      option.get('id')
                                    )
                                  }
                                >
                                  <FaPlus />
                                </button>

                                <span>
                                  มีสินค้าทั้งหมด {option.get('stock') || 0} ชิ้น
                                </span>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ) : null;
                    })}
                  </tbody>
                </table>

                <div className="actions">
                  <button className='primary' onClick={this.addProduct}>
                    เพิ่มไปยังรถเข็น
                  </button>
                  <button className='primary' onClick={this.addProduct}>
                    ซื้อสินค้า
                  </button>
                </div>
              </div>

            </div>

            <div className="products">
              <h3>สินค้าใกล้เคียง</h3>

              <div className="mobile">
                {!products.isEmpty() && products.length > 1 ? (
                  products
                    .filter(
                      p =>
                        p.get('id' !== product.get('id')) &&
                        p.get('category_id') === product.get('category_id')
                    )
                    .slice(0, 2)
                    .map((product, i) => {
                      return (
                        <div className="column" key={i}>
                          <ProductCard product={product} user={this.props.user} />
                        </div>
                      );
                    })
                ) : (
                  <p>ไม่มีสินค้าใกล้เคียง</p>
                )}
              </div>

              <div className="desktop">
                {!products.isEmpty() && products.length > 1 ? (
                  products
                    .filter(
                      p =>
                        p.get('id' !== product.get('id')) &&
                        p.get('category_id') === product.get('category_id')
                    )
                    .slice(0, 5)
                    .map((product, i) => {
                      return (
                        <div className="column" key={i}>
                          <ProductCard product={product} user={this.props.user} />
                        </div>
                      );
                    })
                ) : (
                  <p>ไม่มีสินค้าใกล้เคียง</p>
                )}
              </div>
            </div>

            <div className="events">
              <h3>งานลดราคา</h3>

              <div className="mobile">
                {!events.isEmpty() ? (
                  events.slice(0, 2).map((event, i) => {
                    return (
                      <div className='column' computer={4} mobile={8} key={i}>
                        <EventCard event={event} />
                      </div>
                    );
                  })
                ) : (
                  <p>ไม่มีงานลดราคา</p>
                )}
              </div>

              <div className="desktop">
                {!events.isEmpty() ? (
                  events.slice(0, 5).map((event, i) => {
                    return (
                      <div className='column' key={i}>
                        <EventCard event={event} />
                      </div>
                    );
                  })
                ) : (
                  <p>ไม่มีงานลดราคา</p>
                )}
              </div>
            </div>


            {/* <UserMessage
              handleClickChat={this.handleClickChat}
              showChat={this.state.showChat}
              seller={product.get('owner')}
              user={this.props.user}
            /> */}
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Product;
