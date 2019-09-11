import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

import Img from 'components/Img';
import PriceConvert from 'components/converts/PriceConvert'
import Modal from 'components/Modal'
import ReviewForm from 'components/forms/ReviewForm'

import './OrderTable.scss';

class OrderTable extends React.Component {
  static defaultProps = {
    shipper: false,
    payment: false,
    complete: false,
    cancel: false
  }

  state = {
    activeReview: false
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

  confirm = (e) => {
    const id = parseInt(e.target.name)

    this.props.confirm(id)
  }

  review (order_id, seller_id) {
    this.setState({
      activeReview: true,
      order_id,
      seller_id
    })
  }

  payment = (e) => {
    this.props.updateOrderId(e.target.name);
    this.props.history.push('/checkout');
  };

  render() {
    const { orders, shipper, payment, complete, cancel } = this.props

    return (
      <div className="order-table table-responsive">
        {
          this.state.activeReview && (
            <Modal>
              <ReviewForm
                order_id={this.state.order_id}
                seller_id={this.state.seller_id}
                user={this.props.user}
              />
            </Modal>
          )
        }

        <table>
          <thead>
            <tr>
              <th>หมายเลขสั่งซื้อ</th>
              <th>สินค้า</th>
              <th>จำนวน</th>
              {(payment || cancel) && <th>ราคารวม</th>}
              {shipper && <th>หมายเลขติดตามพัสดุ</th>}
              <th>สถานะ</th>
              {(payment || shipper || complete) && <th>แอคชัน</th>}
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, i) => {
                const products = order.get('products') || List()
                const status = order.get('status')
                var tag = ''

                switch (status) {
                  case 'pending_payment':
                    tag = "รอการชำระเงิน"
                    break;
                  case 'pending_check_payment':
                    tag = "รอตรวจสอบการชำระเงิน"
                    break;
                  case 'cancelled':
                    tag = "ยกเลิก"
                    break;
                  default:
                    break;
                }

                if (status === 'pending_payment' || status === 'pending_check_payment' || status === 'cancelled') {
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
                      <td>{tag}</td>
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
                    </tr>
                  )
                }
                else {
                  return products.map((pd, si) => {
                    const option = pd.get('option') || Map()
                    const product = pd.get('product') || Map()
                    const state = pd.get('status')

                    switch (state) {
                      case 'pending_shipping':
                        tag = "รอการจัดส่ง"
                        break;
                      case 'pending_receive_goods':
                        tag = "รอยืนยันการรับของ"
                        break;
                      case 'pending_review':
                        tag = "รอการรีวิว"
                        break;
                      case 'completed':
                        tag = "เสร็จสิ้น"
                        break;
                      default:
                        break;
                    }

                    return (
                      <tr key={si}>
                        <td>{order.get('number')}</td>
                        <td>
                          <Img
                            alt={product.get('name') + option.get('name')}
                            src={pd.get('image')}
                          />
                          <div className="info">
                            <Link to={`/p/${pd.get('id')}`}>
                              <h4>{product.get('name')} - {option.get('name')}</h4>
                            </Link>
                          </div>
                        </td>
                        <td>{pd.get('quantity')}</td>
                        {shipper && (
                          <td>
                            {
                              pd.get('status') === 'pending_receive_goods' ? (
                                pd.get('shipment_type') === 1 ?
                                  `ไปรษณีย์ไทย - ${pd.get('tracking_code')}` :
                                  `kerry - ${pd.get('tracking_code')}`
                              ) : (
                                <p>-</p>
                              )
                            }
                          </td>
                        )}
                        <td>{tag}</td>
                        {shipper && (
                          <td>
                            <button name={pd.get('id')}
                              className='primary'
                              onClick={this.confirm}
                              disabled={order.get('status') !== 'pending_receive_goods'}
                            >
                              ยืนยันรับของ
                            </button>
                          </td>
                        )}
                        {complete && (
                          <td>
                            <button name={pd.get('id')}
                              className='primary'
                              onClick={() => this.review(
                                pd.get('id'),
                                pd.get('seller_id')
                              )}
                            >
                              รีวิว
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  })
                }
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
