import React from 'react';

import AddProductForm from 'components/forms/AddProductForm'

import './AddProduct.scss';

class AddProduct extends React.Component {
  render() {
    return (
      <div className="add-product">
        <AddProductForm {...this.props} />
      </div>
    );
  }
}

export default AddProduct;
