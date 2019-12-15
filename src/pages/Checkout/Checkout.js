import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import UserLayout from 'components/layouts/UserLayout';
import PriceConvert from 'components/converts/PriceConvert';
import Img from 'components/Img';

import './Checkout.scss';

var myDropzone;

class Checkout extends React.Component {
  state = {
    attachment: null
  };

  componentDidMount() {
    this.props.loadOrder(this.props.id);
  }

  removeFile() {
    this.setState({ attachment: null });
  }

  addFile(file) {
    const type = file.type

    if (type.includes('png') || type.includes('jpeg')) {
      this.setState({ attachment: [{ file }] });
    }
    else {
      alert('ไม่สามารถอัปโหลดได้')
      myDropzone.removeAllFiles();
    }
  }

  createTransfer = e => {
    e.preventDefault()

    const { attachment } = this.state;

    if (attachment !== null && attachment.length > 0) {
      this.props
        .createTransfer(this.props.id, attachment)
        .then(() => {
          this.props.history.push('/account/orders');
        });
    } else {
      alert('ไม่สามารถอัปโหลดได้เนื่องจากยังไม่ได้เลือกหลักฐานการชำระสินค้า');
    }
  };

  render() {
    const { order } = this.props;

    const orderList = order.get('products') || List();
    var service = 0;

    var previewConfig = {
      iconFiletypes: ['.jpg', '.png'],
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };

    var djsEventConfig = {
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFilesize: 1,
      maxFiles: 1,
      params: {
        myParameter: "อัพโหลดภาพหลักฐานการโอนครับ"
      }
    };

    var eventHandlers = {
      init: dropzone => (myDropzone = dropzone),
      addedfile: file => this.addFile(file),
      removedfile: file => this.removeFile(file)
    };

    return (
      <UserLayout title="Rafhiw | Cart" main tab>
        <div id="checkout-page">
          <div className='container'>
            <div className="address" />

            <div className="order-products">
              <table>
                <thead>
                  <tr>
                    <th>สินค้า (ตัวเลือก)</th>
                    <th>ราคาต่อชิ้น</th>
                    <th>จำนวน</th>
                    <th>ราคารวม</th>
                  </tr>
                </thead>

                <tbody>
                  {!orderList.isEmpty() &&
                    orderList.map((cp, i) => {
                      var product = cp.get('product') || Map();
                      var name = product.get('name');
                      var quantity = cp.get('quantity');
                      var option = cp.get('option') || Map();
                      var hiw = option.get('hiw_amt') || 0;
                      var ship = option.get('ship_amt') || 0;
                      var price =
                        option.get('discount_amt') === 0
                          ? option.get('price_amt')
                          : option.get('discount_amt');
                      var sub_total = price * quantity;

                      service += hiw + ship;

                      return (
                        <tr key={i}>
                          <td>
                            <Img
                              src={cp.get('image')}
                              alt={product.get('name') + option.get('name')}
                            />
                            <span>
                              <Link to={`/p/${product.get('id')}`}>
                                {name} ({option.get('name')})
                              </Link>
                            </span>
                          </td>
                          <td><PriceConvert price={price} /></td>
                          <td><p>{quantity}</p></td>
                          <td><PriceConvert price={sub_total} /></td>
                        </tr>
                      );
                    })}

                </tbody>
              </table>

              <div className="order-total">
                <div className="price">
                  <span>ราคารวมสินค้า</span>
                  <h4>
                    <PriceConvert price={order.get('total_amt')} />
                  </h4>
                </div>

                <div className="service">
                  <span>ค่าบริการ</span>
                  <h4>
                    <PriceConvert price={service} />
                  </h4>
                </div>

                <div className="total">
                  <span>
                    รวมสินค้าทั้งหมด ({order.get('total_quantity')} ชิ้น
                    รวมค่าบริการหิ้วและจัดส่ง)
                  </span>
                  <h3>
                    <PriceConvert price={order.get('total_amt') + service} />
                  </h3>
                </div>
              </div>
            </div>

            <div className="payment">
              <h3>ส่งหลักฐานการชำระเงิน</h3>

              <div className="column">
                <div className="bank">
                  <p>ธนาคารกสิกรไทย</p>
                  <p>จิรสิน ฤดีเกียรติธำรง</p>
                  <p>0 442 8111 1</p>
                </div>
              </div>

              <div className="column">
                <div className="transfer">
                  <label>แนบหลักฐานการชำระเงิน</label>
                  <DropzoneComponent
                    config={previewConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsEventConfig}
                  />

                  <button className='primary' onClick={this.createTransfer}>
                    ส่ง
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Checkout;
