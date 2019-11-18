import React from 'react'
import ClassNames from 'classnames'
import { FaStar } from 'react-icons/fa'

import './ReviewForm.scss'

class ReviewForm extends React.Component {
  state = {
    rating: 0
  }

  submitReview = e => {
    e.preventDefault()

    const data = {
      seller_id: this.props.seller_id,
      rating: this.state.rating,
      user_id: this.props.user.get('id'),
      order_id: this.props.order_id,
      product_option_id: this.props.product_option_id,
      comment: this.state.comment
    }

    this.props.review(data).then(() => {
      this.props.close()
      this.props.loadOrders()
    })
  }

  selectStar (rate)  {
    this.setState({ rating: rate })
  }

  comment = e => {
    const value = e.target.value.replace('<', '').replace('>', '').replace('{', '').replace('}', '').replace('[', '').replace(']', '')
    this.setState({ [e.target.name]: value })
  }

  render () {
    const { rating } = this.state

    return (
      <div className="review-form">
        <div className="review">
          <div className="stars">
            <FaStar className={ClassNames({ active: rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5 })}
              onClick={() => this.selectStar(1)}
            />
            <FaStar className={ClassNames({ active: rating === 2 || rating === 3 || rating === 4 || rating === 5 })}
              onClick={() => this.selectStar(2)}
            />
            <FaStar className={ClassNames({ active: rating === 3 || rating === 4 || rating === 5 })}
              onClick={() => this.selectStar(3)}
            />
            <FaStar className={ClassNames({ active: rating === 4 || rating === 5 })}
              onClick={() => this.selectStar(4)}
            />
            <FaStar className={ClassNames({ active: rating === 5 })}
              onClick={() => this.selectStar(5)}
            />
          </div>

          <div className="comment">
            <textarea name="comment" placeholder="รีวิว..." onChange={this.comment}></textarea>
          </div>

          <button className="primary" onClick={this.submitReview}>
            รีวิว
          </button>
        </div>
      </div>
    )
  }
}

export default ReviewForm
