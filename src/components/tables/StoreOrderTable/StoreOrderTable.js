import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

import Img from 'components/Img';
// import PriceConvert from 'components/converts/PriceConvert';

import './StoreOrderTable.scss';

const initialState = {
  index: null
};

class StoreOrderTable extends React.Component {
  static defaultProps = {
    orders: List()
  };

  state = initialState;

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleClick(type, key, id) {
    // if (type === 'edit') {
    //   if (this.state.index === null) {
    //     this.setState({ index: key });
    //   } else {
    //     alert('กรุณาแก้ไข้รหัสก่อนหน้าให้เสร็จเรียบร้อยก่อน');
    //   }
    // } else {
    //   const { tracking_id } = this.state;
    //
    //   this.setState({ index: null });
    //
    //   if (
    //     tracking_id !== null ||
    //     tracking_id !== '' ||
    //     tracking_id !== undefined
    //   ) {
    //     this.props
    //       .updateTrackingId(id, {
    //         tracking_id,
    //         shipment_type: this.state.shipment_type
    //       })
    //       .then(() => {
    //         this.props.loadOrders(this.props.user.get('id'));
    //         this.setState(initialState);
    //       });
    //   }
    // }
  }

  render() {
    // const { orders, track, state } = this.props;
    // const { tracking_id, shipment_type } = this.state;

    // const shipment_options = [
    //   { key: 0, text: 'ไปรษณีย์ไทย', value: 1 },
    //   { key: 1, text: 'Kerry', value: 2 }
    // ];

    return (
      <div className="store-order-table">
        <table>
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
              <th>รหัสพัสดุ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Img />
                <div className="info">
                  <Link to={`/products`}>
                    <h4>ชื่อสินค้า ตัวเลือก</h4>
                  </Link>
                </div>
              </td>
              <td>จำนวน</td>
              <td>ราคา</td>
              <td>พัสดุ</td>
              <td>สถานะ</td>
            </tr>
          </tbody>
        </table>
        {/* <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign={'center'}>สินค้า</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>จำนวน</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>ราคารวม</Table.HeaderCell>
              {track && (
                <Table.HeaderCell textAlign={'center'}>
                  รหัสพัสดุ
                </Table.HeaderCell>
              )}
              {state && (
                <Table.HeaderCell textAlign={'center'}>สถานะ</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {!orders.isEmpty() &&
              orders.map((order, i) => {
                const option = order.get('option') || Map();
                const product = order.get('product') || Map();
                const status = order.get('status');

                var label = '';

                switch (status) {
                  case 2:
                    label = 'รอยืนยันการชำระสินค้า';
                    break;
                  case 3:
                    label = 'รอการจัดส่ง';
                    break;
                  case 4:
                    label = 'รอการรับของจากลูกค้า';
                    break;
                  case 5:
                    label = 'รอการรีวิว';
                    break;
                  case 7:
                    label = 'คำสั่งซื้อเสร็จสมบูรณ์';
                    break;
                  default:
                    break;
                }

                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Img
                        alt={product.get('name_th')}
                        src={product.getIn(['attachments', 0, 'image'])}
                      />
                      <div className="info">
                        <Link to={`/products/${product.get('id')}`}>
                          <h4>
                            {product.get('name_th')} ({option.get('name')})
                          </h4>
                        </Link>
                      </div>
                    </Table.Cell>
                    <Table.Cell textAlign={'center'}>
                      {order.get('quantity')}
                    </Table.Cell>
                    <Table.Cell textAlign={'right'}>
                      <PriceConvert price={order.get('total_amount')} />
                    </Table.Cell>
                    {track && (
                      <Table.Cell textAlign={'center'}>
                        <Input
                          name="tracking_id"
                          type="text"
                          value={
                            (this.state.index === i && tracking_id) ||
                            (order.get('tracking_id') || '')
                          }
                          autoComplete="false"
                          disabled={this.state.index !== i}
                          onChange={this.handleChange}
                        />
                        <Dropdown
                          placeholder="การจัดส่ง"
                          name="shipment_type"
                          selection
                          value={
                            (this.state.index === i && shipment_type) ||
                            (order.get('shipment_type') || '')
                          }
                          options={shipment_options}
                          disabled={this.state.index !== i}
                          onChange={this.handleChange}
                        />
                        {status === 3 && (
                          <Button
                            icon
                            onClick={e => {
                              this.state.index === i
                                ? this.handleClick('save', i, order.get('id'))
                                : this.handleClick('edit', i);
                            }}
                            disabled={
                              this.state.index === i &&
                              (tracking_id === '' ||
                                tracking_id === null ||
                                tracking_id === undefined ||
                                shipment_type === null ||
                                shipment_type === undefined)
                            }
                          >
                            {this.state.index === i ? (
                              <Icon color="green" name="check" />
                            ) : (
                              <Icon color="red" name="edit" />
                            )}
                          </Button>
                        )}
                      </Table.Cell>
                    )}
                    {state && (
                      <Table.Cell textAlign={'center'}>
                        <Label>{label}</Label>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table> */}
      </div>
    );
  }
}

export default StoreOrderTable;
