import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable';

import './PendingPayment.scss';

class PendingPayment extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadOrders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      !this.props.user.isEmpty() && this.props.loadOrders();
    }
  }

  render() {
    const { orders, cancelOrder, loadOrders, updateOrderId } = this.props;

    const pendingPayment = orders.filter(
      o => o.get('status') === 'pending_payment' || o.get('status') === 'pending_check_payment'
    ) || List();

    return (
      <div className="tab pending-payment">
        <OrderTable
          payment
          orders={pendingPayment}
          cancelOrder={cancelOrder}
          loadOrders={loadOrders}
          updateOrderId={updateOrderId}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default PendingPayment;
