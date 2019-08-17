import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

import './SignInForm.scss'

class SignInForm extends React.Component {
  render () {
    return (
      <div id="signin-form">
        <h2>เข้าสู่ระบบ</h2>

        <form action="">
          <input type="text" placeholder="อีเมล" />
          <input type="text" placeholder="รหัสผ่าน" />

          <button type="submit">เข้าสู่ระบบ</button>
        </form>

        <div className="register">
          <span>ยังไม่มีบัญชี?</span>
          <span><Link to='/register'>ลงทะเบียน</Link></span>
        </div>

        <hr/>

        <div className="social-signin">
          <button type="submit" className='google'>
            <FaGoogle />
            เข้าสู่ระบบด้วย Google
          </button>
        </div>
      </div>
    )
  }
}

export default SignInForm
