import React from 'react';

import IncomeTable from 'components/tables/IncomeTable';
import PriceConvert from 'components/converts/PriceConvert';

import './Income.scss';

class Income extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() &&
      this.props.loadOrders(this.props.user.get('id'));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadOrders(this.props.user.get('id'));
    }
  }

  render() {
    const { orders } = this.props;

    const orderList = orders.filter(order =>
      order.get('status') === 'pending_review' ||
      order.get('status') === 'completed'
    );

    const ors_paid = orderList.filter(o => o.get('paid') === 1);
    const ors_wait = orderList.filter(o => o.get('paid') === 0);

    var total = 0;

    ors_paid.map(order => {
      const option = order.get('product_option') || Map()
      const price = option.get('discount_amt') !== 0 ?
        option.get('discount_amt') :
        option.get('price_amt')

      return total += order.get('quantity') * (
        price + option.get('hiw_amt') + option.get('ship_amt')
      )
    });


    return (
      <div className="income">
        <div className="total-income">
          <h2>รายรับทั้งหมด</h2>
          <h1 className='overall'><PriceConvert price={total} /></h1>
        </div>

        <div className="income-list">
          <div className="wait">
            <h3>ที่ต้องได้รับ</h3>
            <IncomeTable orderList={ors_wait} />
          </div>

          <div className="receive">
            <h3>ได้รับเงินแล้ว</h3>
            <IncomeTable orderList={ors_paid} />
          </div>
        </div>
      </div>
    );
  }
}

export default Income;
