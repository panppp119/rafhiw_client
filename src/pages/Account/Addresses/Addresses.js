import React from 'react';

import AddressForm from 'components/forms/AddressForm';

import './Addresses.scss';

class Addresses extends React.Component {
  state = {
    showAddressForm: false
  };

  // componentDidMount() {
  //   this.props.addresses.isEmpty() &&
  //     this.props.loadAddresses({ user_id: this.props.user.get('id') });
  // }
  //
  // handleClick = e => {
  //   this.setState({ showAddressForm: true });
  // };
  //
  // removeAddress(id) {
  //   if (window.confirm('ยืนยันที่จะลบที่อยู่นี้ใช่หรือไม่')) {
  //     this.props.deleteAddress(id).then(res => {
  //       this.props.loadAddresses();
  //     });
  //   }
  // }
  //
  // cancel = () => {
  //   this.setState({ showAddressForm: false });
  // };

  render() {
    const { addresses, createAddress } = this.props;
    const { showAddressForm } = this.state;

    return (
      <div className="addresses">
        <div className="head">
          <h3>ที่อยู่ของฉัน</h3>
          <p>จัดการที่อยู่เพื่อใช้ในการจัดส่งสินค้า</p>
        </div>

        <div className="body">

        </div>
      </div>
    );
  }
}

export default Addresses;
