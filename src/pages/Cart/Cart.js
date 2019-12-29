import React, { Fragment } from 'react';
import Moment from 'moment';
import { List, Map } from 'immutable';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

import UserLayout from 'components/layouts/UserLayout';
import PriceConvert from 'components/converts/PriceConvert';

import './Cart.scss';

class Cart extends React.Component {
  state = {
    checkout: false,
    payment: null
  };

  componentDidMount() {
    this.props.loadCart();
    this.props.loadAddresses();
  }

  componentWillReceiveProps(nextProps) {
    const cartProducts = this.props.cart.products;

    if (nextProps.cart.products !== cartProducts) {
      this.removeProduct(nextProps.cart.products);
    }
  }

  handleClickPayment = (e, { name }) => {
    this.setState({ payment: name });
  };

  selectAddress = e => {
    this.setState({ address_id: parseInt(e.target.value) })
  }

  removeProduct = (e) => {
    const {
      cart,
      user,
      removeProduct
    } = this.props;

    const cartProducts = cart.get('products') || List();
    const option_id = parseInt(e.target.name);

    const index = cartProducts
      .findIndex(product => product.get('product_option_id') === option_id);

    var cpId, qt, totalQt = 0;

    cartProducts.map(p => {
      return totalQt += p.get('quantity')
    })

    if (index !== -1) {
      cpId = cartProducts.getIn([index, 'id']);
      qt = cartProducts.getIn([index, 'quantity']) || 0;

      if (window.confirm('ยืนยันที่จะลบสินค้านี้ใช่หรือไม่?')) {
        removeProduct(cart.get('id'), {
          user_id: user.get('id'),
          cp_id: cpId,
          cart_qt: totalQt - qt
        });
      }
    }
  };

  decreaseQuantity (option_id) {
    const {
      cart,
      user,
      updateCart,
      removeProduct,
    } = this.props;

    const cps = cart.get('products') || List();
    const index = cps.findIndex(cp => cp.getIn(['option', 'id']) === option_id)
    const cp = cps.get(index)
    const totalQt = cart.get('total_qt') || 0
    const qt = 1
    var quantity = cp.get('quantity')
    var pd = {}

    quantity--

    pd = {
      product_id: cp.get('product_id'),
      product_option_id: option_id,
      quantity: qt
    };

    if (quantity <= 0) {
      if (window.confirm('ยืนยันที่จะลบสินค้านี้ใช่หรือไม่?')) {
        removeProduct(cart.get('id'), {
          user_id: user.get('id'),
          cp_id: cp.get('id'),
          cart_qt: totalQt - qt
        });
      }
    }
    else {
      updateCart(cart.get('id'), {
        product: pd,
        cart_qt: totalQt,
        quantity: -qt,
        user_id: user.get('id')
      });
    }
  };

  increaseQuantity (option_id) {
    const { cart, user, updateCart } = this.props;

    const cps = cart.get('products') || List();
    const index = cps.findIndex(cp => cp.getIn(['option', 'id']) === option_id)
    const cp = cps.get(index)
    const stock = cp.getIn(['product', 'stock'])
    const totalQt = cp.get('total_qt')
    const qt = 1
    var quantity = cp.get('quantity')
    var pd = {}

    quantity++

    pd = {
      product_id: cp.get('product_id'),
      product_option_id: option_id,
      quantity: qt
    };

    if (quantity > stock) {
      quantity = stock

      updateCart(cart.get('id'), {
        product: pd,
        cart_qt: totalQt,
        quantity: qt,
        user_id: user.get('id')
      });
    }
    else {
      updateCart(cart.get('id'), {
        product: pd,
        cart_qt: cart.get('total_qt') || 0,
        quantity: qt,
        user_id: user.get('id')
      });
    }
  };

  checkout(e, pause, total) {
    e.preventDefault();

    const cart = this.props.cart.toJS();
    const address = this.props.addresses.find(ad => ad.get('id') === this.state.address_id) || this.props.addresses.get(0)
    const long_address = `${address.get('address')}, ${address.get('sub_district')}, ${address.get('district')}, ${address.get('province')}, ${address.get('zip_code')}`

    const data = {
      ...cart,
      user_id: this.props.user.get('id'),
      total_amt: parseInt(total),
      address: long_address
    };

    if (pause) {
      alert('ไม่สามารถทำการสั่งซื้อได้เนื่องจากมีบางรายการหมดเวลาแล้ว');
    } else {
      this.setState({ checkout: true });

      this.props.createOrder(data).then(() => {
        this.props.loadCart();
        this.props.history.push('/checkout');
      });
    }
  }

