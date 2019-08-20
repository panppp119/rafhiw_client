import React from 'react';

import './BankAccountForm.scss';

class BankAccountForm extends React.Component {
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSend = e => {
    e.preventDefault();
  };

  render() {
    const banks = [
      { key: 'kbank', content: 'ธนาคารกสิกร', value: 'kbank' },
      { key: 'scb', content: 'ธนาคารไทยพาณิชย์', value: 'scb' },
      { key: 'bkk', content: 'ธนาคารกรุงเทพ', value: 'bkk' },
      { key: 'ktb', content: 'ธนาคารกรุงไทย', value: 'ktb' }
    ];

    return (
      <form className="bank-account-form">
        <div className="form-field">
          <label>สาขา</label>
          <select name="bank"
            id=""
            onChange={this.handleChange}
          >
            {
              banks.map((bank, i) => {
                return <option key={i} value={bank.value}>{bank.content}</option>
              })
            }
          </select>
        </div>

        <div className="form-field">
          <label>สาขา</label>
          <input type="text"
            name="bank_branch"
            value={this.state.bank_branch}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label>ชื่อบัญชี</label>
          <input type="text"
            name="account_name"
            value={this.state.account_name}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label>หมายเลขบัญชี</label>
          <input type="text"
            name="account_number"
            value={this.state.account_number}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <button type="submit" className='primary' onClick={this.handleSend}>
            ยืนยัน
          </button>
          <button className="cancel" onClick={() => this.props.cancel('bank')}>
            ยกเลิก
          </button>
        </div>
      </form>
    );
  }
}

export default BankAccountForm;
