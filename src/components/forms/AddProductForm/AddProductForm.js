import React from 'react';
import DatePicker from 'react-datepicker';
import DropzoneComponent from 'react-dropzone-component';
import Moment from 'moment';
// import Debounce from 'lodash.debounce';
import { Form, Button, Select, Icon } from 'semantic-ui-react';

import GMap from 'components/GMap';

import './AddProductForm.scss';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class AddProductForm extends React.Component {
  state = {
    long_time: false,
    options: [{}],
    attachments: [],
    addEvent: false,
    event: {}
  };

  // componentDidMount() {
  //   this.props.loadEvents();
  //   this.props.loadCategories();
  // }
  //
  // handleChange = (e, { name, value }) => {
  //   this.setState({ [name]: value });
  //
  //   name === 'category_id' &&
  //     this.props.loadSubCategories({ category_id: value });
  // };
  //
  // handleChangeDate(date, name) {
  //   this.setState({ [name]: date });
  // }
  //
  // handleChangeOption(e, name, value, key) {
  //   let options = this.state.options;
  //
  //   if (
  //     name === 'price_amount' ||
  //     name === 'hiw_amount' ||
  //     name === 'ship_amount' ||
  //     name === 'discount_amount'
  //   ) {
  //     options[key][name] = value * 100;
  //   } else {
  //     options[key][name] = value;
  //   }
  //
  //   this.setState({ options });
  // }
  //
  // longTime = (e, { value }) => {
  //   this.setState({ long_time: value === 1 });
  // };
  //
  // handleSubmit = e => {
  //   // e.preventDefault();
  //
  //   const attachments = this.state.attachments;
  //   const product = {
  //     name_en: this.state.name_en,
  //     name_th: this.state.name_th,
  //     description_en: this.state.description_en,
  //     description_th: this.state.description_th,
  //     start_date: Moment(this.state.event.start_date).format(
  //       'YYYY-MM-DD HH:mm:ss'
  //     ),
  //     end_date: Moment(this.state.event.end_date).format('YYYY-MM-DD HH:mm:ss'),
  //     hiw_amount: this.state.hiw_amount,
  //     price_amount: this.state.price_amount,
  //     stock: this.state.stock,
  //     category_id: this.state.category_id,
  //     sub_category_id: this.state.sub_category_id,
  //     event_id: this.state.event_id,
  //     options: this.state.options,
  //     user_id: this.props.user.get('id')
  //   };
  //
  //   this.props.createProduct(product).then(res => {
  //     var id = (res && res.body) || 0;
  //
  //     id !== 0 &&
  //       this.props.createAttachment(id, attachments, 'products').then(res => {
  //         this.props.history.push('/sell/products');
  //       });
  //   });
  // };
  //
  // addOption = e => {
  //   e.preventDefault();
  //
  //   this.setState(prevState => ({
  //     options: [...prevState.options, {}]
  //   }));
  // };
  //
  // addFile(file) {
  //   let a = this.state.attachments || [];
  //
  //   a.push({ file });
  //
  //   this.setState({ attachments: a });
  // }
  //
  // addEventFile(file) {
  //   this.setState(prevState => ({
  //     event: { ...prevState.event, file }
  //   }));
  // }
  //
  // removeOption(key) {
  //   const options = this.state.options.splice(key, 1);
  //
  //   this.setState({ options });
  // }
  //
  // addEvent = e => {
  //   this.setState({ addEvent: this.state.addEvent === false ? true : false });
  // };
  //
  // handleChangeEvent = (e, { name, value }) => {
  //   this.setState(prevState => ({
  //     event: { ...prevState.event, [name]: value }
  //   }));
  // };
  //
  // handleChangeEventDate(date, name) {
  //   this.setState(prevState => ({
  //     event: { ...prevState.event, [name]: date }
  //   }));
  // }
  //
  // onCenterChanged = location => {
  //   this.setState(prevState => ({
  //     event: { ...prevState.event, ...location }
  //   }));
  // };
  //
  // submitEvent = e => {
  //   const { event } = this.state;
  //
  //   const ev = {
  //     name_th: event.name_th,
  //     description_th: event.description_th,
  //     location_name: event.location_name,
  //     location_lat: event.location_lat,
  //     location_lng: event.location_lng,
  //     start_date: Moment(event.start_date).format('YYYY-MM-DD HH:mm:ss'),
  //     end_date: Moment(event.end_date).format('YYYY-MM-DD HH:mm:ss'),
  //     user_id: this.props.user.get('id'),
  //     attachments: [{ file: event.file }]
  //   };
  //
  //   this.props.createEvent(ev).then(() => {
  //     this.setState({ addEvent: false });
  //   });
  // };
  //
  // removeFile(file, type) {
  //   if (type === 'event') {
  //     const ev = this.state.event;
  //     delete ev['file'];
  //
  //     this.setState(prevState => ({
  //       event: { ...prevState.event, ...ev }
  //     }));
  //   } else {
  //     const atchms = this.state.attachments;
  //     const index = atchms.findIndex(a => a.file.size === file.size);
  //
  //     atchms.splice(index, 1);
  //     this.setState({ attachments: atchms });
  //   }
  // }

  render() {
    // const { long_time, options } = this.state;
    // const { categories, sub_categories, events } = this.props;
    //
    // var categoryOptions = [],
    //   sub_categories_options = [],
    //   eventOptions = [];
    //
    // !events.isEmpty() &&
    //   events.map(event =>
    //     eventOptions.push({
    //       text: event.get('name_th'),
    //       value: event.get('id')
    //     })
    //   );
    //
    // !categories.isEmpty() &&
    //   categories.map(category =>
    //     categoryOptions.push({
    //       text: category.get('name_th'),
    //       value: category.get('id')
    //     })
    //   );
    //
    // !sub_categories.isEmpty() &&
    //   sub_categories.map(sc =>
    //     sub_categories_options.push({
    //       text: sc.get('name_th'),
    //       value: sc.get('id')
    //     })
    //   );
    //
    // var previewConfig = {
    //   iconFiletypes: ['.jpg', '.png'],
    //   showFiletypeIcon: false,
    //   postUrl: 'no-url'
    // };
    //
    // var djsConfig = {
    //   autoProcessQueue: false,
    //   addRemoveLinks: true,
    //   uploadMultiple: true
    // };
    //
    // var djsEventConfig = {
    //   autoProcessQueue: false,
    //   addRemoveLinks: true,
    //   maxFiles: 1
    // };
    //
    // var eventProductHandlers = {
    //   addedfile: file => this.addFile(file),
    //   removedfile: file => this.removeFile(file, 'product')
    // };
    //
    // var eventHandlers = {
    //   addedfile: file => this.addEventFile(file),
    //   removedfile: file => this.removeFile(file, 'event')
    // };

    return (
      <form className="add-product-form">
        <h4>ระยะเวลารับหิ้ว</h4>

        <div className="form-group">
          <div className="form-field">
            <label>เริ่มต้น</label>
            <DatePicker
              selected={this.state.start_date}
              onChange={date => this.handleChangeDate(date, 'start_date')}
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </div>

          <div className="form-field">
            <label>สิ้นสุด</label>
            <DatePicker
              selected={this.state.end_date || this.state.start_date}
              onChange={date => this.handleChangeDate(date, 'end_date')}
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </div>
        </div>
          <Form.Field>
            <label>เริ่มต้น</label>
            <DatePicker
              selected={this.state.start_date}
              onChange={date => this.handleChangeDate(date, 'start_date')}
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </Form.Field>

          <Form.Field>
            <label>สิ้นสุด</label>
            <DatePicker
              selected={this.state.end_date || this.state.start_date}
              onChange={date => this.handleChangeDate(date, 'end_date')}
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </Form.Field>
        </Form.Group>

        <h4>ภาพสินค้า</h4>
        <Form.Field>
          <DropzoneComponent
            config={previewConfig}
            eventHandlers={eventProductHandlers}
            djsConfig={djsConfig}
          />
        </Form.Field>

        <h4>ข้อมูลทั่วไป</h4>
        <Form.Input
          type="text"
          label="ชื่อสินค้า"
          name="name_th"
          onChange={this.handleChange}
          autoComplete="off"
        />

        <Form.TextArea
          label="รายละเอียดสินค้า"
          name="description_th"
          onChange={this.handleChange}
        />

        <Form.Group>
          <Form.Field
            name="category_id"
            control={Select}
            options={categoryOptions}
            label="หมวดหมู่"
            placeholder="หมวดหมู่"
            onChange={this.handleChange}
          />

          <Form.Field
            name="sub_category_id"
            control={Select}
            options={sub_categories_options}
            label="หมวดหมู่ย่อย"
            placeholder="หมวดหมู่ย่อย"
            onChange={this.handleChange}
          />
        </Form.Group>

        <h4>
          งานลดราคา <span>*กรุณาเลือกจากงานที่มีอยู่แล้วก่อนทำการเพิ่ม</span>
        </h4>
        {!events.isEmpty() && (
          <Form.Field
            name="event_id"
            control={Select}
            options={eventOptions}
            placeholder="งาน"
            onChange={this.handleChange}
          />
        )}
        {this.state.addEvent && (
          <div className="add-event">
            <Form.Input
              type="text"
              label="ชื่องาน"
              name="name_th"
              onChange={this.handleChangeEvent}
              autoComplete="off"
            />

            <Form.TextArea
              label="รายละเอียดงาน"
              name="description_th"
              onChange={this.handleChangeEvent}
            />

            <Form.Group>
              <Form.Field>
                <label>เริ่มต้น</label>
                <DatePicker
                  selected={this.state.event.start_date}
                  onChange={date =>
                    this.handleChangeEventDate(date, 'start_date')
                  }
                  peekNextMonth
                  showTimeSelect
                  dropdownMode="select"
                  dateFormat="dd/MM/yy HH:mm"
                />
              </Form.Field>

              <Form.Field>
                <label>สิ้นสุด</label>
                <DatePicker
                  selected={
                    this.state.event.end_date || this.state.event.start_date
                  }
                  onChange={date =>
                    this.handleChangeEventDate(date, 'end_date')
                  }
                  peekNextMonth
                  showTimeSelect
                  dropdownMode="select"
                  dateFormat="dd/MM/yy HH:mm"
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <DropzoneComponent
                config={previewConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsEventConfig}
              />
            </Form.Field>

            <Form.Field>
              <label>สถานที่จัดงาน</label>
              <GMap place onCenterChanged={this.onCenterChanged} />
            </Form.Field>

            <Form.Field className="event-action">
              <Button
                color="yellow"
                content="เพิ่มงาน"
                onClick={this.submitEvent}
              />
              <Button color="red" content="ยกเลิก" onClick={this.addEvent} />
            </Form.Field>
          </div>
        )}
        <div
          className="add-option"
          style={{ display: this.state.addEvent && 'none' }}
        >
          <Button content="เพิ่มงาน" color="yellow" onClick={this.addEvent} />
        </div>

        <h4>ตัวเลือกสินค้า</h4>
        {options.size !== 0 &&
          options.map((option, i) => {
            let optionId = `Option - ${i + 1}`;

            return (
              <div className="option" key={i}>
                <h4 className="option-title">{optionId}</h4>

                {i !== 0 && (
                  <Icon
                    name="times"
                    color="red"
                    onClick={() => this.removeOption(i)}
                  />
                )}

                <Form.Input
                  type="text"
                  label="ชื่อตัวเลือก"
                  name="name"
                  error={this.state.options[i]['name'] === ''}
                  onChange={(e, { name, value }) =>
                    this.handleChangeOption(e, name, value, i)
                  }
                  autoComplete="off"
                />

                <Form.Group>
                  <Form.Input
                    type="number"
                    label="จำนวน"
                    name="stock"
                    error={this.state.options[i]['number'] === ''}
                    onChange={(e, { name, value }) =>
                      this.handleChangeOption(e, name, value, i)
                    }
                    autoComplete="off"
                  />

                  <Form.Input
                    type="number"
                    label="ราคาสินค้า"
                    name="price_amount"
                    error={this.state.options[i]['name'] === ''}
                    onChange={(e, { name, value }) =>
                      this.handleChangeOption(e, name, value, i)
                    }
                    autoComplete="off"
                  />

                  <Form.Input
                    type="number"
                    label="ราคาลด"
                    name="discount_amount"
                    error={this.state.options[i]['name'] === ''}
                    onChange={(e, { name, value }) =>
                      this.handleChangeOption(e, name, value, i)
                    }
                    autoComplete="off"
                  />

                  <Form.Input
                    type="number"
                    label="ค่าหิ้วต่อชิ้น"
                    name="hiw_amount"
                    error={this.state.options[i]['hiw_amount'] === ''}
                    onChange={(e, { name, value }) =>
                      this.handleChangeOption(e, name, value, i)
                    }
                    autoComplete="off"
                  />

                  <Form.Input
                    type="number"
                    label="ค่าส่งต่อชิ้น"
                    name="ship_amount"
                    error={this.state.options[i]['ship_amount'] === ''}
                    onChange={(e, { name, value }) =>
                      this.handleChangeOption(e, name, value, i)
                    }
                    autoComplete="off"
                  />
                </Form.Group>
              </div>
            );
          })}
        <div className="add-option">
          <Button
            content="เพิ่มตัวเลือก"
            color="yellow"
            onClick={this.addOption}
          />
        </div>

        <Form.Group inline>
          <label>เตรียมส่งนานกว่าปกติ</label>
          <Form.Radio
            label="ใช่"
            value={1}
            checked={long_time}
            onChange={this.longTime}
          />

          <Form.Radio
            label="ไม่ใช่"
            value={0}
            checked={!long_time}
            onChange={this.longTime}
          />

          <span>
            ฉันจะจัดส่งสินค้าภายใน 2 วัน
            (ไม่รวมวันหยุดนักขัตฤกษ์และวันหยุดทำการของบริษัทขนส่ง)
          </span>
        </Form.Group>

        <button
          type="submit"
          onClick={this.handleSubmit}
          // loading={this.props.loadingAttachments}
        >
          เพิ่มสินค้า
        </button>
      </form>
    );
  }
}

export default AddProductForm;
