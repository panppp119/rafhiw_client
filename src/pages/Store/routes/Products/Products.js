import React from 'react';
import { Map } from 'immutable';

import ProductsTable from 'components/tables/ProductsTable';

import './Products.scss';

class Products extends React.Component {
  static defaultProps = {
    user: Map()
  };

  componentDidMount() {
    this.props.loadProducts({ owner_id: this.props.user.get('id') });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadProducts({ owner_id: this.props.user.get('id') });
    }
  }

  render() {
    return (
      <div className="products">
        {/* <ProductsTable {...this.props} option action category /> */}
        <ProductsTable {...this.props} option action category />
      </div>
    );
  }
}

export default Products;
