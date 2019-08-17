import React from 'react';

import StoreOrderTable from 'components/tables/StoreOrderTable';

import './Payment.scss';

class Payment extends React.Component {
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
    // const { orders } = this.props;
    //
    // const orderList = orders.filter(order => order.get('status') === 1);

    return (
      <div className="payment section">
        {/* <StoreOrderTable orders={orderList} /> */}
        <StoreOrderTable />
      </div>
    );
  }
}

export default Payment;
