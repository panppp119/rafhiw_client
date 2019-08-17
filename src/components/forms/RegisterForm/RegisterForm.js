import React from 'react'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'

import './RegisterForm.scss'

const INITIAL_STATE = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  agree: false,
  birthday: new Date(),
  disability_id: 1,
  error: null
};

class RegisterForm extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount () {
    this.props.disabilities.isEmpty() && this.props.loadDisabilities()
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      email,
      password,
      first_name,
      last_name,
      agree,
      birthday,
      disability_id
    } = this.state;

    const data = {
      email,
      password,
      first_name,
      last_name,
      agree,
      birthday,
      disability_id
    };

    this.props.signUp(data, this.props.history);
  };

  onChange = (e, name) => {
    if (name === 'agree') {
      this.setState({ [name]: !this.state.agree });
    } else {
      this.setState({ [name]: e.target.value });
    }
  };

  handleChange = date => {
    this.setState({ birthday: date });
  };

  render () {
    const { disabilities } = this.props

    console.log(this.state)

    return (
      <div id="register-form">
        <h2>ลงทะเบียนสมาชิก</h2>

        <form action="">
          <input type="text" placeholder="ชื่อ" onChange={(e) => this.onChange(e, 'first_name')} />
          <input type="text" placeholder="นามสกุล" onChange={(e) => this.onChange(e, 'last_name')} />
          <input type="text" placeholder="อีเมล" onChange={(e) => this.onChange(e, 'email')} />
          <input type="text" placeholder="รหัสผ่าน" onChange={(e) => this.onChange(e, 'password')} />
          <input type="text" placeholder="ยืนยันรหัสผ่าน" onChange={(e) => this.onChange(e, 'confirm_password')} />

          <DatePicker
            selected={this.state.birthday}
            onChange={this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MM/yy"
            placeholderText="วันเกิด"
          />

          <select name="disability_id" onChange={(e) => this.onChange(e, 'disability_id')}>
            <option default>ความพิเศษทางร่างกาย</option>
            {
              disabilities.map((disability, i) => {
                return <option key={i} value={disability.get('id')}>{disability.get('name')}</option>
              })
            }
          </select>

          <button type="submit">ลงทะเบียน</button>
        </form>

        <div className="signin">
          <span>มีบัญชีอยู่แล้ว</span>
          <span><Link to='/sign_in'>เข้าสู่ระบบ</Link></span>
        </div>
      </div>
    )
  }
}

export default RegisterForm
