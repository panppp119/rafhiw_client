import React from 'react'

import UserLayout from 'components/layouts/UserLayout'

import './Home.scss'

class Home extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="home-page">
          <div className="container">
            <div className="row">
              <div className="categories desktop">
                <h3>หมวดหมู่</h3>

                <ul>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                </ul>
              </div>

              <div className="highlight">
                <h3>Highlight</h3>
              </div>

              <div className="categories mobile">
                <h3>หมวดหมู่</h3>

                <ul>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                  <li>Cat1</li>
                </ul>
              </div>

              <div className="recommended">
                <h3>สินค้าแนะนำ</h3>
              </div>
            </div>

            <div className="row">
              <div className="events">
                <h3>งานลดราคา</h3>
              </div>
            </div>

            <div className="row">
              <div className="products">
                <h3>สินค้า</h3>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Home
