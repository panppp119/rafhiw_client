import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import UserLayout from 'components/layouts/UserLayout'
import {
  Active,
  Events,
  Income,
  OutOfStock,
  Products,
  Shipping,
  Succeeded,
  Payment
} from './routes';

import './Store.scss'

class Store extends React.Component {
  render () {
    const { match } = this.props;

    return (
      <UserLayout>
        <div id="store-page">
          <div className="container">
            <div className="tab mobile">
              <select id="">
                <option value="default">งานของฉัน</option>
                <option value="products">สินค้าทั้งหมด</option>
                <option value="active">ขายอยู่</option>
                <option value="out_of_stock">สินค้าหมด</option>
                <option value="pending_payment">ค้างชำระ</option>
                <option value="shipping">ที่ต้องจัดส่ง</option>
                <option value="succeeded">สำเร็จแล้ว</option>
              </select>
            </div>
            
            <div className="tab desktop">
              <ul>
                <li><Link to='/store'>งานของฉัน</Link></li>
                <li><Link to='/store/products'>สินค้าทั้งหมด</Link></li>
                <li><Link to='/store/active'>ขายอยู่</Link></li>
                <li><Link to='/store/out_of_stock'>สินค้าหมด</Link></li>
                <li><Link to='/store/pending_payment'>ค้างชำระ</Link></li>
                <li><Link to='/store/shipping'>ที่ต้องจัดส่ง</Link></li>
                <li><Link to='/store/succeeded'>สำเร็จแล้ว</Link></li>
                <li><Link to='/store/income'>รายรับของฉัน</Link></li>
              </ul>
            </div>

            <div className="content">
              <Switch>
                <Route
                  exact
                  path={match.url}
                  render={() => <Events {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/products`}
                  render={() => <Products {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/active`}
                  render={() => <Active {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/out_of_stock`}
                  render={() => <OutOfStock {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/pending_payment`}
                  render={() => <Payment {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/shipping`}
                  render={() => <Shipping {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/succeeded`}
                  render={() => <Succeeded {...this.props} />}
                />
                <Route
                  exact
                  path={`${match.url}/income`}
                  render={() => <Income {...this.props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Store
