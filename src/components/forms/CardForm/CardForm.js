import React from 'react';

import './CardForm.scss';

class CardForm extends React.Component {
  state = {
    card_holder: '',
    card_number: '',
    expired_month: '',
    expired_year: '',
    cvv: '',
    bill_address: '',
    zip_code: ''
  }
  handleChange (e, name) {
    this.setState({ [name]: e.target.value });
  };

  handleSend = e => {
    // const card = {
    //   user_id: this.props.user.get('id'),
    //   name: this.state.card_holder,
    //   number: this.state.card_number,
    //   expired_month: this.state.expired_month,
    //   expired_year: this.state.expired_year,
    //   bill_address: this.state.bill_address,
    //   zip_code: this.state.zip_code
    // };

    // this.props.create(card).then((e) => {
    //   this.props.cancel('card');
    // });
  };

  render() {
    return (
      <form className="card-form">
        <div className="form-field">
          <label>ชื่อที่ปรากฎบนบัตร</label>
          <input type="text"
            name="card_holder"
            value={this.state.card_holder || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'card_holder')}
          />
        </div>

        <div className="form-field">
          <label>หมายเลขบัตรเครดิต</label>
          <input type="text"
            name="card_number"
            value={this.state.card_number || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'card_number')}
          />
        </div>

        <div className="form-group">
          <div className="form-field">
            <input type="text"
              name="expired_month"
              placeholder="เดือน"
              value={this.state.expired_month || ''}
              autoComplete="off"
              onChange={(e) => this.handleChange(e, 'expired_month')}
            />
          </div>

          <div className="form-field">
            <input type="text"
              name="expired_year"
              placeholder="ปี"
              value={this.state.expired_year || ''}
              autoComplete="off"
              onChange={(e) => this.handleChange(e, 'expired_year')}
            />
          </div>
        </div>

        <div className="form-field">
          <label>CVV</label>
          <input type="text"
            name="cvv"
            value={this.state.cvv || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'cvv')}
          />
        </div>

        <div className="form-field">
          <label>ที่อยู่ในการวางบิล</label>
          <textarea name="bill_address"
            value={this.state.bill_address || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'bill_address')}
          />
        </div>

        <div className="form-field">
          <label>รหัสไปรษณีย์</label>
          <input type="text"
            name="zip_code"
            value={this.state.zip_code || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'zip_code')}
          />
        </div>

        <div className="form-field">
          <button
            type="submit"
            className='primary'
            onClick={this.handleSend}
          >
            ยืนยัน
          </button>
          <button
            className="error"
            onClick={(e) => this.props.cancel('card')}
            // disabled={this.props.loading}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    );
  }
}

export default CardForm;
