import React, { Fragment } from 'react';
import { FaTrash } from 'react-icons/fa'

import BankAccountForm from 'components/forms/BankAccountForm';
import CardForm from 'components/forms/CardForm';

import './Wallet.scss';

class Wallet extends React.Component {
  state = {
    card: false,
    bank: false
  };

  componentDidMount() {
    this.props.user.isEmpty() && this.props.loadCards();
    this.props.user.isEmpty() && this.props.loadBank();
  }

  handleClick (name) {
    this.setState({ [name]: true });
  };

  cancel = name => {
    this.setState({ [name]: false });
  };

  removeCard = id => e => {
    if (window.confirm('ยืนยันที่จะลบบัตรนี้ทิ้ง')) {
      this.props.removeCard(id);
    }
  };

  removeBank = id => e => {
    if (window.confirm('ยืนยันที่จะลบบัญชีนี้ทิ้ง')) {
      this.props.removeBank(id);
    }
  };

  showBankForm() {
    const { bank } = this.props
    const bank_name = (!bank.isEmpty() && bank.get('bank_name')) || ''
    var name = ''

    switch (bank_name) {
      case 'kbank': name = 'ธนาคารกสิกร'
        break;
      case 'scb': name = 'ธนาคารไทยพาณิชย์'
        break;
      case 'bkk': name = 'ธนาคารกรุงเทพ'
        break;
      case 'ktb': name = 'ธนาคารกรุงไทย'
        break;
      case 'tmb': name = 'ธนาคารทหารไทย'
        break;
      default:
        break;
    }

    if (this.state.bank) {
      return <BankAccountForm cancel={this.cancel} {...this.props} />;
    } else {
      return (
        <Fragment>
          {
            !bank.isEmpty() && (
              <div className="bank-bank">
                <p>{name} - {bank.get('bank_branch')}</p>
                <p>{bank.get('account_name')}</p>
                <p>{bank.get('account_no')}</p>
                <span onClick={this.removeBank(bank.get('id'))}>
                  <FaTrash />
                </span>
              </div>
            )
          }

          {
            bank.isEmpty() && (
              <button className='primary' onClick={() => this.handleClick('bank')}>
                เพิ่มบัญชีธนาคาร
              </button>
            )
          }
        </Fragment>
      );
    }
  }

  showCardForm() {
    const { cards } = this.props;

    if (this.state.card) {
      return (
        <CardForm cancel={this.cancel} {...this.props} />
      );
    } else {
      return (
        <Fragment>
          {
            !cards.isEmpty() && cards.map((card, i) => {
              return (
                <div className="card-card" key={i}>
                  <p>{card.get('name')}</p>
                  <p>{card.get('number').substring(0, 4)}-XXXX-XXXX-XXXX</p>
                  <p>
                    {card.get('expired_month')}/{card.get('expired_year')}
                  </p>
                  <span onClick={this.removeCard(card.get('id'))}>
                    <FaTrash />
                  </span>
                </div>
              );
            })
          }

          <button className='primary' onClick={() => this.handleClick('card')}>
            เพิ่มบัตรเครดิต/เดบิต
          </button>
        </Fragment>
      );
    }
  }

  render() {
    const { user } = this.props;

    const allow = !user.isEmpty() && user.get('roles').includes('seller');

    return (
      <div className="wallet">
        <div className="head">
          <h3>บัญชีธนาคาร/บัตร</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">
          {this.showCardForm()}
          {allow && this.showBankForm()}
        </div>
      </div>
    );
  }
}

export default Wallet;
