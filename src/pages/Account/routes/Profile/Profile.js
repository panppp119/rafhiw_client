import React from 'react';

// import ProfileForm from 'components/forms/ProfileForm';
// import ProfileTable from 'components/tables/ProfileTable';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    edit: false
  };

  render() {
    // const { user } = this.props;

    return (
      <div className="profile">
        <div className="head">
          <h3 className="ui header">ข้อมูลของฉัน</h3>
          <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
        </div>

        <div className="body">

        </div>
      </div>
    );
  }
}

export default Profile;
