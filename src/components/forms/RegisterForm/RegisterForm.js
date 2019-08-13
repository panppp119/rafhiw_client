import React from 'react'
import { Link } from 'react-router-dom'

import './RegisterForm.scss'

class RegisterForm extends React.Component {
  render () {
    return (
      <div id="register-form">
        <h2>ลงทะเบียนสมาชิก</h2>

        <form action="">
          <input type="text" placeholder="ชื่อ" />
          <input type="text" placeholder="นามสกุล" />
          <input type="text" placeholder="อีเมล" />
          <input type="text" placeholder="รหัสผ่าน" />
          <input type="text" placeholder="ยืนยันรหัสผ่าน" />
          <input type="text" placeholder="วันเกิด" />
          <input type="text" placeholder="ความพิเศษทางร่างกาย" />

          <button type="submit">ลงทะเบียน</button>
        </form>

        <div className="signin">
          <span>มีบัญชีอยู่แล้ว</span>
          <span><Link to='/sign_in'>เข้าสู่ระบบ</Link></span>
        </div>

        <hr/>


      </div>
    )
  }
}

export default RegisterForm
