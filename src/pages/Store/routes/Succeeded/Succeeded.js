import React from 'react';

import StoreOrderTable from 'components/tables/StoreOrderTable';

import './Succeeded.scss';

class Succeeded extends React.Component {
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
    // const orderList = orders.filter(
    //   order => order.get('status') === 5 || order.get('status') === 7
    // );

    return (
      <div className="succeeded section">
        {/* <StoreOrderTable state orders={orderList} /> */}
        <StoreOrderTable />
      </div>
    );
  }
}

export default Succeeded;
