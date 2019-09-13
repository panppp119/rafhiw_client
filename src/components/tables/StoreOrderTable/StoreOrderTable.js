import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, Map } from 'immutable';
import { FaCheck } from 'react-icons/fa'

import Img from 'components/Img';
import PriceConvert from 'components/converts/PriceConvert';

import './StoreOrderTable.scss';

class StoreOrderTable extends React.Component {
  static defaultProps = {
    products: List()
  };

  state = {
    index: null,
    tracking_code: '',
    shipment_type: 0
  }

  handleChange (name, value, i) {
    this.setState({ [name]: value, index: i });
  }

  handleClick (id, option_id, key) {
    const { tracking_code, shipment_type } = this.state;

    this.setState({ index: null });

    if (
      (tracking_code !== null ||
      tracking_code !== '') &&
      shipment_type !== 0
    ) {
      this.props
        .updateTrackingId(id, {
          product_option_id: option_id,
          tracking_code: tracking_code,
          shipment_type: this.state.shipment_type
        })
        .then(() => {
          this.props.loadOrders(this.props.user.get('id'));
          this.setState({ index: null });
        });
    }
  }

  render() {
    const { orders, shipper } = this.props;
    const { tracking_code, shipment_type } = this.state;

    const shipment_options = [
      { key: 0, text: 'ไปรษณีย์ไทย', value: 1 },
      { key: 1, text: 'Kerry', value: 2 }
    ];

    return (
      <div className="store-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
              {shipper && <th>ที่อยู่</th>}
              {shipper && <th>หมายเลขติดตามสินค้า</th>}
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((item, i) => {
                const product = item.get('product') || Map()
                const option = item.get('product_option') || Map()
                const order = item.get('order') || Map()
                const status = item.get('status')
                const discount = option.get('discount_amt') || 0
                var price = discount !== 0 ? discount : option.get('price_amt')

                price += option.get('hiw_amt') + option.get('ship_amt')

                var tag = ''

                switch (status) {
                  case 'pending_payment':
                    tag = "รอการชำระเงิน"
                    break;
                  case 'pending_check_payment':
                    tag = "รอตรวจสอบการชำระเงิน"
                    break;
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
                  case 'cancelled':
                    tag = "ยกเลิก"
                    break;
                  default:
                    break;
                }

                return (
                  <tr key={i}>
                    <td>
                      <Img
                        alt={product.get('name') + option.get('name')}
                        src={product.get('image')}
                      />
                      <div className="info">
                        <Link to={`/p/${product.get('id')}`}>
                          <h4>{product.get('name')} - {option.get('name')}</h4>
                        </Link>
                      </div>
                    </td>
                    <td>{item.get('quantity')}</td>
                    <td>
                      <PriceConvert price={item.get('quantity') * price} />
                    </td>
                    {
                      shipper && (
                        <Fragment>
                          <td>
                            <h4>{order.get('name')}</h4>
                            <p>{order.get('address')}</p>
                          </td>
                          <td>
                            <input type="text"
                              name="tracking_code"
                              value={
                                (this.state.index === i && tracking_code) ||
                                (item.get('tracking_code') || '')
                              }
                              autoComplete="false"
                              onChange={(e) => this.handleChange(e.target.name, e.target.value, i)}
                              disabled={status !== 'pending_shipping'}
                            />

                            <select name="shipment_type"
                              disabled={status !== 'pending_shipping'}
                              onChange={(e) => this.handleChange(e.target.name, e.target.value, i)}
                              value={
                                (this.state.index === i && shipment_type) ||
                                (item.get('shipment_type') || '')
                              }
                            >
                              <option default>บริการขนส่ง</option>
                              {
                                shipment_options.map((so, sii) => {
                                  return (
                                    <option value={so.value} key={sii}>{so.text}</option>
                                  )
                                })
                              }
                            </select>

                            {(status === 'pending_shipping' || status === 'pending_receive_goods') && (
                              <button className='primary'
                                onClick={() => this.handleClick(order.get('id'), option.get('id'), i)}
                                disabled={
                                  tracking_code === '' ||
                                  tracking_code === null ||
                                  tracking_code === undefined ||
                                  shipment_type === null ||
                                  shipment_type === undefined
                                }
                              >
                                <FaCheck />
                              </button>
                            )}
                          </td>
                        </Fragment>
                      )
                    }
                    <td>{tag}</td>
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

export default StoreOrderTable;
