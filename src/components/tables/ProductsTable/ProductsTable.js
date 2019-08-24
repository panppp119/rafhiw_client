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
    this.props.deleteProduct(this.state.product_id).then(res => {
      this.props.loadProducts();
    });
  };

  cancel = () => {
    this.setState({ show: false });
  };

  removeProduct(id) {
    this.show();
    this.setState({ product_id: id });
  }

  render() {
    const { products, option, action, category } = this.props;

    return (
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              {option && <th>ตัวเลือกสินค้า</th>}
              {category && <th>หมวดหมู่</th>}
              {action && <th>ตัวเลือก</th>}
            </tr>
          </thead>
          <tbody>
            {
              !products.isEmpty() && products.map((product, i) => {
                const options = product.get('options') || List()
                const category = product.get('category') || Map()
                const sub_category = product.get('sub_category') || Map()

                return (
                  <tr key={i}>
                    <td>
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${product.get('image') || 'https://rafhiw.com/uploads/default.png'})`
                        }}
                        aria-label={product.get('name')}
                      />
                      <div className="info">
                        <Link to={`/p/${product.get('id')}`}>
                          <h4>{product.get('name')}</h4>
                        </Link>
                      </div>
                    </td>
                    {option && (
                      <td>
                        <ul>
                          {
                            options.map((opt, si) => {
                              return <li key={i}>{opt.get('name')}</li>
                            })
                          }
                        </ul>
                      </td>
                    )}
                    {category && <td>{category.get('name')} / {sub_category.get('name')}</td>}
                    {
                      action && (
                        <td>
                          <button className='error'
                            onClick={() => this.removeProduct(product.get('id'))}
                            disabled={product.get('active') === 0}
                          >
                            ลบ
                          </button>
                        </td>
                      )
                    }
                  </tr>
                )
              })
            }
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
