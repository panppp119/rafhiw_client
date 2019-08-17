import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import SignInForm from 'components/forms/SignInForm'

import './SignIn.scss'

class SignIn extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="signin-page">
          <div className="container">
            <SignInForm {...this.props} />
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default SignIn