  render() {
    const { cart, addresses } = this.props;

    var total = 0;
    var hiw_amt = 0;
    var ship_amt = 0;
    var price_amt = 0;

    const cartProducts = cart.get('products') || List();

    var pause =
      cartProducts.filter(cp =>
        Moment(cp.getIn(['product', 'end_date'])).isBefore(Moment())
      ).size !== 0;

    return (
      <UserLayout>
        <div id="cart-page">
          <div className='container'>
            <div className="addresses">
              <h4>เลือกที่อยู่ในการจัดส่ง</h4>
              {
                !addresses.isEmpty() ? addresses.map((address, i) => {
                  return (
                    <p key={i}>
                      <input type="radio"
                        name='address_id'
                        value={address.get('id')}
                        checked={this.state.address_id === address.get('id') || i === 0}
                        onClick={this.selectAddress}
                      />
                      {address.get('address')}, {address.get('sub_district')}, {address.get('district')}, {address.get('province')}, {address.get('zip_code')}
                    </p>
                  )
                }) : (
                  <button className='primary' onClick={() => this.props.history.push('/account/addresses')}>
                    เพิ่มที่อยู่
                  </button>
                )
              }
            </div>

            <div className="cart-products">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>สินค้า (ตัวเลือก)</th>
                      <th>ราคาต่อชิ้น</th>
                      <th>จำนวน</th>
                      <th>ราคารวม</th>
                      <th>แอคชัน</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!cartProducts.isEmpty() ? (
                      cartProducts.map((cp, i) => {
                        var product = cp.get('product') || Map();
                        var name = product.get('name');
                        var quantity = cp.get('quantity');
                        var option = cp.get('option') || Map();
                        var price =
                          option.get('discount_amt') === 0
                            ? option.get('price_amt')
                            : option.get('discount_amt');
                        var sub_total = price * quantity;
                        var total_hiw = option.get('hiw_amt') * quantity
                        var total_ship = option.get('ship_amt') * quantity
                        var outofdate = Moment(product.get('end_date')).isBefore(
                          Moment()
                        );

                        total += outofdate ? 0 : sub_total;
                        hiw_amt += outofdate ? 0 : total_hiw;
                        ship_amt += outofdate ? 0 : total_ship;

                        price_amt = total;

                        return (
                          <tr key={i}
                            style={{
                              backgroundColor: outofdate && 'floralwhite'
                            }}
                          >
                            <td>
                              <img
                                src={cp.get('image')}
                                alt={name + option.get('name')}
                              />
                              <span>
                                {outofdate ? (
                                  <Fragment>
                                    <span
                                      style={{
                                        textDecoration: 'line-through',
                                        marginRight: 7
                                      }}
                                    >
                                      {name} ({option.get('name')})
                                    </span>
                                    <span className="error">หมดเวลา</span>
                                  </Fragment>
                                ) : (
                                  <Link to={`/p/${product.get('id')}`}>
                                    {name} ({option.get('name')})
                                  </Link>
                                )}
                              </span>
                            </td>

                            <td>
                              <p><PriceConvert price={price} /></p>
                            </td>

                            <td>
                              <div className="quantity-input">
                                <button
                                  className='primary'
                                  disabled={outofdate}
                                  onClick={() => this.decreaseQuantity(option.get('id'))}
                                >
                                  <FaMinus />
                                </button>

                                <input type="number" disabled value={quantity} />

                                <button
                                  className='primary'
                                  name={option.get('id')}
                                  disabled={
                                    quantity === option.get('stock') || outofdate
                                  }
                                  onClick={() => this.increaseQuantity(option.get('id'))}
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </td>

                            <td>
                              <p><PriceConvert price={sub_total} /></p>
                            </td>

                            <td>
                              <button
                                className='error'
                                name={option.get('id')}
                                onClick={this.removeProduct}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan='5'><p className='no-item'>ไม่มีสินค้าในตะกร้า</p></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="cart-total">
                <div className="price">
                  <span>ราคารวมสินค้า</span>
                  <h4>
                    <PriceConvert price={price_amt} />
                  </h4>
                </div>

                <div className="hiw">
                  <span>ค่าบริการหิ้ว</span>
                  <h4>
                    <PriceConvert price={hiw_amt} />
                  </h4>
                </div>

                <div className="shipment">
                  <span>ค่าบริการจัดส่ง</span>
                  <h4>
                    <PriceConvert price={ship_amt} />
                  </h4>
                </div>

                <div className="total">
                  <span>
                    ราคารวมทั้งหมด (สินค้า {cart.get('total_qt')} ชิ้น)
                  </span>
                  <h3>
                    <PriceConvert price={total + hiw_amt + ship_amt} />
                  </h3>
                </div>
              </div>
            </div>

            <div className="payment">
              <button className='primary'
                disabled={cartProducts.size === 0 || pause}
                onClick={e => this.checkout(e, pause, total + hiw_amt + ship_amt)}
              >
                สั่งซื้อสินค้า
              </button>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Cart;
