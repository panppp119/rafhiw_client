import React, { Fragment } from 'react';
// import { Map, List } from 'immutable';

import BankAccountForm from 'components/forms/BankAccountForm';
import CardForm from 'components/forms/CardForm';

import './Wallet.scss';

class Wallet extends React.Component {
  // static defaultProps = {
  //   user: Map(),
  //   cards: List()
  // };

  state = {
    card: false,
    bank: false
  };

  // componentDidMount() {
  //   this.props.cards.isEmpty() && this.props.loadCards();
  // }

  handleClick (name) {
    this.setState({ [name]: true });
  };

  cancel = name => {
    this.setState({ [name]: false });
  };

  delete = id => e => {
    // if (window.confirm('ยืนยันที่จะลบบัตรนี้ทิ้ง')) {
    //   this.props.removeCard(id);
    // }
  };

  showBankForm() {
    if (this.state.bank) {
      return <BankAccountForm />;
    } else {
      return (
        <button className='primary' onClick={() => this.handleClick('bank')}>
          เพิ่มบัญชีธนาคาร
        </button>
      );
    }
  }

  showCardForm() {
    // const { cards } = this.props;

    if (this.state.card) {
      return (
        <CardForm />
      );
    } else {
      return (
        <Fragment>
          {/* {
            !cards.isEmpty() && cards.map((card, i) => {
              return (
                <div className="card-card" key={i}>
                  <p>{card.get('name')}</p>
                  <p>{card.get('number').substring(0, 4)}-XXXX-XXXX-XXXX</p>
                  <p>
                    {card.get('expired_month')}/{card.get('expired_year')}
                  </p>
                  <span onClick={this.delete(card.get('id'))}>
                    <Icon name="trash" />
                  </span>
                </div>
              );
            })
          } */}

          <button className='primary' onClick={() => this.handleClick('card')}>
            เพิ่มบัตรเครดิต/เดบิต
          </button>
        </Fragment>
      );
    }
  }

  render() {
    // const { user, cards } = this.props;

    // const allow = !user.isEmpty() && user.get('roles').includes('seller');

    return (
      <div className="wallet">
        <div className="head">
          <h3>บัญชีธนาคาร/บัตร</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">
          {/* <Dimmer inverted active={cards.isEmpty() && this.props.loadingCards}>
            <Loader inverted />
          </Dimmer> */}

          {this.showCardForm()}

          {/* <Grid columns={2} stackable style={{ display: !allow && 'none' }}>
            <Grid.Column>{this.showBankForm()}</Grid.Column>

            <Grid.Column className="cards">{this.showCardForm()}</Grid.Column>
          </Grid> */}
        </div>
      </div>
    );
  }
}

export default Wallet;
