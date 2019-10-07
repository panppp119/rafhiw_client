import React from 'react';

import StoreOrderTable from 'components/tables/StoreOrderTable';

import './Succeeded.scss';

class Succeeded extends React.Component {
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

    const orderList = orders.filter(
      order => order.get('status') === 'pending_review' ||
      order.get('status') === 'completed'
    );

    return (
      <div className="succeeded">
        <StoreOrderTable succeeded orders={orderList} />
      </div>
    );
  }
}

export default Succeeded;
