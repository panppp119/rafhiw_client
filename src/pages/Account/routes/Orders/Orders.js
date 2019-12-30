import React from 'react';
import ClassNames from 'classnames'
import { Switch, Route, Link } from 'react-router-dom'
import { List } from 'immutable'

import { PendingPayment, Shipment, Completed, Cancelled } from './routes'

import './Orders.scss';

class Orders extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadOrders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      !this.props.user.isEmpty() && this.props.loadOrders();
    }
  }

  render() {
    const { location, orders } = this.props;

    const pathname = location.pathname

    const pendingPayment = orders.filter(
      o => o.get('status') === 'pending_payment' || o.get('status') === 'pending_check_payment'
    ) || List();

    const shipment =
      orders.filter(
        o => o.get('status') === 'pending_shipping' ||
        o.get('status') === 'pending_receive_goods'
      ) || List();

    return (
      <div className="orders">
        <div className="head">
          <h3>ข้อมูลการซื้อขาย</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">
          <div className="order-tab">
            <div className="tab-nav">
              <ul>
                <li className={ClassNames({ active: pathname === '/account/orders' })}>
                  <Link to='/account/orders'>รอการชำระ ({pendingPayment.size})</Link>
                </li>
                <li className={ClassNames({ active: pathname === '/account/orders/shipment' })}>
                  <Link to='/account/orders/shipment'>การจัดส่ง ({shipment.size})</Link>
                </li>
                <li className={ClassNames({ active: pathname === '/account/orders/completed' })}>
                  <Link to='/account/orders/completed'>สำเร็จ</Link>
                </li>
                <li className={ClassNames({ active: pathname === '/account/orders/cancelled' })}>
                  <Link to='/account/orders/cancelled'>ยกเลิก</Link>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              <Switch>
                <Route exact
                  path='/account/orders'
                  render={() => <PendingPayment {...this.props} />}
                />
                <Route
                  path='/account/orders/shipment'
                  render={() => <Shipment {...this.props} />}
                />
                <Route
                  path='/account/orders/completed'
                  render={() => <Completed {...this.props} />}
                />
                <Route
                  path='/account/orders/cancelled'
                  render={() => <Cancelled {...this.props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
