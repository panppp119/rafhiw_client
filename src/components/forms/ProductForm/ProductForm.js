import React from 'react';
import DatePicker from 'react-datepicker';
import DropzoneComponent from 'react-dropzone-component';
import Moment from 'moment';
import { FaTrash } from 'react-icons/fa'

import EventForm from 'components/forms/EventForm'

import './ProductForm.scss';

var myDropzone;

class AddProductForm extends React.Component {
  state = {
    long_time: 0,
    options: [{}],
    attachments: [],
    addEvent: false,
    event: {}
  };

  componentDidMount() {
    this.props.loadEvents();
    this.props.loadCategories();
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    this.setState({ [name]: value });

    name === 'category_id' &&
      this.props.loadSubCategories({ category_id: value });
  };

  handleChangeDate(date, name) {
    this.setState({ [name]: date });
  }

  handleChangeOption(e, key) {
    var options = this.state.options;
    var value = e.target.value
    var name = e.target.name

    options[key][name] = value;
    this.setState({ value });
  }


  handleChangeEvent = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(prevState => ({
      event: { ...prevState.event, [name]: value }
    }));
  };

  handleChangeEventDate = (date, name) => {
    this.setState(prevState => ({
      event: { ...prevState.event, [name]: date }
    }));
  }

  addOption = e => {
    e.preventDefault();

    this.setState(prevState => ({
      options: [...prevState.options, {}]
    }));
  };

  addFile(file) {
    const type = file.type

    if (type.includes('png') || type.includes('jpeg')) {
      let a = this.state.attachments || [];

      a.push({ file });

      this.setState({ attachments: a });
    }
    else {
      alert('ไม่สามารถอัปโหลดได้')
      myDropzone.removeAllFiles();
    }
  }

  addEventFile = (file) => {
    const type = file.type

    if (type.includes('png') || type.includes('jpeg')) {
      this.setState(prevState => ({
        event: { ...prevState.event, file }
      }));
    }
    else {
      alert('ไม่สามารถอัปโหลดได้')
      myDropzone.removeAllFiles();
    }
  }

  addEvent = e => {
    e.preventDefault()

    this.setState({ addEvent: this.state.addEvent === false ? true : false });
  };

  removeOption(key) {
    this.state.options.splice(key, 1)

    this.setState({ options: this.state.options });
  }

  removeFile = (file, type) => {
    if (type === 'event') {
      const ev = this.state.event;
      delete ev['file'];

      this.setState(prevState => ({
        event: { ...prevState.event, ...ev }
      }));
    } else {
      const atchms = this.state.attachments;
      const index = atchms.findIndex(a => a.file.size === file.size);

      atchms.splice(index, 1);
      this.setState({ attachments: atchms });
    }
  }

  longTime = (e) => {
    this.setState({ long_time: parseInt(e.target.value) });
  };

  onCenterChanged = location => {
    this.setState(prevState => ({
      event: { ...prevState.event, ...location }
    }));
  };

  submitEvent = e => {
    e.preventDefault()

    const { event } = this.state;
    const ev = {
      name: event.name,
      description: event.description,
      location_name: event.location_name,
      location_lat: event.location_lat,
      location_lng: event.location_lng,
      start_date: Moment(event.start_date).format('YYYY-MM-DD HH:mm:ss'),
      end_date: Moment(event.end_date).format('YYYY-MM-DD HH:mm:ss'),
      owner_id: this.props.user.get('id'),
      attachment: { file: event.file }
    };

    var c1, c2, c3, c4, c5, c6, c7, c8

    c1 = event !== {} && event.name
    c2 = event !== {} && event.description
    c3 = event !== {} && event.location_name
    c4 = event !== {} && event.location_lat
    c5 = event !== {} && event.location_lng
    c6 = event !== {} && event.start_date
    c7 = event !== {} && event.end_date
    c8 = event !== {} && event.file

    if (c1 && c2 && c3 && c4 &&c5 && c6 && c7 && c8) {
      this.props.createEvent(ev).then(() => {
        this.setState({ addEvent: false });
      });
    }
    else {
      alert('ใส่ข้อมูลงานลดราคาไม่ครบ กรุณาตรวจสอบแล้วลองใหม่อีกครั้ง')
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const attachments = this.state.attachments;
    const product = {
      name: this.state.name,
      description: this.state.description,
      start_date: Moment(this.state.start_date).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      end_date: Moment(this.state.end_date).format('YYYY-MM-DD HH:mm:ss'),
      category_id: this.state.category_id,
      sub_category_id: this.state.sub_category_id,
      event_id: this.state.event_id,
      options: this.state.options,
      owner_id: this.props.user.get('id')
    };

    var c1, c2, c3, c4, c5, c6, c7, c8

    c1 = this.state.name && this.state.name !== ''
    c2 = this.state.description && this.state.description !== ''
    c3 = this.state.start_date
    c4 = this.state.end_date
    c5 = this.state.category_id
    c6 = this.state.sub_category_id
    c7 = this.state.event_id
    c8 = this.state.options.length > 0

    if (c1 && c2 &&c3 && c4 && c5 && c6 && c7 && c8) {
      this.props.createProduct(product).then(res => {
        var id = (res && res.body) || 0;

        id !== 0 &&
          this.props.createAttachment(id, attachments).then(res => {
            this.props.history.push('/store/products');
          });
      });
    }
    else {
      alert('ใส่ข้อมูลสินค้าไม่ครบ กรุณาตรวจสอบแล้วลองใหม่อีกครั้ง')
    }
  };

  render() {
    const { long_time, options } = this.state;
    const { categories, sub_categories, events } = this.props;

    var categoryOptions = []
    var sub_categories_options = []
    var eventOptions = [];

    !events.isEmpty() &&
      events.map(event =>
        eventOptions.push({
          text: event.get('name'),
          value: event.get('id')
        })
      );

    !categories.isEmpty() &&
      categories.map(category =>
        categoryOptions.push({
          text: category.get('name'),
          value: category.get('id')
        })
      );

    !sub_categories.isEmpty() &&
      sub_categories.map(sc =>
        sub_categories_options.push({
          text: sc.get('name'),
          value: sc.get('id')
        })
      );

    var previewConfig = {
      iconFiletypes: ['.jpg', '.png'],
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };

    var djsConfig = {
      autoProcessQueue: false,
      addRemoveLinks: true,
      uploadMultiple: true
    };

    var eventHandlers = {
      init: dropzone => (myDropzone = dropzone),
      addedfile: file => this.addFile(file),
      removedfile: file => this.removeFile(file, 'product')
    };

    return (
      <form className="product-form">
        <h3 className='head'>ระยะเวลารับหิ้ว</h3>

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

        <div className="form-field">
          <label>ภาพสินค้า</label>
          <DropzoneComponent
            config={previewConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
        </div>

        <h3>ข้อมูลทั่วไป</h3>
        <div className="form-field">
          <label>ชื่อสินค้า</label>
          <input type="text"
            name="name"
            value={this.state.name || ''}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="">รายละเอียดสินค้า</label>
          <textarea name="description"
            value={this.state.description}
            onChange={this.handleChange}
           />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>หมวดหมู่</label>
            <select name="category_id"
              onChange={this.handleChange}
            >
              <option default>หมวดหมู่</option>
              {
                categories.map((category, i) => {
                  return (
                    <option key={i} value={category.get('id')}>
                      {category.get('name')}
                    </option>
                  )
                })
              }
            </select>
          </div>

          <div className="form-field">
            <label>หมวดหมู่ย่อย</label>
            <select name="sub_category_id"
              onChange={this.handleChange}
            >
              <option default>หมวดหมู่ย่อย</option>
              {
                sub_categories.map((sub_category, i) => {
                  return (
                    <option key={i} value={sub_category.get('id')}>
                      {sub_category.get('name')}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <h3>ข้อมูลงานลดราคา <span>*กรุณาเลือกจากงานที่มีอยู่แล้วก่อนทำการเพิ่มงาน</span></h3>
        <div className="form-field">
          <select name="event_id"
            onChange={this.handleChange}
          >
            <option default>งานลดราคา</option>
            {
              events.map((event, i) => {
                return (
                  <option key={i} value={event.get('id')}>
                    {event.get('name')}
                  </option>
                )
              })
            }
          </select>
        </div>

        <div className="add-option"
          style={{ display: this.state.addEvent && 'none' }}
        >
          <button className='primary'
          onClick={this.addEvent}>
            เพิ่มงานลดราคา
          </button>
        </div>

        {this.state.addEvent && (
          <EventForm
            event={this.state.event}
            previewConfig={previewConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
            handleChangeEventDate={this.handleChangeEventDate}
            handleChangeEvent={this.handleChangeEvent}
            onCenterChanged={this.onCenterChanged}
            submitEvent={this.submitEvent}
            addEvent={this.addEvent}
            addEventFile={this.addEventFile}
            removeFile={this.removeFile}
            {...this.props}
          />
        )}

        <div className="product-options">
          <h3>ตัวเลือกสินค้า</h3>

          {options.size !== 0 &&
            options.map((option, i) => {
              let optionId = `Option - ${i + 1}`;

              return (
                <div className="option" key={i}>
                  <h4 className="option-title">{optionId}</h4>

                  {i !== 0 && (
                    <FaTrash onClick={() => this.removeOption(i)} />
                  )}

                  <div className="form-field">
                    <label htmlFor="">ชื่อตัวเลือก</label>
                    <input type="text"
                      name="name"
                      value={option.name || ''}
                      autoComplete="off"
                      onChange={(e) => this.handleChangeOption(e, i)}
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-field">
                      <label htmlFor="">จำนวน</label>
                      <input type="number"
                        name="stock"
                        value={option.stock || ''}
                        autoComplete="off"
                        onChange={(e) => this.handleChangeOption(e, i)}
                        maxLength={5}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="">ราคาสินค้า</label>
                      <input type="number"
                        name="price_amt"
                        value={option.price_amt || ''}
                        autoComplete="off"
                        onChange={(e) => this.handleChangeOption(e, i)}
                        maxLength={7}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="">ราคาลด</label>
                      <input type="number"
                        name="discount_amt"
                        value={option.discount_amt || ''}
                        autoComplete="off"
                        onChange={(e) => this.handleChangeOption(e, i)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="">ค่าหิ้วต่อชิ้น</label>
                      <input type="number"
                        name="hiw_amt"
                        value={option.hiw_amt || ''}
                        autoComplete="off"
                        onChange={(e) => this.handleChangeOption(e, i)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="">ค่าส่งต่อชิ้น</label>
                      <input type="number"
                        name="ship_amt"
                        value={option.ship_amt || ''}
                        autoComplete="off"
                        onChange={(e) => this.handleChangeOption(e, i)}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="add-option">
          <button className='primary'
          onClick={this.addOption}>
            เพิ่มตัวเลือก
          </button>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label htmlFor="">เตรียมส่งนานกว่าปกติ</label>
            <input type="radio"
              name="long_time"
              value={1}
              checked={long_time === 1}
              onChange={this.longTime}
            /> ใช่
            <input type="radio"
              name="long_time"
              value={0}
              checked={long_time === 0}
              onChange={this.longTime}
            /> ไม่ใช่ <br />
          </div>

          <div className="form-field">
            <span>
              ฉันจะจัดส่งสินค้าภายใน 2 วัน
              (ไม่รวมวันหยุดนักขัตฤกษ์และวันหยุดทำการของบริษัทขนส่ง)
            </span>
          </div>
        </div>

        <button className='primary'
          type="submit"
          onClick={this.handleSubmit}
        >
          เพิ่มสินค้า
        </button>
      </form>
    );
  }
}

export default AddProductForm;
