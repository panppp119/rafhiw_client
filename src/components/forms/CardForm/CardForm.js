import React from 'react';

import './CardForm.scss';

class CardForm extends React.Component {
  state = {
    card_holder: '',
    card_number: '',
    expired_month: '',
    expired_year: '',
    cvv: '',
    // bill_address: '',
    // zip_code: ''
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'card_number' || name === 'expired_month' || name === 'expired_year') {
      var number = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')

      this.setState({ [name]: number });
    }
    else {
      this.setState({ [name]: value });
    }
  };

  handleSend = e => {
    e.preventDefault()

    const card = {
      user_id: this.props.user.get('id'),
      name: this.state.card_holder,
      number: this.state.card_number,
      expired_month: this.state.expired_month,
      expired_year: this.state.expired_year,
      // bill_address: this.state.bill_address || '',
      // zip_code: this.state.zip_code || ''
    };

    this.props.addCard(card).then(() => {
      this.props.cancel('card');
    });
  };

  render() {
    const { card_number} = this.state

    var cn = card_number.match(/.{1,4}/g);
    var new_card_number = card_number.length > 4 ? cn.join('-') : card_number

    return (
      <form className="card-form">
        <div className="form-field">
          <label>ชื่อที่ปรากฎบนบัตร</label>
          <input type="text"
            name="card_holder"
            value={this.state.card_holder || ''}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label>หมายเลขบัตรเครดิต</label>
          <input type="text"
            name="card_number"
            value={new_card_number || ''}
            maxLength={19}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>เดือน</label>
            <input type="text"
              name="expired_month"
              placeholder="00"
              value={this.state.expired_month || ''}
              maxLength={2}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>ปี</label>
            <input type="text"
              name="expired_year"
              placeholder="2019"
              value={this.state.expired_year || ''}
              maxLength={4}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>CVV</label>
          <input type="password"
            name="cvv"
            value={this.state.cvv || ''}
            maxLength={4}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        {/* <div className="form-field">
          <label>ที่อยู่ในการวางบิล</label>
          <textarea name="bill_address"
            value={this.state.bill_address || ''}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label>รหัสไปรษณีย์</label>
          <input type="text"
            name="zip_code"
            value={this.state.zip_code || ''}
            maxLength={5}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div> */}

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
