import React from 'react';

import IncomeTable from 'components/tables/IncomeTable';
import PriceConvert from 'components/converts/PriceConvert';

import './Income.scss';

class Income extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() &&
      this.props.loadOrders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadOrders();
    }
  }

  render() {
    const { orders } = this.props;

    const orderList = orders.filter(order =>
      order.get('status') === 'review' ||
      order.get('status') === 'completed'
    );

    const ors_paid = orderList.filter(o => o.get('paid') === 1);
    const ors_wait = orderList.filter(o => o.get('paid') === 0);

    var total = 0;

    orderList.map(order => {
      return (total += order.get('total_amount'));
    });


    return (
      <div className="income">
        <div className="total-income">
          <h1>รายรับทั้งหมด</h1>
          <h1><PriceConvert price={total} /></h1>
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
