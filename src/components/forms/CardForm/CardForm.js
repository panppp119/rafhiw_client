import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import './CardForm.scss';

class CardForm extends React.Component {
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSend = e => {
    const card = {
      user_id: this.props.user.get('id'),
      name: this.state.card_holder,
      number: this.state.card_number,
      expired_month: this.state.expired_month,
      expired_year: this.state.expired_year,
      bill_address: this.state.bill_address,
      zip_code: this.state.zip_code
    };

    this.props.create(card).then(() => {
      this.props.cancel('card');
    });
  };

  render() {
    return (
      <Form className="card-form">
        <Form.Input
          type="text"
          name="card_holder"
          label="ชื่อที่ปรากฎบนบัตร"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.Input
          type="number"
          name="card_number"
          label="หมายเลขบัตรเครดิต"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.Field>
          <label>วันหมดอายุ</label>

          <Form.Group>
            <Form.Input
              type="number"
              name="expired_month"
              placeholder="เดือน"
              onChange={this.handleChange}
              autoComplete="off"
            />
            <Form.Input
              type="number"
              name="expired_year"
              placeholder="ปี"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </Form.Group>
        </Form.Field>

        <Form.Input
          type="number"
          name="cvv"
          label="CVV"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.TextArea
          name="bill_address"
          label="ที่อยู่ในการวางบิล"
          onChange={this.handleChange}
        />

        <Form.Input
          type="number"
          name="zip_code"
          label="รหัสไปรษณีย์"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Button
          type="submit"
          onClick={this.handleSend}
          loading={this.props.loading}
        >
          ยืนยัน
        </Button>
        <Button
          className="cancel"
          onClick={() => this.props.cancel('card')}
          disabled={this.props.loading}
        >
          ยกเลิก
        </Button>
      </Form>
    );
  }
}

export default CardForm;
