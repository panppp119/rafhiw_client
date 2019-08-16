import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';
import { Table, Button, Confirm, List as Lists } from 'semantic-ui-react';

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
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>สินค้า</Table.HeaderCell>
              {option && (
                <Table.HeaderCell width={2}>ตัวเลือกสินค้า</Table.HeaderCell>
              )}
              {/* <Table.HeaderCell width={2}>ราคา</Table.HeaderCell>
              <Table.HeaderCell width={2}>ค่าหิ้ว</Table.HeaderCell>
              <Table.HeaderCell width={2}>ค่าส่ง</Table.HeaderCell> */}
              {category && (
                <Table.HeaderCell width={2}>หมวดหมู่</Table.HeaderCell>
              )}
              {action && <Table.HeaderCell width={3} />}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {!products.isEmpty() &&
              products.map((product, i) => {
                const options = product.get('options') || List();

                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${product.getIn([
                            'attachments',
                            0,
                            'image'
                          ]) || ''})`
                        }}
                      />
                      <div className="info">
                        <Link to={`/products/${product.get('id')}`}>
                          <h4>{product.get('name_th')}</h4>
                        </Link>
                      </div>
                    </Table.Cell>
                    {option && (
                      <Table.Cell>
                        <Lists bulleted>
                          {options.map((o, i) => {
                            return (
                              <Lists.Item key={i}>{o.get('name')}</Lists.Item>
                            );
                          })}
                        </Lists>
                      </Table.Cell>
                    )}
                    {/* <Table.Cell className="color">
                      <PriceConvert price={product.get('price_amount')} />
                    </Table.Cell>
                    <Table.Cell className="color">
                      <PriceConvert price={product.get('hiw_amount')} />
                    </Table.Cell>
                    <Table.Cell className="color">
                      <PriceConvert price={product.get('shipment_amount')} />
                    </Table.Cell> */}
                    {category && (
                      <Table.Cell>
                        {product.getIn(['category', 'name_th'])} /{' '}
                        {product.getIn(['sub_category', 'name_th'])}
                      </Table.Cell>
                    )}
                    {action && (
                      <Table.Cell>
                        <Button.Group vertical labeled icon>
                          {/* <Button icon="edit" content="แก้ไข" /> */}
                          <Button
                            icon="trash"
                            content="ลบ"
                            onClick={() =>
                              this.removeProduct(product.get('id'))
                            }
                            disabled={product.get('active') === 0}
                          />
                          {/* <Button icon="hide" content="ไม่แสดงสินค้า" /> */}
                        </Button.Group>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>

        <Confirm
          open={this.state.show}
          cancelButton="ยกเลิก"
          confirmButton="ยืนยัน"
          onCancel={this.cancel}
          onConfirm={this.confirm}
          content="ยืนยันที่จะลบ"
        />
      </div>
    );
  }
}

export default ProductsTable;
