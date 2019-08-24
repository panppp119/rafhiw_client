import React from 'react';

import ProductForm from 'components/forms/ProductForm'

import './AddProduct.scss';

class AddProduct extends React.Component {
  render() {
    return (
      <div className="add-product">
        <ProductForm {...this.props} />
      </div>
    );
  }
}

export default AddProduct;
