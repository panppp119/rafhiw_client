import React from 'react';

import AddProductForm from 'components/forms/AddProductForm'

import './AddProduct.scss';

class AddProduct extends React.Component {
  render() {
    // const { products, loadProducts, deleteProduct, user } = this.props;
    //
    // const pds = products.filter(p => p.get('active') === 1);

    return (
      <div className="add-product">
        <AddProductForm {...this.props} />
      </div>
    );
  }
}

export default AddProduct;
