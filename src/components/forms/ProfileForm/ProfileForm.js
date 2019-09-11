import React from 'react';

import './ProfileForm.scss';

class ProfileForm extends React.Component {
  state = {
    first_name: this.props.user.get('first_name') || null,
    last_name: this.props.user.get('last_name') || null,
    birthday: this.props.user.get('birthday') || null,
    gender: this.props.user.get('gender') || 0,
    disability_id: this.props.user.get('disability_id') || 0,
    email: this.props.user.get('email') || null,
    phone_number: this.props.user.get('phone_number') || null
  };

  onSubmit = e => {
    e.preventDefault()

    const { user } = this.props;

    const data = {
      first_name: this.state.first_name || user.get('first_name'),
      last_name: this.state.last_name || user.get('last_name'),
      email: this.state.email || user.get('email'),
      phone_number: this.state.phone_number || user.get('phone_number'),
      birthday: this.state.birthday || user.get('birthday'),
      disability_id: parseInt(this.state.disability_id) || user.get('disability_id'),
      gender: parseInt(this.state.gender) || user.get('gender')
    };

    this.props.updateUser(data).then(() => {
      this.props.close()
    });
  };

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ [name]: value });
  };

  render() {
    // const disabilityOptions = disabilities
    //   .map(d => ({
    //     text: d.get('name_th'),
    //     value: d.get('id')
    //   }))
    //   .toJS();
    //

    return (
      <div className="profile-form">
        <form>
          <div className="form-field">
            <label>ชื่อ</label>
            <input type="text"
              name="first_name"
              value={this.state.first_name || ''}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>นามสกุล</label>
            <input type="text"
              name="last_name"
              value={this.state.last_name || ''}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>อีเมล</label>
            <input type="email"
              name="email"
              value={this.state.email || ''}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>เบอร์โทรศัพท์</label>
            <input type="text"
              name="phone_number"
              value={this.state.phone_number || ''}
              autoComplete="off"
              onChange={this.handleChange}
              maxLength={10}
            />
          </div>

          <div className="form-field">
            <label>วันเกิด</label>
            <input type="date"
              name="birthday"
              value={this.state.birthday || ''}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <label>ความพิเศษทางร่างกาย</label>
            <select name="disability_id"
              value={this.state.disability_id}
              onChange={this.handleChange}
            >
              <option default>เลือกความพิเศษทางร่างกาย</option>
              <option value={1}>ปกติ</option>
              <option value={2}>ร่างกาย</option>
              <option value={3}>หูหนวก</option>
              <option value={4}>สมอง</option>
            </select>
          </div>

          <div className="form-field">
            <label>เพศ</label>
            <select name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            >
              <option default>เลือกเพศ</option>
              <option value={1}>ชาย</option>
              <option value={2}>หญิง</option>
              <option value={3}>เพศทางเลือก</option>
            </select>
          </div>

          <button className='primary' onClick={this.onSubmit}>
            อัพเดต
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileForm;
