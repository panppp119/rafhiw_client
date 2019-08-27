import React from 'react';
import { List } from 'immutable';

import OrderTable from 'components/tables/OrderTable';

import './Completed.scss';

class Completed extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadOrders();
  }

  render() {
    const { user, orders } = this.props;

    const completed = orders.filter(
      o => o.get('status') === 'completed' || o.get('status') === 'pending_review'
    ) || List();

    return (
      <div className="tab completed">
        <OrderTable
          completed
          orders={completed}
          user={user}
          review={this.props.review}
          loadOrders={this.props.loadOrders}
        />
      </div>
    );
  }
}

export default Completed;
