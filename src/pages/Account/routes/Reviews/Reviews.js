import React from 'react';
import Numeral from 'numeral';
import ClassNames from 'classnames'
import { FaStar } from 'react-icons/fa'

import './Reviews.scss';

class Reviews extends React.Component {
  componentDidMount() {
    !this.props.user.isEmpty() &&
      (this.props.reviews.isEmpty() &&
        this.props.loadReviews({ seller_id: this.props.user.get('id') }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviews.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadReviews({ seller_id: this.props.user.get('id') });
    }
  }

  render() {
    const { reviews } = this.props;

    var avg = 0

    reviews.map(review =>
      avg += review.get('rating')
    )

    avg = avg/reviews.size

    return (
      <div className="reviews">
        <div className="head">
          <h3>รีวิว</h3>
          <p>รีวิวทั้งหมด</p>
        </div>

        <div className="body">
          <div className="rating">
            <h2>{Numeral(avg).format('0.00')} / 5</h2>

            <div className="star">
              <FaStar className={ClassNames({ active: avg >= 1 && avg <= 5 })} />
              <FaStar className={ClassNames({ active: avg >= 2 && avg <= 5 })} />
              <FaStar className={ClassNames({ active: avg >= 3 && avg <= 5 })} />
              <FaStar className={ClassNames({ active: avg >= 4 && avg <= 5 })} />
              <FaStar className={ClassNames({ active: avg === 5 })} />
            </div>
          </div>
          <div className="comments">
            {
              !reviews.isEmpty() ? reviews.map((review, i) => {
                const user = review.get('user') || Map()
                const product = review.get('product') || Map()

                return (
                  <div className="comment" key={i}>
                    <img src={product.get('image')} alt={product.get('name')} />

                    <div className="content">
                      <h4>
                        {user.get('first_name')} {user.get('last_name')}
                      </h4>
                      <p className='product'>({product.get('name')} - {product.get('po_name')})</p>
                      <p>{review.get('comment')}</p>
                    </div>
                  </div>
                )
              }) : <p>ยังไม่มีการรีิวิว</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
