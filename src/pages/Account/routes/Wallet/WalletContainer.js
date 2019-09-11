import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchCards, createCard, deleteCard } from 'actions/cards';
import { fetchBank, createBank, deleteBank } from 'actions/bank';
import cardSchema from 'schemas/card';
import bankSchema from 'schemas/bank';

import Wallet from './Wallet';

const mapStateToProps = (state, props) => ({
  user: state.getIn(['user', 'data'], Map()),
  cards: state.getIn(['cards', 'collection'], List()),
  bank: state.getIn(['bank', 'collection'], List()),
  loadingCards: state.getIn(['cards', 'loading'], true),
  ...props
});

const mapDispatchToProps = {
  loadCards: () => fetchCards(cardSchema),
  addCard: data => createCard(data, cardSchema),
  removeCard: id => deleteCard(id, cardSchema),
  loadBank: () => fetchBank(bankSchema),
  addBank: data => createBank(data, bankSchema),
  removeBank: id => deleteBank(id, bankSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
