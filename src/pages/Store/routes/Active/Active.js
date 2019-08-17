import React from 'react';

import ProductsTable from 'components/tables/ProductsTable';

import './Active.scss';

class Active extends React.Component {
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
    // const pds = products.filter(p => p.get('active') === 1);

    return (
      <div className="active">
        {/* <ProductsTable
          option
          action
          category
          products={pds}
          user={user}
          loadProducts={loadProducts}
          deleteProduct={deleteProduct}
        /> */}
        <ProductsTable />
      </div>
    );
  }
}

export default Active;
