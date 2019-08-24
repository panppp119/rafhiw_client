import React from 'react';
import Moment from 'moment';
import DropzoneComponent from 'react-dropzone-component';
import { Map } from 'immutable';

import DateConvert from 'components/converts/DateConvert';

import './ProfileTable.scss';

var myDropzone;

class ProfileTable extends React.Component {
  static defaultProps = {
    avatar: false
  }

  state = {
    attachment: null
  };

  upload = e => {
    const attachment = this.state.attachment;

    this.props
      .upload(this.props.user.get('id'), attachment, 'avatar')
      .then(() => {
        this.props.loadUser();
        myDropzone.removeAllFiles();
      });
  };

  removeFile() {
    this.setState({ attachment: null });
  }

  addFile(file) {
    this.setState({ attachment: [{ file }] });
  }

  render() {
    const { user, disabilities } = this.props;

    var gender;

    switch (user.get('gender')) {
      case 1:
        gender = 'ชาย';
        break;
      case 2:
        gender = 'หญิง';
        break;
      case 3:
        gender = 'เพศทางเลือก';
        break;
      default:
        break;
    }

    const disability =
      disabilities.find(d => d.get('id') === user.get('disability_id')) ||
      Map();
    const birthday = user.get('birthday') || '';
    const age = Moment(birthday).toNow(true);

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
      init: dropzone => (myDropzone = dropzone),
      addedfile: file => this.addFile(file),
      removedfile: file => this.removeFile()
    };

    return (
      <div className="profile-table">
        <table>
          <tbody>
            <tr>
              <td><h4>Email</h4></td>
              <td><h4>{user.get('email')}</h4></td>
              {
                this.props.avatar && (
                  <td rowSpan='7' className='avatar'>
                    <img src={user.get('image')} alt="user-avatar"/>
                    
                    <p>ขนาดไฟล์สูงสุด 1 Mb (JPG, PNG)</p>

                    <DropzoneComponent
                      config={previewConfig}
                      eventHandlers={eventHandlers}
                      djsConfig={djsEventConfig}
                    />

                    <button className="primary"
                      onClick={this.upload}
                      disabled={this.state.attachment === null}
                    >
                      อัพโหลด
                    </button>
                  </td>
                )
              }
            </tr>

            <tr>
              <td><h4>หมายเลขโทรศัพท์</h4></td>
              <td>{user.get('phone_number') || '-'}</td>
            </tr>

            <tr>
              <td><h4>ชื่อ</h4></td>
              <td>{user.get('first_name')} {user.get('last_name')}</td>
            </tr>

            <tr>
              <td><h4>เพศ</h4></td>
              <td>{gender || '-'}</td>
            </tr>

            <tr>
              <td><h4>วันเกิด</h4></td>
              <td>
                <DateConvert date={user.get('birthday')} />, (
                {age.replace(' years', '')})
              </td>
            </tr>

            <tr>
              <td><h4>ข้อบกพร่อง</h4></td>
              <td>{disability.get('name_th') || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProfileTable;
