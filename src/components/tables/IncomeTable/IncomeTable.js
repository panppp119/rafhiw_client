import React from 'react';
import { Link } from 'react-router-dom';

import Img from 'components/Img';
import PriceConvert from 'components/converts/PriceConvert';

import './IncomeTable.scss';

const initialState = {
  index: null
};

class IncomeTable extends React.Component {
  state = initialState;

  render() {
    const { orderList, receipt } = this.props;

    return (
      <div className="income-table table-responsive">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>ราคา</th>
              <th>สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {!orderList.isEmpty() ? (
              orderList.map((order, i) => {
                const product = order.get('product') || Map();
                const option = order.get('product_option') || Map();
                const discount = option.get('discount_amt') || 0
                var price = discount !== 0 ? discount : option.get('price_amt')
                var totalPrice = price + option.get('hiw_amt') + option.get('ship_amt')

                return (
                  <tr key={i}>
                    <td>
                      <Img
                        alt={product.get('name') + option.get('name')}
                        src={product.get('image')}
                      />
                      <div className="info">
                        <Link to={`/products/${product.get('id')}`}>
                          <h4>
                            {product.get('name')} ({option.get('name')})
                          </h4>
                        </Link>
                      </div>
                    </td>

                    <td><PriceConvert price={order.get('quantity') * totalPrice} /></td>
                    <td>{order.get('paid') ? 'ทำรายการเรียบร้อย': 'รอทำรายการ'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>ยังไม่มีรายการ</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IncomeTable;
