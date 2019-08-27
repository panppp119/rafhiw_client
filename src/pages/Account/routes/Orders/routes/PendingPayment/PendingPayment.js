import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable';

import './PendingPayment.scss';

class PendingPayment extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadOrders();
  }

  render() {
    const { orders, cancelOrder } = this.props;

    const pendingPayment = orders.filter(
      o => o.get('status') === 'pending_payment' || o.get('status') === 'pending_check_payment'
    ) || List();

    return (
      <div className="tab pending-payment">
        <OrderTable
          payment
          orders={pendingPayment}
          cancelOrder={cancelOrder}
        />
      </div>
    );
  }
}

export default PendingPayment;
