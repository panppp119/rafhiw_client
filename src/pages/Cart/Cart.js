import React, { Fragment } from 'react';
import Moment from 'moment';
import { List } from 'immutable';
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
    if (this.props.user.get('id')) {
      this.props.cart.isEmpty() && this.props.loadCart();
    } else {
      this.props.loadCart();
    }
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

  removeProduct = (e, { name }) => {
    const {
      cart,
      user,
      removeProduct,
      updateCart,
      updateCartProducts
    } = this.props;

    const cartProducts = cart.get('products') || List();
    const option_id = name;

    const index = cartProducts
      .toJS()
      .findIndex(product => product.product_option_id === option_id);

    var cpId, qt;

    if (index >= 0) {
      cpId = cartProducts.toJS()[index].id;
      qt = cartProducts.get(index).get('quantity');
    }

    if (window.confirm('ยืนยันที่จะลบสินค้านี้ใช่หรือไม่?')) {
      const quantity =
        cart.get('total_quantity') - qt < 0
          ? 0
          : cart.get('total_quantity') - qt;

      const products = cartProducts.splice(1, index);

      removeProduct(cart.get('id'), { user_id: user.get('id'), cp_id: cpId });
      updateCart(cart.get('id'), {
        totalQuantity: quantity,
        user_id: user.get('id')
      });

      updateCartProducts({ products: products, totalQuantity: quantity });
    }
  };

  decreaseQuantity = (e, { name }) => {
    const {
      cart,
      user,
      updateCart,
      removeProduct,
      updateCartProducts
    } = this.props;

    const cps = cart.get('products') || List();
    const option_id = name;

    cps.toJS().forEach((cp, i) => {
      if (cp.option.id === option_id) {
        cp.quantity--;

        var pds = [],
          qt = 1;

        if (cp.quantity < 1) {
          if (window.confirm('ยืนยันที่จะลบสินค้านี้ใช่หรือไม่?')) {
            removeProduct(cart.get('id'), {
              user_id: user.get('id'),
              cp_id: cp.id
            });

            updateCart(cart.get('id'), {
              totalQuantity: cart.get('total_quantity') - qt,
              user_id: user.get('id')
            });

            updateCartProducts({
              totalQuantity: cart.get('total_quantity') - qt
            });
          }
        } else {
          pds.push({
            product_option_id: cp.option.id,
            quantity: cp.quantity
          });

          updateCart(cart.get('id'), {
            products: pds,
            totalQuantity:
              cart.get('total_quantity') === 1
                ? 1
                : cart.get('total_quantity') - qt,
            user_id: user.get('id')
          });
        }
      }
    });
  };

  increaseQuantity = (e, { name }) => {
    const { cart, user, updateCart } = this.props;

    const cartProducts = cart.get('products') || List();
    const option_id = name;

    var pds = [],
      qt = 1;

    cartProducts.toJS().forEach(cp => {
      if (cp.option.id === option_id) {
        cp.quantity++;

        if (cp.quantity > cp.option.stock) {
          cp.quantity = cp.stock;
          qt = 0;
        } else {
          pds.push({
            product_option_id: cp.option.id,
            quantity: cp.quantity
          });

          updateCart(cart.get('id'), {
            products: pds,
            totalQuantity: cart.get('total_quantity') + qt,
            user_id: user.get('id')
          });
        }
      }
    });
  };

  checkout(e, pause, total) {
    e.preventDefault();

    const cart = this.props.cart.toJS();

    const data = {
      ...cart,
      user_id: this.props.user.get('id'),
      total_amount: parseInt(total)
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
    const { cart } = this.props;

    var total = 0;
    var hiw_amount = 0;
    var ship_amount = 0;
    var price_amount = 0;

    const cartProducts = cart.get('products') || List();

    var pause =
      cartProducts.filter(cp =>
        Moment(cp.getIn(['product', 'end_date'])).isBefore(Moment())
      ).size !== 0;

    return (
      <UserLayout>
        <div id="cart-page">
          <div className='container'>
            {/* <div className="address" /> */}

            <div className="cart-products">
              <table>
                <thead>
                  <tr>
                    <td>สินค้า (ตัวเลือก)</td>
                    <td>ราคาต่อชิ้น</td>
                    <td>จำนวน</td>
                    <td>ราคารวม</td>
                    <td>แอคชัน</td>
                  </tr>
                </thead>

                <tbody>
                  {!cartProducts.isEmpty() ? (
                    cartProducts.map((cp, i) => {
                      var product = cp.get('product') || Map();
                      var name_th = product.get('name_th');
                      var quantity = cp.get('quantity');
                      var option = cp.get('option') || Map();
                      var price =
                        option.get('discount_amount') === 0
                          ? option.get('price_amount')
                          : option.get('discount_amount');
                      var sub_total = price * quantity;
                      var outofdate = Moment(product.get('end_date')).isBefore(
                        Moment()
                      );

                      total += outofdate ? 0 : sub_total;
                      hiw_amount = outofdate ? 0 : option.get('hiw_amount');
                      ship_amount = outofdate ? 0 : option.get('ship_amount');

                      price_amount = total;

                      return (
                        <tr key={i}
                          style={{
                            backgroundColor: outofdate && 'floralwhite'
                          }}
                        >
                          <td>
                            <img
                              src={cp.getIn(['attachments', 0, 'image'])}
                              alt={product.get('name_th') + option.get('name')}
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
                                    {name_th} ({option.get('name')})
                                  </span>
                                  <span className="error">หมดเวลา</span>
                                </Fragment>
                              ) : (
                                <Link to={`/products/${product.get('id')}`}>
                                  {name_th} ({option.get('name')})
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
                                name={option.get('id')}
                                disabled={outofdate}
                                onClick={this.decreaseQuantity}
                              >
                                <FaMinus />
                              </button>

                              <input type="number" disabled value={quantity} />

                              <button
                                name={option.get('id')}
                                disabled={
                                  quantity === option.get('stock') || outofdate
                                }
                                onClick={this.increaseQuantity}
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
                      <td><h3>ไม่มีสินค้าในตะกร้า</h3></td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="cart-total">
                <div className="price">
                  <span>ราคารวมสินค้า</span>
                  <h4>
                    <PriceConvert price={price_amount} />
                  </h4>
                </div>

                <div className="hiw">
                  <span>ค่าบริการหิ้ว</span>
                  <h4>
                    <PriceConvert price={hiw_amount} />
                  </h4>
                </div>

                <div className="shipment">
                  <span>ค่าบริการจัดส่ง</span>
                  <h4>
                    <PriceConvert price={ship_amount} />
                  </h4>
                </div>

                <div className="total">
                  <span>
                    รวมสินค้าทั้งหมด ({cart.get('total_quantity')} ชิ้น)
                  </span>
                  <h3>
                    <PriceConvert price={total + hiw_amount + ship_amount} />
                  </h3>
                </div>
              </div>
            </div>

            <div className="payment">
              <div className="column">
                {this.state.checkout && (
                  <div className="transfer">
                    <h3>ช่องทางการชำระเงิน</h3>
                  </div>
                )}
              </div>

              <div className="column">
                <div className="submit-order">
                  <button
                    disabled={cartProducts.size === 0 || pause}
                    onClick={e => this.checkout(e, pause, total)}
                  >
                    สั่งซื้อสินค้า
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Cart;
