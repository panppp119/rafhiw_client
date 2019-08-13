import React from 'react'

import UserLayout from 'components/layouts/UserLayout'

import './NotFound.scss'

class Home extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="notfound">
          <h1>Page Not Found!</h1>
        </div>
      </UserLayout>
    )
  }
}

export default Home
