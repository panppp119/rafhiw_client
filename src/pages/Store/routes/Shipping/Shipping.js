import React from 'react';

import StoreOrderTable from 'components/tables/StoreOrderTable';

import './Shipping.scss';

class Shipping extends React.Component {
  // componentDidMount() {
  //   !this.props.user.isEmpty() &&
  //     this.props.loadOrders(this.props.user.get('id'));
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
  //     this.props.loadOrders(this.props.user.get('id'));
  //   }
  // }

  render() {
    // const { orders, user } = this.props;
    //
    // const orderList = orders.filter(
    //   order =>
    //     order.get('status') === 2 ||
    //     order.get('status') === 3 ||
    //     order.get('status') === 4
    // );

    return (
      <div className="shipping">
        {/* <StoreOrderTable
          track
          state
          orders={orderList}
          user={user}
          updateTrackingId={this.props.updateTrackingId}
          loadOrders={this.props.loadOrders}
        /> */}
        <StoreOrderTable />
      </div>
    );
  }
}

export default Shipping;
