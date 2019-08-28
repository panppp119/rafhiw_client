import React from 'react'
import { FaStar } from 'react-icons/fa'

class ReviewForm extends React.Component {
  submitReview (rate) {
    const data = {
      product_id: this.state.product_id,
      seller_id: this.state.seller_id,
      rating: this.state.rating,
      user_id: this.props.user.get('id'),
      order_id: this.state.order_id,
      comment: this.state.comment
    }

    this.props.createReview(data)
  }

  selectStar (rate)  {
    this.setState({ rating: rate })
  }

  comment = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className="review-form">
        <div className="review">
          <div className="stars">
            <FaStar onClick={() => this.selectStar(1)} />
            <FaStar onClick={() => this.selectStar(2)} />
            <FaStar onClick={() => this.selectStar(3)} />
            <FaStar onClick={() => this.selectStar(4)} />
            <FaStar onClick={() => this.selectStar(5)} />
          </div>

          <div className="comment">
            <textarea name="comment" onChange={this.comment}></textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewForm
