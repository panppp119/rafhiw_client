import React from 'react';

import ProductsTable from 'components/tables/ProductsTable';

import './Suspended.scss';

class Suspended extends React.Component {
  render() {
    return (
      <div className="suspended">
        <ProductsTable {...this.props} />
      </div>
    );
  }
}

export default Suspended;
