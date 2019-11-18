import React from 'react';

import './BankAccountForm.scss';

class BankAccountForm extends React.Component {
  state = {
    bank_branch: '',
    bank_name: '',
    account_name: '',
    account_no: ''
  }

  handleChange = (e) => {
    const value = e.target.value.replace('<', '').replace('>', '').replace('{', '').replace('}', '').replace('[', '').replace(']', '')
    this.setState({ [e.target.name]: value });
  };

  handleSend = e => {
    e.preventDefault();

    const data = {
      bank_name: this.state.bank_name || '',
      bank_branch: this.state.bank_branch || '',
      account_name: this.state.account_name || '',
      account_no: this.state.account_no || '',
      user_id: this.props.user.get('id')
    }

    this.props.addBank(data).then(() => {
      this.props.loadBank()
    })
  };

  render() {
    const banks = [
      { key: 'kbank', content: 'ธนาคารกสิกร', value: 'kbank' },
      { key: 'scb', content: 'ธนาคารไทยพาณิชย์', value: 'scb' },
      { key: 'bkk', content: 'ธนาคารกรุงเทพ', value: 'bkk' },
      { key: 'ktb', content: 'ธนาคารกรุงไทย', value: 'ktb' },
      { key: 'tmb', content: 'ธนาคารทหารไทย', value: 'tmb' }
    ];

    return (
      <form className="bank-account-form">
        <div className="form-group">
          <div className="form-field">
            <label>ธนาคาร</label>
            <select name="bank_name"
              value={this.state.bank_name}
              onChange={this.handleChange}
            >
              <option default>เลือกธนาคาร</option>
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
              value={this.state.bank_branch || ''}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>ชื่อบัญชี</label>
          <input type="text"
            name="account_name"
            value={this.state.account_name || ''}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label>หมายเลขบัญชี</label>
          <input type="text"
            name="account_no"
            value={this.state.account_no || ''}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <button type="submit" className='primary' onClick={this.handleSend}>
            ยืนยัน
          </button>
          <button className="error" onClick={() => this.props.cancel('bank')}>
            ยกเลิก
          </button>
        </div>
      </form>
    );
  }
}

export default BankAccountForm;
