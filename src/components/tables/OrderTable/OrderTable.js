import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { fromJS, Map } from 'immutable';
import GroupBy from 'lodash.groupby'

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

  confirm = (id) => e => {
    this.props.confirm(id)
  }

  review (order_id, seller_id, product_option_id) {
    this.setState({
      activeReview: true,
      order_id,
      seller_id,
      product_option_id
    })

    console.log(order_id, seller_id, product_option_id);
  }

  close = e => {
    this.setState({ activeReview: false })
  }

  payment = (e) => {
    this.props.updateOrderId(e.target.name);
    this.props.history.push('/checkout');
  };

  render() {
    const { orders, shipper, payment, complete, cancel } = this.props

    const group = GroupBy(orders.toJS(), 'order_id')
    const groupOrderId = fromJS(Object.values(group))

    return (
      <div className="order-table table-responsive">
        {
          this.state.activeReview && (
            <Modal close={this.close}>
              <ReviewForm
                order_id={this.state.order_id}
                seller_id={this.state.seller_id}
                product_option_id={this.state.product_option_id}
                user={this.props.user}
                review={this.props.review}
                close={this.close}
                loadOrders={this.props.loadOrders}
              />
            </Modal>
          )
        }

        <table>
          <thead>
            <tr>
              <th>หมายเลขสั่งซื้อ</th>
              <th>สินค้า</th>
              {(payment || cancel) && <th>ราคารวม</th>}
              {shipper && <th>หมายเลขติดตามพัสดุ</th>}
              <th>สถานะ</th>
              {(payment || shipper || complete) && <th>แอคชัน</th>}
            </tr>
          </thead>
          <tbody>
            {
              (payment || cancel) &&  groupOrderId.map((group, i) => {
                const order = group.getIn([0, 'order']) || Map()
                var tag1 = ''

                switch (order.get('status')) {
                  case 'pending_payment':
                    tag1 = "รอการชำระเงิน"
                    break;
                  case 'pending_check_payment':
                    tag1 = "รอตรวจสอบการชำระเงิน"
                    break;
                  case 'cancelled':
                    tag1 = "ยกเลิก"
                    break;
                  default:
                    break;
                }

                return (
                  <tr key={i}>
                    <td>{order.get('number')}</td>
                    <td>
                      <ul>
                        {
                          group.map((item, si) => {
                            const option = item.get('product_option') || Map()
                            const product = item.get('product') || Map()

                            return (
                              <li key={si}>
                                <Img
                                  alt={product.get('name') + option.get('name')}
                                  src={product.get('image')}
                                />
                                <div className="info">
                                  <Link to={`/p/${product.get('id')}`}>
                                    <h4>{product.get('name')} - {option.get('name')} (x{item.get('quantity')})</h4>
                                  </Link>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </td>
                    <td><PriceConvert price={order.get('total_amt')} /></td>
                    <td>{tag1}</td>
                    {payment && (
                      <td>
                        {
                          order.get('status') === 'pending_payment' && (
                            <Fragment>
                              <button name={order.get('id')}
                                className='primary'
                                onClick={this.payment}
                                style={{ marginBottom: 8 }}
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
                          )
                        }
                      </td>
                    )}
                  </tr>
                )
              })
            }
            {
              (shipper || complete) && orders.map((item, i) => {
                const order = item.get('order') || Map()
                const option = item.get('product_option') || Map()
                const product = item.get('product') || Map()
                var tag2 = ''

                switch (item.get('status')) {
                  case 'pending_shipping':
                    tag2 = "รอการจัดส่ง"
                    break;
                  case 'pending_receive_goods':
                    tag2 = "รอยืนยันการรับของ"
                    break;
                  case 'pending_review':
                    tag2 = "รอการรีวิว"
                    break;
                  case 'completed':
                    tag2 = "เสร็จสิ้น"
                    break;
                  default:
                    break;
                }

                return (
                  <tr key={i}>
                    <td>{order.get('number')}</td>
                    <td>
                      <Img
                        alt={product.get('name') + option.get('name')}
                        src={product.get('image')}
                      />
                      <div className="info">
                        <Link to={`/p/${product.get('id')}`}>
                          <h4>{product.get('name')} - {option.get('name')} (x{item.get('quantity')})</h4>
                        </Link>
                      </div>
                    </td>
                    {shipper && (
                      <td>
                        {
                          item.get('status') === 'pending_receive_goods' ? (
                            item.get('shipment_type') === 1 ?
                              `ไปรษณีย์ไทย - ${item.get('tracking_code')}` :
                              `kerry - ${item.get('tracking_code')}`
                          ) : (
                            <p>-</p>
                          )
                        }
                      </td>
                    )}
                    <td>{tag2}</td>
                    {
                      shipper && (
                        <td>
                          {
                            item.get('status') === 'pending_receive_goods' && (
                              <button className='primary' onClick={this.confirm(item.get('id'))}>
                                ยืนยันได้รับสินค้า
                              </button>
                            )
                          }
                        </td>
                      )
                    }
                    {complete && (
                      <td>
                        {
                          item.get('status') !== 'completed' && (
                            <button
                              className='primary'
                              onClick={() => this.review(
                                order.get('id'),
                                product.get('seller_id'),
                                option.get('id')
                              )}
                            >
                              รีวิว
                            </button>
                          )
                        }
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
