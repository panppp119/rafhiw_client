import React from 'react';

// import ProductsTable from 'components/tables/ProductsTable';

import './OutOfStock.scss';

class OutOfStock extends React.Component {
  // componentDidMount() {
  //   this.props.loadProducts({ user_id: this.props.user.get('id') });
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
  //     this.props.loadProducts({ user_id: this.props.user.get('id') });
  //   }
  // }

  render() {
    // const { products, loadProducts, deleteProduct, user } = this.props;
    //
    // const pds = products.filter(p =>
    //   p.get('options').find(o => o.get('stock') === 0)
    // );

    return (
      <div className="out-of-stock section">
        {/* <ProductsTable
          option
          action
          category
          products={pds}
          user={user}
          loadProducts={loadProducts}
          deleteProduct={deleteProduct}
        /> */}
      </div>
    );
  }
}

export default OutOfStock;
