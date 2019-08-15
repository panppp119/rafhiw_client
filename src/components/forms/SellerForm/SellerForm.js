import React from 'react';
import DropzoneComponent from 'react-dropzone-component';

import './SellerForm.scss';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class SellerForm extends React.Component {
  state = {
    sameAddress: false,
    gender: 0
  };

  handleChange (e, name) {
    this.setState({ [name]: e.target.value });
  };

  sendRequest = e => {
    // const { user } = this.props;
    //
    // const user_id = user.get('id');
    // var attachment = { file: this.state.attachment };
    // var request = {
    //   ...this.state,
    //   user_id,
    //   first_name: this.state.first_name || user.get('first_name'),
    //   last_name: this.state.last_name || user.get('last_name')
    // };
    //
    // delete request['sameAddress'];
    // delete request['attachment'];
    //
    // this.props.requestRole(request).then(() => {
    //   this.props.addAttachment(user_id, [attachment], 'seller');
    // });
  };

  sameAddress = (e, { checked }) => {
    this.setState({
      sameAddress: checked,
      now_address: checked ? this.state.id_address : ''
    });
  };

  removeFile() {
    this.setState({ attachment: null });
  }

  addFile(file) {
    this.setState({ attachment: file });
  }

  render() {
    // const { first_name, last_name } = this.state;
    // const { user } = this.props;

    const title = [
      { key: 'mr', text: 'นาย', value: 1 },
      { key: 'ms', text: 'นาง', value: 2 },
      { key: 'mrs', text: 'นางสาว', value: 3 },
      { key: 'other', text: 'อื่นๆ', value: 4 }
    ];

    const gender = [
      { key: 'm', text: 'ชาย', value: 1 },
      { key: 'f', text: 'หญิง', value: 2 },
      { key: 't', text: 'เพศทางเลือก', value: 3 }
    ];

    var previewConfig = {
      iconFiletypes: ['.jpg', '.png'],
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };

    var djsEventConfig = {
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFilesize: 1,
      maxFiles: 1
    };

    var eventHandlers = {
      addedfile: file => this.addFile(file),
      removedfile: file => this.removeFile(file)
    };

    return (
      <form className="seller-form">
        <div className="form-field">
          <label>เลขบัตรประชาชน</label>
          <input type="text"
            name="id_card"
            value={this.state.id_card || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'id_card')}
          />
        </div>

        <div className="form-field">
          <label>คำนำหน้า</label>
          <select name="title"
            id=""
            onChange={(e) => this.handleChange(e, 'title')}
          >
            {
              title.map((t, i) => {
                return <option key={i} value={t.value}>{t.text}</option>
              })
            }
          </select>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label htmlFor="">ชื่อจริงตามบัตรประชาชน</label>
            <input type="text"
              name="first_name"
              value={this.state.first_name || ''}
              autoComplete="off"
              onChange={(e) => this.handleChange(e, 'first_name')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="">นามสกุลตามบัตรประชาชน</label>
            <input type="text"
              name="last_name"
              value={this.state.last_name || ''}
              autoComplete="off"
              onChange={(e) => this.handleChange(e, 'last_name')}
            />
          </div>
        </div>

        <div className="form-field">
          <label>เพศ</label>
          <select name="gender"
            id=""
            onChange={(e) => this.handleChange(e, 'gender')}
          >
            {
              gender.map((g, i) => {
                return <option key={i} value={g.value}>{g.text}</option>
              })
            }
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="">ที่อยู่ตามบัตรประชาชน</label>
          <textarea name="id_address"
            value={this.state.id_address}
            onChange={(e) => this.handleChange(e, 'id_address')}
           />
        </div>

        <div className="form-field">
          <label htmlFor="">สำเนาบัตรประชาชน</label>
          <p>อัพโหลดรูปบัตรประชาชนพร้อมใบหน้าเจ้าของบัตร ดังตัวอย่าง</p>
          <DropzoneComponent
            config={previewConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsEventConfig}
          />
        </div>

        <div className="form-field">
          <label htmlFor="">ที่อยู่ปัจจุบัน</label>
          <input type="checkbox" onChange={this.sameAddress} />
          <textarea name="now_address"
            value={this.state.now_address}
            onChange={(e) => this.handleChange(e, 'now_address')}
           />
        </div>

        <div className="form-field">
          <label htmlFor="">รหัสไปรษณีย์</label>
          <input type="text"
            name="zip_code"
            value={this.state.zip_code || ''}
            autoComplete="off"
            onChange={(e) => this.handleChange(e, 'zip_code')}
          />
        </div>

        <button
          onClick={this.sendRequest}
          className='primary'
          // loading={this.props.loading || this.props.loadingAttachment}
        >
          ยืนยัน
        </button>
      </form>
    );
  }
}

export default SellerForm;
