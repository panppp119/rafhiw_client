import React from 'react';

import ProductsTable from 'components/tables/ProductsTable';
import Loader from 'components/Loader'

import './OutOfStock.scss';

class OutOfStock extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadProducts();
    }
  }

  render() {
    const { products, loadProducts, deleteProduct } = this.props;

    const pds = products.filter(p =>
      p.get('options').find(o => o.get('stock') === 0)
    );

    return (
      <div className="out-of-stock">
        <Loader loading={this.props.loadingProducts}>
          <ProductsTable
            option
            action
            category
            products={pds}
            loadProducts={loadProducts}
            deleteProduct={deleteProduct}
          />
        </Loader>
      </div>
    );
  }
}

export default OutOfStock;
