import React from 'react';

import ProductForm from 'components/forms/ProductForm'
import Loader from 'components/Loader'

import './AddProduct.scss';

class AddProduct extends React.Component {
  render() {
    const { loadingProducts } = this.props
    
    return (
      <div className="add-product">
        {loadingProducts ? <Loader loading={loadingProducts}/> : <ProductForm {...this.props} />}
      </div>
    );
  }
}

export default AddProduct;
