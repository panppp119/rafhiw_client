import React from 'react';
// import { List } from 'immutable';

// import OrderTable from 'components/tables/OrderTable';

import './History.scss';

class History extends React.Component {
  // componentDidMount() {
  //   !this.props.user.isEmpty() && this.props.loadOrders();
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
  //     !this.props.user.isEmpty() && this.props.loadOrders();
  //   }
  // }

  render() {
    // const { user, orders } = this.props;

    // const orderSize = orders.size;
    // const pendingPayment = orders.filter(o => o.get('status') === 1) || List();
    // const shipment =
    //   orders.filter(
    //     o =>
    //       o.get('status') === 2 ||
    //       o.get('status') === 3 ||
    //       o.get('status') === 4
    //   ) || List();
    // const cancel = orders.filter(o => o.get('status') === 6) || List();

    // const panes = [
    //   {
    //     menuItem: 'ค้างชำระ',
    //     render: () => (
    //       <Tab.Pane>
    //         {pendingPayment.size > 0 ? (
    //           pendingPayment.map((order, i) => {
    //             const products = order.get('products') || List();
    //
    //             return (
    //               <OrderTable
    //                 payment
    //                 products={products}
    //                 order={order}
    //                 key={i}
    //                 user={user}
    //                 loadOrders={this.props.loadOrders}
    //                 history={this.props.history}
    //                 updateOrderId={this.props.updateOrderId}
    //                 cancel={this.props.cancel}
    //               />
    //             );
    //           })
    //         ) : (
    //           <p>ไม่มีออเดอร์</p>
    //         )}
    //       </Tab.Pane>
    //     )
    //   },
    //   {
    //     menuItem: 'การจัดส่งสินค้า',
    //     render: () => (
    //       <Tab.Pane>
    //         {shipment.size !== 0 ? (
    //           shipment.map((order, i) => {
    //             const products = order.get('products') || List();
    //
    //             return (
    //               <OrderTable
    //                 status
    //                 track
    //                 user={user}
    //                 confirm={this.props.confirm}
    //                 products={products}
    //                 order={order}
    //                 key={i}
    //                 loadOrders={this.props.loadOrders}
    //               />
    //             );
    //           })
    //         ) : (
    //           <p>ไม่มีออเดอร์</p>
    //         )}
    //       </Tab.Pane>
    //     )
    //   },
    //   {
    //     menuItem: 'สำเร็จ',
    //     render: () => (
    //       <Tab.Pane>
    //         {!orders.isEmpty() ? (
    //           orders.map((order, i) => {
    //             const products = order.get('products') || List();
    //
    //             const pds =
    //               products.filter(
    //                 pd => pd.get('status') === 5 || pd.get('status') === 7
    //               ) || List();
    //
    //             if (pds.isEmpty()) {
    //               return null;
    //             } else {
    //               return (
    //                 <OrderTable
    //                   status
    //                   products={pds}
    //                   order={order}
    //                   user={user}
    //                   review={this.props.review}
    //                   loadOrders={this.props.loadOrders}
    //                   key={i}
    //                 />
    //               );
    //             }
    //           })
    //         ) : (
    //           <p>ไม่มีออเดอร์</p>
    //         )}
    //       </Tab.Pane>
    //     )
    //   },
    //   {
    //     menuItem: 'ยกเลิก/หมดอายุ',
    //     render: () => (
    //       <Tab.Pane>
    //         {cancel.size > 0 ? (
    //           cancel.map((order, i) => {
    //             const products = order.get('products') || List();
    //
    //             return <OrderTable products={products} order={order} key={i} />;
    //           })
    //         ) : (
    //           <p>ไม่มีออเดอร์</p>
    //         )}
    //       </Tab.Pane>
    //     )
    //   }
    // ];

    return (
      <div className="history">
        <div className="head">
          <h3>ข้อมูลการซื้อขาย</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">
          {/* <Dimmer inverted active={user.isEmpty() && this.props.loadingUser}>
            <Loader inverted />
          </Dimmer> */}

          {/* <Tab panes={panes} /> */}
        </div>
      </div>
    );
  }
}

export default History;
