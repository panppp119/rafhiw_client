import React from 'react';
import { Map } from 'immutable';

import SellerForm from 'components/forms/SellerForm';

import './Seller.scss';

class Seller extends React.Component {
  static defaultProps = {
    requestSeller: Map()
  };

  componentDidMount() {
    this.props.loadRequestRole();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="seller">
        <div className="head">
          <h3 className="ui header">ยืนยันตัวตนผู้ขาย</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">
          {this.props.requestSeller.isEmpty() ? (
            <SellerForm
              user={user}
              requestRole={this.props.requestRole}
              // loading={this.props.loadingRequest}
              addAttachment={this.props.addAttachment}
              // loadingAttachment={this.props.loadingAttachment}
              {...this.props}
            />
          ) : (
            <p>รอการยืนยัน</p>
          )}
        </div>
      </div>
    );
  }
}

export default Seller;
