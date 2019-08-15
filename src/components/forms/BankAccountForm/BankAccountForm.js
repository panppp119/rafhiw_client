import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react';

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
      <Form className="bank-account-form">
        <Form.Field
          name="ิbank_name"
          control={Select}
          options={banks}
          label="ธนาคาร"
          placeholder="ธนาคาร"
          onChange={this.handleChange}
        />

        <Form.Input
          fluid
          type="text"
          name="bank_branch"
          label="สาขา"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.Input
          fluid
          type="number"
          name="account_name"
          label="ชื่อบัญชี"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.Input
          fluid
          type="number"
          name="account_number"
          label="หมายเลขบัญชี"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Button type="submit" onClick={this.handleSend}>
          ยืนยัน
        </Button>
        <Button className="cancel" onClick={() => this.props.cancel('bank')}>
          ยกเลิก
        </Button>
      </Form>
    );
  }
}

export default BankAccountForm;
