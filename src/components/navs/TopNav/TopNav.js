import React, { Fragment } from 'react'
import ClassNames from 'classnames'
import { List, Map } from 'immutable'
import { Link, withRouter } from 'react-router-dom'
import { FaShoppingCart, FaCommentDots, FaChevronLeft,
  FaBell, FaUser, FaFont, FaSun, FaMoon,
  FaArchive, FaAddressCard, FaSignOutAlt, FaSearch
} from 'react-icons/fa'
import { DebounceInput } from 'react-debounce-input'

import logo from './logo.png'
import logo_pimary from './logo_pimary.png'
import './TopNav.scss'

class TopNav extends React.Component {
  state = {
    nightmode: this.props.themeColor === 'theme-dark',
    search: false
  }

  componentDidMount () {
    if (this.props.user.isEmpty()) {
      this.props.checkSession();
    }

    this.props.resetSearch()
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.user.isEmpty() && prevProps.user !== this.props.user) ||
      prevProps.user !== this.props.user
    ) {
      this.props.loadCart();
    }
  }

  signOut = () => {
    this.props.signout()
  }

  handleChangeFont(age) {
    this.props.setFont(age);
  }

  changeMode = e => {
    this.setState({ nightmode: !this.state.nightmode })

    if (!this.state.nightmode) {
      this.props.setTheme('theme-dark')
    }
    else {
      this.props.setTheme('theme-orange')
    }
  }

  handleSearchChange (value) {
    this.props.search({ search: value })
    this.setState({ searchInput: value })

    if (value === '') {
      setTimeout(() => this.setState({ search: false }), 2000)
    }
  }

  reset = () => {
    this.setState({
      search: false,
      searchInput: ''
    })
    this.props.resetSearch()
  }

  showSearch = () => {
    this.setState({ search: !this.state.search })

    if (this.state.search) {
      this.props.resetSearch()
    }
    else {
      this.setState({ searchInput: '' })
    }
  }

  searchContent () {
    const { searchData } = this.props

    return (
      (!searchData.isEmpty() || this.state.searchInput !== '') && (
        <div className="search-data">
          <div className="tags">
            <span value='รองเท้า' onClick={() => this.handleSearchChange('รองเท้า')}>รองเท้า</span>
            <span onClick={() => this.handleSearchChange('นาฬิกา')}>นาฬิกา</span>
            <span onClick={() => this.handleSearchChange('กระเป๋า')}>กระเป๋า</span>
          </div>

          <div className="products">
            <h4>สินค้า</h4>
            {
              !searchData.filter(data => data.get('type') === 'product').isEmpty() ? (
                searchData.filter(data => data.get('type') === 'product')
                .map((data, i) => {
                  return (
                    <Link className="product-data"
                      to={`/p/${data.get('id')}`}
                      key={i}
                      onClick={this.reset}
                    >
                      <p>{data.get('name')}</p>
                    </Link>
                  )
                })
              ) : (
                <p>ไม่เจอสินค้า</p>
              )
            }
          </div>

          <div className="events">
            <h4>งานลดราคา</h4>
            {
              !searchData.filter(data => data.get('type') === 'event').isEmpty() ? (
                searchData.filter(data => data.get('type') === 'event')
                .map((data, i) => {
                  const event = data.get('event') || Map()

                  return (
                    <Link className="event-data"
                      to={`/e/${event.get('id')}`}
                      key={i}
                      onClick={this.reset}
                    >
                      <p>{event.get('name')}</p>
                    </Link>
                  )
                })
              ) : (
                <p>ไม่เจองานลดราคา</p>
              )
            }
          </div>

          <div className="sellers">
            <h4>ผู้ขาย</h4>
            {
              !searchData.filter(data => data.get('type') === 'seller').isEmpty() ? (
                searchData.filter(data => data.get('type') === 'seller')
                .map((data, i) => {
                  const owner = data.get('owner') || Map()

                  return (
                    <div className="seller-data" key={i}>
                      <p>{owner.get('first_name')} {owner.get('last_name')}</p>
                    </div>
                  )
                })
              ) : (
                <p>ไม่เจอผู้ขาย</p>
              )
            }
          </div>
        </div>
      )
    )
  }

  render () {
    const { location, user } = this.props
    const { cart } = this.props;

    const roles = user.get('roles') || List()
    const totalQuantity = cart.get('total_qt') || 0;
    const pathname = location.pathname
    const isHome = pathname === '/'
    const isStore = pathname.includes('store')

    return (
      <div id="top-nav">
        <div className="first-mobile">
          <div className="mobile">
            <ul>
              {
                isHome ? (
                  <Fragment>
                    <li className='display'>
                      <Link to='/'>
                      <span className='size1' onClick={() => this.handleChangeFont(20)}>
                        <FaFont />
                      </span>
                      </Link>
                    </li>
                    <li className='display'>
                      <Link to='/'>
                      <span className='size2' onClick={() => this.handleChangeFont(35)}>
                        <FaFont />
                      </span>
                      </Link>
                    </li>
                    <li className='display'>
                      <Link to='/'>
                      <span className='size3' onClick={() => this.handleChangeFont(45)}>
                        <FaFont />
                      </span>
                      </Link>
                    </li>
                    {
                      this.state.nightmode ? (
                        <li className='display'>
                          <Link to='/'>
                          <span>
                            <FaMoon className='moon'
                              onClick={this.changeMode}
                            />
                          </span>
                          </Link>
                        </li>
                      ) : (
                        <li className='display'>
                          <Link to='/'>
                          <span>
                            <FaSun className='sun'
                              onClick={this.changeMode}
                            />
                          </span>
                          </Link>
                        </li>
                      )
                    }
                  </Fragment>
                ) : (
                  (isStore) ? (
                    <li>
                      <FaChevronLeft onClick={() => this.props.history.goBack()}/>
                    </li>
                  ) : (
                    <li>
                      <FaChevronLeft onClick={() => this.props.history.push('/')}/>
                    </li>
                  )
                )
              }

              <li className='empty' />
              <li className='empty' />
              <li className='empty' />
              <li className='empty' />
              <li className='empty' />
              <li className='empty' />
              <li className='empty' />
              <li className='search'>
                <FaSearch onClick={this.showSearch} />
              </li>

              <li>
                <Link to='/cart'>
                  <FaShoppingCart />
                  {totalQuantity !== 0 && <span className='total-qt'>{totalQuantity}</span>}
                </Link>
              </li>
              <li><Link to='/messages'><FaCommentDots /></Link></li>
            </ul>
          </div>
        </div>

        { this.state.search && (
          <div className="mobile-search">
            <DebounceInput
              value={this.state.searchInput}
              debounceTimeout={500}
              onChange={(e) => this.handleSearchChange(e.target.value)}
            />

            {this.searchContent()}

            <div className="search-data">
              <div className="tags">
                <span onClick={() => this.handleSearchChange('รองเท้า')}>รองเท้า</span>
                <span onClick={() => this.handleSearchChange('นาฬิกา')}>นาฬิกา</span>
                <span onClick={() => this.handleSearchChange('กระเป๋า')}>กระเป๋า</span>
              </div>
            </div>
          </div>
        )}

        <div className="desktop">
          <div className="first">
            <ul className='container'>
              <li className='display'>
                {/* การแสดงผล */}
                <span className='size1' onClick={() => this.handleChangeFont(20)}>
                  <FaFont />
                </span>
                <span className='size2' onClick={() => this.handleChangeFont(35)}>
                  <FaFont />
                </span>
                <span className='size3' onClick={() => this.handleChangeFont(45)}>
                  <FaFont />
                </span>
                {
                  this.state.nightmode ? (
                    <span>
                      <FaMoon className='moon'
                        onClick={this.changeMode}
                      />
                    </span>
                  ) : (
                    <span>
                      <FaSun className='sun'
                        onClick={this.changeMode}
                      />
                    </span>
                  )
                }
              </li>
              <li className='empty' />
              <li className='user'>
                {
                  user.isEmpty() ? (
                    <Link to='/sign_in'>เข้าสู่ระบบ</Link>
                  ) : (
                    <Fragment>
                      <FaUser />
                      <ul>
                        <li><Link to='/account'><FaAddressCard /> บัญชีของฉัน</Link></li>
                        {
                          roles.filter(role => role === 'seller').size !== 0 ? (
                            <li><Link to='/store'><FaArchive /> ร้านค้า</Link></li>
                          ) : null
                        }
                        <li onClick={this.signOut}><Link to='/'><FaSignOutAlt /> ออกจากระบบ</Link></li>
                      </ul>
                    </Fragment>
                  )
                }
              </li>
              <li><FaBell /></li>
            </ul>
          </div>

          <div className="second">
            <ul className='container'>
            <li className='logo'>
              {
              this.state.nightmode ? (
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                ) : (
                    <Link to='/'><img src={logo_pimary} alt="logo" /></Link>
                )

              }
              </li>
              <li className='search'>
                <DebounceInput
                  debounceTimeout={500}
                  onChange={this.handleSearchChange}
                />
                <FaSearch />

                {this.searchContent()}
              </li>

              <li className={ClassNames({ active: location.pathname === '/products'})}>
                <Link to='/products'>สินค้า</Link>
              </li>
              <li className={ClassNames({ active: location.pathname === '/events'})}>
                <Link to='/events'>งานลดราคา</Link>
              </li>

              <li>
                <Link to='/cart'>
                  <FaShoppingCart /> &nbsp;
                  {totalQuantity !== 0 && <span className='total-qt'>{totalQuantity}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TopNav)
