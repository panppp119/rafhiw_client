import React from 'react';
import { Map } from 'immutable';

import ProductsTable from 'components/tables/ProductsTable';
import Loader from 'components/Loader'

import './Products.scss';

class Products extends React.Component {
  static defaultProps = {
    user: Map()
  };

  componentDidMount() {
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadProducts();
    }
  }

  render() {
    return (
      <div className="products">
        <Loader loading={this.props.loadingProducts}>
          <ProductsTable {...this.props} option action category />
        </Loader>
      </div>
    );
  }
}

export default Products;
