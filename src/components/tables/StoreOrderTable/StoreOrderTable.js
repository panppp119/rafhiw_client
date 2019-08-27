import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

import Img from 'components/Img';
import PriceConvert from 'components/converts/PriceConvert';

import './StoreOrderTable.scss';

const initialState = {
  review: false,
  product_id: 0,
  seller_id: 0,
  order_id: 0
};

class StoreOrderTable extends React.Component {
  static defaultProps = {
    products: List()
  };

  state = initialState;

  cancel = () => {
    if (window.confirm('ยืนยันที่จะยกเลิกคำสั่งซื้อนี้')) {
      this.props
        .cancel(this.props.order.get('id'), this.props.user.get('id'))
        .then(() => {
          this.props.loadOrders({ user_id: this.props.user.get('id') });
        });
    }
  };

  payment = e => {
    this.props.updateOrderId(this.props.order.get('id'));
    this.props.history.push('/checkout');
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
        this.setState(initialState);
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

  handleChange (name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const { products, order, payment, status, track } = this.props;

    return (
      <div className="store-order-table">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
              {track && <th>หมายเลขติดตามสินค้า</th>}
              {status && <th>สถานะ/แอคชัน</th>}
            </tr>
          </thead>
          <tbody>
            {!products.isEmpty() &&
              products.map((product, i) => {
                const option = product.get('option') || Map();
                const pd = product.get('product') || Map();
                const shipment_type = product.get('shipment_type');

                const tag = product.get('status');
                var label = '';
                var type = '';

                switch (tag) {
                  case 2:
                    label = 'รอตรวจสอบการชำระสินค้า';
                    break;
                  case 3:
                    label = 'รอการจัดส่ง';
                    break;
                  case 4:
                    label = 'รอยืนยันการรับสินค้า';
                    break;
                  case 5:
                    label = 'รอการรีวิว';
                    break;
                  case 6:
                    label = 'คำสั่งซื้อเสร็จสมบูรณ์';
                    break;
                  default:
                    break;
                }

                switch (shipment_type) {
                  case 1:
                    type = 'ไปรษณีย์ไทย';
                    break;
                  case 2:
                    type = 'Kerry';
                    break;
                  default:
                    break;
                }

                return (
                  <tr key={i}>
                    <td>
                      <Img
                        alt={pd.get('name') + option.get('name')}
                        src={product.get('image')}
                      />
                      <div className="info">
                        <Link to={`/p/${pd.get('id')}`}>
                          <h4>
                            {pd.get('name')} ({option.get('name')})
                          </h4>
                        </Link>
                      </div>
                    </td>
                    <td>{product.get('quantity')}</td>
                    <td><PriceConvert price={order.get('total_amt')} /></td>
                    {track && <td>{product.get('tracking_id')} - {type}</td>}
                    {status && (
                      <td>
                        {tag === 4 ? (
                          <button className='primary'
                            onClick={() =>
                              this.acceptProduct(product.get('id'))
                            }
                          >
                            ได้รับสินค้าแล้ว
                          </button>
                        ) : tag === 5 ? (
                          <button className='primary'
                            onClick={() =>
                              this.showReview(
                                pd.get('id'),
                                pd.get('seller_id'),
                                product.get('id')
                              )
                            }
                          >
                            รีวิว
                          </button>
                        ) : (
                          <p>{label}</p>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            }

            {payment && (
              <tr>
                <td colSpan="3">
                  <button className='primary' onClick={this.payment}>
                    ชำระสินค้า
                  </button>
                  <button className='error' onClick={this.cancel}>
                    ยกเลิกคำสั่งซื้อ
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StoreOrderTable;
