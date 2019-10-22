import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa'

import './Footer.scss'

class Footer extends React.Component {
  render () {
    return (
      <div className="footer">
        <div className="container">
          <div className="column">
            <h4>เกี่ยวกับ Rafhiw</h4>

            <ul>
              {/* <li><Link to=''>ค่าธรรมเนียม</Link></li> */}
              <li><Link to='/terms_of_service'>เงื่อนไขการให้บริการ</Link></li>
              <li><Link to='/privacy_policy'>นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link to='/prohibited_goods_policy'>นโยบายสิ่งของต้องห้าม</Link></li>
            </ul>
          </div>

          <div className="column">
            <h4>ติดตามเรา</h4>

            <ul>
              <li>
                <a href='https://www.facebook.com/rafhiw/'
                  target='_blank'
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
