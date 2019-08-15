import { connect } from 'react-redux';
// import { List } from 'immutable';

// import { fetchCards, createCard, deleteCard } from 'actions/cards';
// import cardSchema from 'schemas/card';

import Wallet from './Wallet';

const mapStateToProps = (state, props) => ({
  // cards: state.getIn(['cards', 'collection'], List()),
  // loadingCards: state.getIn(['cards', 'loading'], true),
  // ...props
});

const mapDispatchToProps = {
  // loadCards: () => fetchCards(cardSchema),
  // addCard: data => createCard(data, cardSchema),
  // removeCard: id => deleteCard(id, cardSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
