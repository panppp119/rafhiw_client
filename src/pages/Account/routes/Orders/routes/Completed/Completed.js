import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable'

import './Completed.scss';

class Completed extends React.Component {
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

    var completed =
      orders.filter(
        o => o.get('products').find(p =>
          p.get('status') === 'completed' ||
          p.get('status') === 'pending_review'
        )
      ) || List();

    return (
      <div className="tab completed">
        <OrderTable
          complete
          orders={completed}
          review={this.props.review}
          loadOrders={this.props.loadOrders}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default Completed;
