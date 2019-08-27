import React from 'react';

import StoreOrderTable from 'components/tables/StoreOrderTable';

import './Shipping.scss';

class Shipping extends React.Component {
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
    const { orders, user } = this.props;

    const orderList = orders.filter(
      order =>
        order.get('status') === 'pending_shipping' ||
        order.get('status') === 'pending_receive_goods'
    );

    return (
      <div className="shipping">
        <StoreOrderTable
          track
          state
          orders={orderList}
          user={user}
          updateTrackingId={this.props.updateTrackingId}
          loadOrders={this.props.loadOrders}
        />
      </div>
    );
  }
}

export default Shipping;
