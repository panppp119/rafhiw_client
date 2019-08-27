import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable';

import './Cancelled.scss';

class Cancelled extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadOrders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      !this.props.user.isEmpty() && this.props.loadOrders();
    }
  }

  render() {
    const { orders } = this.props;

    const cancel = orders.filter(o => o.get('status') === 'cancelled') || List();

    return (
      <div className="tab cancelled">
        <OrderTable
          orders={cancel}
        />
      </div>
    );
  }
}

export default Cancelled;
