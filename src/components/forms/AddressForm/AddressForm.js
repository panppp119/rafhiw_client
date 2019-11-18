import React from 'react';
import ClassNames from 'classnames'

import './AddressForm.scss';

class AddressForm extends React.Component {
  state = {
    sameAddress: false,
  };

  handleChange = (e, name) => {
    const value = e.target.value.replace('<', '').replace('>', '').replace('{', '').replace('}', '').replace('[', '').replace(']', '')
    this.setState({ [e.target.name]: value });
  };

  handleSend = e => {
    e.preventDefault();

    const { user } = this.props;

    var a1, a2, a3, a4, a5
    a1 = !this.state.address
    a2 = !this.state.sub_district
    a3 = !this.state.district
    a4 = !this.state.province
    a5 = !this.state.zip_code

    const address = {
      address: this.state.address,
      sub_district: this.state.sub_district,
      district: this.state.district,
      province: this.state.province,
      zip_code: this.state.zip_code,
      user_id: user.get('id')
    };
    delete address['sameAddress'];

    if (!a1 && !a2 && !a3 && !a4 && !a5) {
      this.props.createAddress(address).then(res => {
        this.props.loadAddresses();
        this.props.cancel();
      });
    }
    else {
      alert('กรอกข้อมูลไม่ครบ กรุณาลองใหม่อีกครั้ง')

      a1 && this.setState({ a1: true })
      a2 && this.setState({ a2: true })
      a3 && this.setState({ a3: true })
      a4 && this.setState({ a4: true })
      a5 && this.setState({ a5: true })
    }
  };

  render() {
    const { a1, a2, a3, a4, a5 } = this.state

    return (
      <form className="address-form">
        <div className="form-field">
          <label>ที่อยู่</label>
          <input type="text"
            name="address"
            value={this.state.address || ''}
            autoComplete="off"
            onChange={this.handleChange}
            className={ClassNames({ error: a1 })}
          />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>แขวง/ตำบล</label>
            <input type="text"
              name="sub_district"
              value={this.state.sub_district || ''}
              autoComplete="off"
              onChange={this.handleChange}
              className={ClassNames({ error: a2 })}
            />
          </div>

          <div className="form-field">
            <label>เขต/อำเภอ</label>
            <input type="text"
              name="district"
              value={this.state.district || ''}
              autoComplete="off"
              onChange={this.handleChange}
              className={ClassNames({ error: a3 })}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>จังหวัด</label>
            <input type="text"
              name="province"
              value={this.state.province || ''}
              autoComplete="off"
              onChange={this.handleChange}
              className={ClassNames({ error: a4 })}
            />
          </div>

          <div className="form-field">
            <label>รหัสไปรษณีย์</label>
            <input type="text"
              name="zip_code"
              value={this.state.zip_code || ''}
              autoComplete="off"
              onChange={this.handleChange}
              className={ClassNames({ error: a5 })}
            />
          </div>
        </div>

        <div className="form-field">
          <button type="submit" className='primary' onClick={this.handleSend}>
            ยืนยัน
          </button>
          <button className="error" onClick={() => this.props.cancel()}>
            ยกเลิก
          </button>
        </div>
      </form>
    );
  }
}

export default AddressForm;
