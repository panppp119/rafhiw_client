import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import RegisterForm from 'components/forms/RegisterForm'

import './Register.scss'

class Register extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="register-page">
          <div className="container">
            <RegisterForm />
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Register
