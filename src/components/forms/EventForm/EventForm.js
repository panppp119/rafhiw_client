import React from 'react';
import DatePicker from 'react-datepicker';
import DropzoneComponent from 'react-dropzone-component';
import Classnames from 'classnames'

import GMap from 'components/GMap';

import './EventForm.scss';

var myDropzone;

class EventForm extends React.Component {
  render() {
    const { events, e1, e2, e6, e7 } = this.props;

    var eventOptions = []

    !events.isEmpty() &&
      events.map(event =>
        eventOptions.push({
          text: event.get('name'),
          value: event.get('id')
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
      maxFiles: 1
    };

    var eventHandlers = {
      init: dropzone => (myDropzone = dropzone),
      addedfile: file => this.props.addEventFile(file),
      removedfile: file => this.props.removeFile(file, 'event')
    };

    return (
      <div className="add-event">
        <div className="form-field">
          <label>ชื่องาน</label>
          <input type="text"
            name="name"
            onChange={this.props.handleChangeEvent}
            autoComplete="off"
            className={Classnames({ error: e1 })}
          />
        </div>

        <div className="form-field">
          <label>รายละเอียดงาน</label>
          <textarea name="description"
            onChange={this.props.handleChangeEvent}
            className={Classnames({ error: e2 })}
          />
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
              className={Classnames({ error: e6 })}
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
              className={Classnames({ error: e7 })}
            />
          </div>
        </div>

        <div className="form-field">
          <DropzoneComponent
            config={previewConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
        </div>

        <div className="form-field">
          <label>สถานที่จัดงาน</label>
          <GMap place onCenterChanged={this.props.onCenterChanged} />
        </div>

        <div className="form-field">
          <button className='primary' onClick={this.props.submitEvent} >
            เพิ่มงาน
          </button>

          <button className='error' onClick={this.props.addEvent}>
            ยกเลิก
          </button>
        </div>
      </div>
    );
  }
}

export default EventForm;
