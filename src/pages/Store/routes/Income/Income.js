import React from 'react';
// import { Tab } from 'semantic-ui-react';
//
// import IncomeTable from 'components/tables/IncomeTable';
// import PriceConvert from 'components/converts/PriceConvert';

import './Income.scss';

class Income extends React.Component {
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
    // const orderList = orders.filter(order => order.get('status') === 7);
    //
    // var total = 0;
    //
    // orderList.map(order => {
    //   return (total += order.get('total_amount'));
    // });
    //
    // const panes = [
    //   {
    //     menuItem: 'ที่ต้องได้รับ',
    //     render: () => {
    //       const ors = orderList.filter(o => o.get('paid') === 0);
    //
    //       return (
    //         <Tab.Pane>
    //           <IncomeTable orderList={ors} />
    //         </Tab.Pane>
    //       );
    //     }
    //   },
    //   {
    //     menuItem: 'ได้รับแล้ว',
    //     render: () => {
    //       const ors = orderList.filter(o => o.get('paid') === 1);
    //
    //       return (
    //         <Tab.Pane>
    //           <IncomeTable orderList={ors} />
    //         </Tab.Pane>
    //       );
    //     }
    //   }
    // ];

    return (
      <div className="income section">
        <div className="total-income">
          <h1>รายรับทั้งหมด</h1>
          <h1>
            {/* <PriceConvert price={total} /> */}
          </h1>
        </div>

        <div className="income-list">
          {/* <Tab panes={panes} /> */}
        </div>
      </div>
    );
  }
}

export default Income;
