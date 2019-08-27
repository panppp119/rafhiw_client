import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

import Img from 'components/Img';
import PriceConvert from 'components/converts/PriceConvert'

import './OrderTable.scss';

class OrderTable extends React.Component {
  static defaultProps = {
    shipper: false,
    payment: false,
    complete: false,
    cancel: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  cancel = (e) => {
    const id = parseInt(e.target.name)

    if (window.confirm('ยืนยันที่จะยกเลิกคำสั่งซื้อนี้')) {
      this.props.cancelOrder(id).then(() => {
        this.props.loadOrders()
      })
    }
  }

  payment = e => {
    this.props.updateOrderId(e.target.name);
    this.props.history.push('/checkout');
  };

  render() {
    const { orders, shipper, payment, complete } = this.props

    return (
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>หมายเลขสั่งซื้อ</th>
              <th>สินค้า</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
              {shipper && <th>หมายเลขติดตามพัสดุ</th>}
              <th>สถานะ</th>
              {(payment || shipper || complete) && <th>แอคชัน</th>}
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, i) => {
                const products = order.get('products') || List()

                return (
                  <tr key={i}>
                    <td>{order.get('number')}</td>
                    <td>
                      <ul>
                        {
                          products.map((pd, si) => {
                            const option = pd.get('option') || Map()
                            const product = pd.get('product') || Map()

                            return (
                              <li key={si}>
                                <Img
                                  alt={product.get('name') + option.get('name')}
                                  src={pd.get('image')}
                                />
                                <div className="info">
                                  <Link to={`/p/${pd.get('id')}`}>
                                    <h4>{product.get('name')} - {option.get('name')}</h4>
                                  </Link>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </td>
                    <td>{order.get('total_qt')}</td>
                    <td><PriceConvert price={order.get('total_amt')} /></td>
                    {shipper && <td>พัสดุ</td>}
                    <td>{order.get('status')}</td>
                    {payment && (
                      <td>
                        {
                          order.get('status') === 'pending_payment' ? (
                            <Fragment>
                              <button name={order.get('id')}
                                className='primary'
                                onClick={this.payment}
                              >
                                ชำระเงิน
                              </button>
                              <button name={order.get('id')}
                                className='error'
                                onClick={this.cancel}
                              >
                                ยกเลิก
                              </button>
                            </Fragment>
                          ) : null
                        }
                      </td>
                    )}
                    {(shipper || complete) && (
                      <td>
                        <button name={order.get('id')}
                          className='error'
                          onClick={this.cancel}
                        >
                          ยกเลิก
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
