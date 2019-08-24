import React from 'react';
import DatePicker from 'react-datepicker';
import DropzoneComponent from 'react-dropzone-component';
import Moment from 'moment';

import GMap from 'components/GMap';

import './EventForm.scss';

class EventForm extends React.Component {
  render() {
    const { events } = this.props;

    var eventOptions = []

    !events.isEmpty() &&
      events.map(event =>
        eventOptions.push({
          text: event.get('name'),
          value: event.get('id')
        })
      );

    return (
      <div className="add-event">
        <div className="form-field">
          <label>ชื่องาน</label>
          <input type="text"
            name="name"
            onChange={this.props.handleChangeEvent}
            autoComplete="off"
          />
        </div>

        <div className="form-field">
          <label>รายละเอียดงาน</label>
          <textarea name="description" onChange={this.props.handleChangeEvent} />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>เริ่มต้น</label>
            <DatePicker
              selected={this.props.event.start_date}
              onChange={date =>
                this.props.handleChangeEventDate(date, 'start_date')
              }
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </div>

          <div className="form-field">
            <label>สิ้นสุด</label>
            <DatePicker
              selected={
                this.props.event.end_date || this.props.event.start_date
              }
              onChange={date =>
                this.props.handleChangeEventDate(date, 'end_date')
              }
              peekNextMonth
              showTimeSelect
              dropdownMode="select"
              dateFormat="dd/MM/yy HH:mm"
            />
          </div>
        </div>

        <div className="form-field">
          <DropzoneComponent
            config={this.props.previewConfig}
            eventHandlers={this.props.eventHandlers}
            djsConfig={this.props.djsEventConfig}
          />
        </div>

        <div className="form-field">
          <label>สถานที่จัดงาน</label>
          <GMap place onCenterChanged={this.props.onCenterChanged} />
        </div>

        <div className="form-field">
          <button className='primary' onClick={this.submitEvent} >
            เพิ่มงาน
          </button>

          <button className='error' onClick={this.addEvent}>
            ยกเลิก
          </button>
        </div>
      </div>
    );
  }
}

export default EventForm;
