import React from 'react';

import './ProfileForm.scss';

class ProfileForm extends React.Component {
  // state = {
  //   first_name: this.props.user.get('first_name') || null,
  //   last_name: this.props.user.get('last_name') || null,
  //   birthday: this.props.user.get('birthday') || null,
  //   gender: this.props.user.get('gender') || null,
  //   disability_id: this.props.user.get('disability_id') || null,
  //   email: this.props.user.get('email') || null,
  //   phone_number: this.props.user.get('phone_number') || null
  // };

  onSubmit = e => {
    // const { user } = this.props;
    //
    // const data = {
    //   first_name: this.state.first_name || user.get('first_name'),
    //   last_name: this.state.last_name || user.get('last_name'),
    //   email: this.state.email || user.get('email'),
    //   phone_number: this.state.phone_number || user.get('phone_number'),
    //   birthday: this.state.birthday || user.get('birthday'),
    //   disability_id: this.state.disability_id,
    //   gender: this.state.gender || user.get('gender')
    // };
    //
    // this.props.updateUser(data).then(() => {
    //   this.props.closeModal();
    // });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    // const { disabilities, user, loading } = this.props;
    //
    // const disabilityOptions = disabilities
    //   .map(d => ({
    //     text: d.get('name_th'),
    //     value: d.get('id')
    //   }))
    //   .toJS();
    //
    // const genders = [
    //   { text: 'ชาย', value: 1 },
    //   { text: 'หญิง', value: 2 },
    //   { text: 'เพศทางเลือก', value: 3 }
    // ];

    return (
      <div className="profile-form">
        <form action={this.onSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label>ชื่อ</label>
              <input type="text"
                name="first_name"
                value={this.state.first_name}
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-field">
              <label>นามสกุล</label>
              <input type="text"
                name="last_name"
                value={this.state.last_name}
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>อีเมล</label>
            <input type="email"
              name="email"
              value={this.state.email}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <div className="form-field">
              <label>เบอร์โทรศัพท์</label>
              <input type="text"
                name="phone_number"
                value={this.state.phone_number}
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-field">
              <label>วันเกิด</label>
              <input type="date"
                name="birthday"
                value={this.state.birthday}
                autoComplete="off"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-field">
              <label>ความพิเศษทางร่างกาย</label>
              <select name="disability_id"
                id=""
                onChange={this.handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="form-field">
              <label>เพศ</label>
              <select name="gender"
                id=""
                onChange={this.handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>

          <button type="submit">
            อัพเดต
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileForm;
