import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable';

import './Shipment.scss';

class Shipment extends React.Component {
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

    const shipment =
      orders.filter(
        o => o.get('status') === 'pending_shipping' ||
        o.get('status') === 'pending_receive_goods'
      ) || List();

    return (
      <div className="tab shipment">
        <OrderTable
          shipper
          orders={shipment}
          loadOrders={this.props.loadOrders}
          confirm={this.props.confirm}
        />
      </div>
    );
  }
}

export default Shipment;
