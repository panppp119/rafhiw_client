import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';
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
    tracking_id: '',
    shipment_type: 0
  }

  handleChange (name, value, i) {
    this.setState({ [name]: value, index: i });
  }

  handleClick (id, key) {
    const { tracking_id, shipment_type } = this.state;

    this.setState({ index: null });

    if (
      (tracking_id !== null ||
      tracking_id !== '') &&
      shipment_type !== 0
    ) {
      this.props
        .updateTrackingId(id, {
          tracking_code: tracking_id,
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
    const { tracking_id, shipment_type } = this.state;

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
              orders.map((order, i) => {
                const products = order.get('products') || List()
                const status = order.get('status')

                return products.map((pd, si) => {
                  const option = pd.get('option') || Map()
                  const product = pd.get('product') || Map()

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
                    <tr key={si}>
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
                      <td>{order.get('total_qt')}</td>
                      <td>
                        <PriceConvert
                          price={pd.get('quantity') * (
                            option.get('discount_amt') !== 0 ?
                              option.get('discount_amt') :
                              option.get('price_amt')
                          )} />
                      </td>
                      {
                        shipper && <td>Address</td>
                      }
                      {shipper && (
                        <td>
                          <input type="text"
                            name="tracking_id"
                            value={
                              (this.state.index === i && tracking_id) ||
                              (order.get('tracking_code') || '')
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
                              (order.get('shipment_type') || '')
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

                          {status === 'pending_shipping' && (
                            <button className='primary'
                              onClick={() => this.handleClick(order.get('id'), i)}
                              disabled={
                                tracking_id === '' ||
                                tracking_id === null ||
                                tracking_id === undefined ||
                                shipment_type === null ||
                                shipment_type === undefined
                              }
                            >
                              <FaCheck />
                            </button>
                          )}
                        </td>
                      )}
                      <td>{tag}</td>
                    </tr>
                  )
                })
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default StoreOrderTable;
