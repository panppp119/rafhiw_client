import React from 'react';
import { FaEdit } from 'react-icons/fa'

// import ProfileForm from 'components/forms/ProfileForm';
import ProfileTable from 'components/tables/ProfileTable';

import './Profile.scss';

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

  render() {
    const { user, disabilities, upload, loadUser } = this.props;

    return (
      <div className="profile">
        <div className="head">
          <h3 className="ui header">ข้อมูลของฉัน</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>

          <FaEdit onClick={this.edit}/>
        </div>

        <div className="body">
          <ProfileTable
            user={user}
            disabilities={this.props.disabilities}
            upload={this.props.upload}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
