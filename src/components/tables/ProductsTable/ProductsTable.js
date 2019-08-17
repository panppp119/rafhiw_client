import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

import './ProductsTable.scss';

class ProductsTable extends React.Component {
  static defaultProps = {
    products: List()
  };

  state = {
    show: false
  };

  show = () => this.setState({ show: true });

  confirm = () => {
    this.setState({ show: false });
    // this.props.deleteProduct(this.state.product_id).then(res => {
    //   this.props.loadProducts();
    // });
  };

  cancel = () => {
    this.setState({ show: false });
  };

  removeProduct(id) {
    this.show();
    this.setState({ product_id: id });
  }

  render() {
    // const { products, option, action, category } = this.props;

    return (
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>ตัวเลือกสินค้า</th>
              <th>หมวดหมู่</th>
              <th>ตัวเลือก</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  className="image"
                  style={{
                    backgroundImage: `url()`
                  }}
                />
                <div className="info">
                  <Link to={`/products/`}>
                    <h4>ชื่อสินค้า</h4>
                  </Link>
                </div>
              </td>
              <td>
                <ul>
                  <li>ตัวเลือก1</li>
                  <li>ตัวเลือก2</li>
                </ul>
              </td>
              <td>ประเภทสินค้า</td>
              <td>
                <button className='error'
                  // onClick={() =>
                  //   this.removeProduct(product.get('id'))
                  //   disabled={product.get('active') === 0}
                  // }
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* <Confirm
          open={this.state.show}
          cancelButton="ยกเลิก"
          confirmButton="ยืนยัน"
          onCancel={this.cancel}
          onConfirm={this.confirm}
          content="ยืนยันที่จะลบ"
        /> */}
      </div>
    );
  }
}

export default ProductsTable;
