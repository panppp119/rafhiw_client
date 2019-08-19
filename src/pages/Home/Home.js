import React from 'react'
import { List } from 'immutable'
import { Link } from 'react-router-dom'

import UserLayout from 'components/layouts/UserLayout'
import { EventCard, ProductCard } from 'components/cards'

import './Home.scss'

class Home extends React.Component {
  state = {
    category: null
  }

  componentDidMount () {
    this.props.loadCategories()
  }

  handleChange = (e) => {
    this.setState({ category: e.target.value })
  }

  onPushCategory = () => {
    this.state.category !== null && this.props.history.push(`/categories/${this.state.category}`)
  }

  render () {
    const { categories } = this.props

    return (
      <UserLayout>
        <div id="home-page">
          <div className="container">
            <div className="row">
              <div className="categories desktop">
                <h3>หมวดหมู่</h3>

                <ul className='cats'>
                  {
                    categories.map((category, i) => {
                      const sub_categories = category.get('sub_categories') || List()

                      return (
                        <li key={i}>
                          <Link to={`/categories/${category.get('slug')}`}>
                            {category.get('name')}
                          </Link>

                          <ul className='sub-cats'>
                            {
                              sub_categories.map((sub_category, si) => {
                                return (
                                  <li key={si}>
                                    <Link to={`/sub_categories/${sub_category.get('slug')}`}>
                                      {sub_category.get('name')}
                                    </Link>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>

              <div className="highlight">
              </div>

              <div className="categories mobile">
                <h3>หมวดหมู่</h3>

                <div className="select-category">
                  <select name="category" onChange={this.handleChange}>
                    <option default>เลือกหมวดหมู่</option>
                    {
                      categories.map((category, i) => {
                        return (
                          <option key={i} value={category.get('slug')}>
                            {category.get('name')}
                          </option>
                        )
                      })
                    }
                  </select>

                  <button className='primary' onClick={this.onPushCategory}>ไป</button>
                </div>
              </div>

              <div className="recommended">
                <h3>สินค้าแนะนำ</h3>
              </div>
            </div>

            <div className="row">
              <div className="events">
                <h3>งานลดราคา</h3>

                <div className="mobile">
                  <div className="column">
                    <EventCard />
                  </div>
                  <div className="column">
                    <EventCard />
                  </div>
                </div>

                <div className="desktop">
                  <div className="column">
                    <EventCard />
                  </div>
                  <div className="column">
                    <EventCard />
                  </div>
                  <div className="column">
                    <EventCard />
                  </div>
                  <div className="column">
                    <EventCard />
                  </div>
                  <div className="column">
                    <EventCard />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="products">
                <h3>สินค้า</h3>

                <div className="mobile">
                  <div className="column">
                    <ProductCard />
                  </div>
                  <div className="column">
                    <ProductCard />
                  </div>
                </div>

                <div className="desktop">
                  <div className="column">
                    <ProductCard />
                  </div>
                  <div className="column">
                    <ProductCard />
                  </div>
                  <div className="column">
                    <ProductCard />
                  </div>
                  <div className="column">
                    <ProductCard />
                  </div>
                  <div className="column">
                    <ProductCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Home
