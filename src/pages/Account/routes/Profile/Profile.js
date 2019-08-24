import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { FaEdit } from 'react-icons/fa'

// import ProfileForm from 'components/forms/ProfileForm';
import ProfileTable from 'components/tables/ProfileTable';

import './Profile.scss';

var myDropzone;

class Profile extends React.Component {
  state = {
    edit: false
  };

  componentDidMount () {
    this.props.disabilities.isEmpty() && this.props.loadDisabilities()
    this.props.user.isEmpty() && this.props.loadUser()
  }

  edit = e => {
    this.setState({ edit: true })
  }

  upload = e => {
    e.preventDefault()
    const { user } = this.props
    var attachment = { file: this.state.attachment };

    this.props.upload(user.get('id'), [attachment], 'avatar').then(res => {
      this.props.loadUser();
      myDropzone.removeAllFiles();
    });
  }

  addFile(file) {
    this.setState({ attachment: file });
  }

  removeFile() {
    this.setState({ attachment: null });
  }

  render() {
    const { user, disabilities, upload, loadUser } = this.props;

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
      <div className="profile">
        <div className="head">
          <h3 className="ui header">ข้อมูลของฉัน</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>

          <FaEdit onClick={this.edit}/>
        </div>

        <div className="body">
          <div className="mobile">
            <div className="avatar">
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
            </div>

            <div className="info">
              <ProfileTable
                user={user}
                disabilities={this.props.disabilities}
                upload={this.props.upload}
              />
            </div>
          </div>

          <div className="desktop">
            <ProfileTable
              user={user}
              disabilities={this.props.disabilities}
              upload={this.props.upload}
              loadUser={this.props.loadUser}
              avatar
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
