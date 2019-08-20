import React from 'react';

import './AddressForm.scss';

class AddressForm extends React.Component {
  state = {
    sameAddress: false
  };

  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSend = e => {
    e.preventDefault();

    const { user } = this.props;

    const address = {
      ...this.state,
      user_id: user.get('id')
    };
    delete address['sameAddress'];

    this.props.createAddress(address).then(res => {
      // this.props.loadAddresses();
      this.props.cancel();
    });
  };

  render() {
    return (
      <form className="address-form">
        <div className="form-field">
          <label>ที่อยู่</label>
          <input type="text"
            name="address"
            value={this.state.address}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>แขวง/ตำบล</label>
            <input type="text"
              name="sub_district"
              value={this.state.sub_district}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>เขต/อำเภอ</label>
            <input type="text"
              name="district"
              value={this.state.district}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>จังหวัด</label>
            <input type="text"
              name="province"
              value={this.state.province}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>รหัสไปรษณีย์</label>
            <input type="text"
              name="zip_code"
              value={this.state.zip_code}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button type="submit" className='primary' onClick={this.handleSend}>
          ยืนยัน
        </button>
        <button className="error" onClick={() => this.props.cancel()}>
          ยกเลิก
        </button>
      </form>
    );
  }
}

export default AddressForm;
