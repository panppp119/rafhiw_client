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

  cancel = () => {
    if (window.confirm('ยืนยันที่จะยกเลิกคำสั่งซื้อนี้')) {
      this.props
        .cancel(this.props.order.get('id'), this.props.user.get('id'))
        .then(() => {
          this.props.loadOrders({ user_id: this.props.user.get('id') });
        });
    }
  };

  acceptProduct(id) {
    if (window.confirm('ยืนยันสินค้า')) {
      this.props.confirm(id).then(() => {
        this.props.loadOrders({ user_id: this.props.user.get('id') });
      });
    }
  }

  review = e => {
    this.props
      .review({
        product_id: this.state.product_id,
        seller_id: this.state.seller_id,
        rating: this.state.rating,
        user_id: this.props.user.get('id'),
        order_id: this.state.order_id,
        comment: this.state.comment
      })
      .then(() => {
        this.props.loadOrders({ user_id: this.props.user.get('id') });
        this.setState({ index: null });
      });
  };

  showReview(product_id, seller_id, order_id) {
    this.setState({
      review: true,
      product_id,
      seller_id,
      order_id
    });
  }

  handleChange (name, value, i) {
    this.setState({ [name]: value, index: i });
  }

  handleClick(id, key) {
    const { tracking_id } = this.state;

    this.setState({ index: null });

    if (
      tracking_id !== null ||
      tracking_id !== '' ||
      tracking_id !== undefined
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
    const { tracking_id, shipment_type, index } = this.state;

    const shipment_options = [
      { key: 0, text: 'ไปรษณีย์ไทย', value: 1 },
      { key: 1, text: 'Kerry', value: 2 }
    ];

    console.log(index, tracking_id, shipment_type)

    return (
      <div className="store-order-table">
        <table>
          <thead>
            <tr>
              <th>หมายเลขสั่งซื้อ</th>
              <th>สินค้า</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
              {shipper && <th>หมายเลขติดตามสินค้า</th>}
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, i) => {
                const products = order.get('products') || List()
                const status = order.get('status')

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
                    <td>{order.get('status')}</td>
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
