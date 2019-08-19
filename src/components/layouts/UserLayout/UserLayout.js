import React from 'react'
import Helmet from 'react-helmet';
import Moment from 'moment';
import Classnames from 'classnames';

import FlashMessage from 'components/FlashMessage';
import { TopNav, BottomNav } from 'components/navs'

import './UserLayout.scss'

class UserLayout extends React.Component {
  static defaultProps = {
    themeColor: 'theme-orange'
  };

  state = {
    show: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    // ReactGA.ga('send', 'pageview', window.location.pathname);

    const hour = Moment().hour();
    const min = Moment().minute();

    (hour < 8 || (hour > 18 && min > 30)) &&
      (localStorage.getItem('changeTheme') === null && this.show());
  }

  show = () => this.setState({ show: true });

  confirm = () => {
    const hour = Moment().hour();
    const min = Moment().minute();

    this.props.setTheme(
      hour < 8 || (hour > 18 && min > 30) ? 'theme-dark' : 'theme-orange'
    );
    localStorage.setItem('changeTheme', true);
    this.setState({ show: false });
  };

  render () {
    const { flash_message } = this.props;

    return (
      <div id="user-layout"
        className={Classnames([
          this.props.themeColor,
          this.props.fontSize
        ])}>
        <TopNav />

        <Helmet title='Rafhiw' />

        <div className="layout-content">
          {flash_message && (
            <FlashMessage
              type={flash_message.get('type')}
              content={flash_message.get('text')}
              mount={!flash_message.isEmpty()}
            />
          )}

          {this.props.children}
        </div>

        <div className="mobile">
          <BottomNav />
        </div>
      </div>
    )
  }
}

export default UserLayout
