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
    const { orders, shipper, complete } = this.props;

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

                return (
                  <tr key={i}>
                    <td>{order.get('number')}</td>
                    <td>
                      <ul>
                        {
                          products.map((pd, si) => {
                            const option = pd.get('option') || Map()
                            const product = pd.get('product') || Map()
                            const shipment_type = product.get('shipment_type');

                            const tag = product.get('status');
                            var label = '';
                            var type = '';

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
