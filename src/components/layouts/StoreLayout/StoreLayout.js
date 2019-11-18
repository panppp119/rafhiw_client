import React from 'react'
import Helmet from 'react-helmet'
import Moment from 'moment';
import Classnames from 'classnames';

import FlashMessage from 'components/FlashMessage';
import { StoreTopNav, BottomNav } from 'components/navs'
import ReactGA from 'utils/configGA'

import './StoreLayout.scss'

class StoreLayout extends React.Component {
  static defaultProps = {
    themeColor: 'theme-orange'
  };

  state = {
    show: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    ReactGA.ga('send', 'pageview', window.location.pathname);

    const hour = Moment().hour();
    const min = Moment().minute();

    (hour < 8 || (hour > 18 && min > 30)) &&
      (localStorage.getItem('changeTheme') === null && this.show());
  }

  show = () => this.setState({ show: true });

  confirm () {
    const hour = Moment().hour();
    const min = Moment().minute();

    if (window.confirm('ระบบมีการปรับเปลี่ยนโหมดการเแสดงผลให้อัตโนมัติ ต้องการที่จะเปลี่ยนหรือไม่?')) {
      this.props.setTheme(
        hour < 8 || (hour > 18 && min > 30) ? 'theme-dark' : 'theme-orange'
      );
      localStorage.setItem('changeTheme', true);
    }
    else {
      localStorage.setItem('changeTheme', false);
    }

    this.setState({ show: false });
  };

  render () {
    const { flash_message } = this.props

    return (
      <div id="store-layout"
        className={Classnames([
          this.props.themeColor,
          this.props.fontSize
        ])}>
        <StoreTopNav />

        <Helmet title='Rafhiw Store' />

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

        {this.state.show && this.confirm()}

        <div className="mobile">
          <BottomNav />
        </div>
      </div>
    )
  }
}

export default StoreLayout
