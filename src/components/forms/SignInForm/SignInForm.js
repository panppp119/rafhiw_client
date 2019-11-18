import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

import './SignInForm.scss'

class SignInForm extends React.Component {
  state = { ggError: null };

  handleChange (e, name) {
    const value = e.target.value.replace('<', '').replace('>', '').replace('{', '').replace('}', '').replace('[', '').replace(']', '')
    this.setState({ [name]: name === 'password' ? e.target.value : value })
  }

  ggSignIn = e => {
    e.preventDefault();

    this.props.oauth('google')
  };

  emailSignin = e => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.signin(user)
  }

  render () {
    const { ggError } = this.state;

    return (
      <div id="signin-form">
        <h2>เข้าสู่ระบบ</h2>

        <form action="">
          <input type="email"
            name='email'
            placeholder="อีเมล"
            onChange={(e) => this.handleChange(e, 'email')}
          />
          <input type="password"
            name='password'
            placeholder="รหัสผ่าน"
            onChange={(e) => this.handleChange(e, 'password')}
          />

          <button className="primary" onClick={this.emailSignin}>เข้าสู่ระบบ</button>
        </form>

        <div className="register">
          <span>ยังไม่มีบัญชี?</span>
          <span><Link to='/register'>ลงทะเบียน</Link></span>
        </div>

        <hr/>

        <div className="social-signin">
          <button className='google' onClick={this.ggSignIn}>
            <FaGoogle />
            เข้าสู่ระบบด้วย Google
          </button>

          {ggError && <p className="error">{ggError.message}</p>}
        </div>
      </div>
    )
  }
}

export default SignInForm
