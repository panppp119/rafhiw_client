import React from 'react';
// import Numeral from 'numeral';

// import Img from 'components/Img';

import './Reviews.scss';

class Reviews extends React.Component {
  // componentDidMount() {
  //   !this.props.user.isEmpty() &&
  //     (this.props.reviews.isEmpty() &&
  //       this.props.loadReviews({ seller_id: this.props.user.get('id') }));
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.reviews.isEmpty() && prevProps.user !== this.props.user) {
  //     this.props.loadReviews({ seller_id: this.props.user.get('id') });
  //   }
  // }

  render() {
    // const { reviews, user } = this.props;

    return (
      <div className="reviews">
        <div className="head">
          <h3>รีวิว</h3>
          <p>รีวิวทั้งหมด</p>
        </div>

        <div className="body">
          {/* <Dimmer
            inverted
            active={reviews.isEmpty() && this.props.loadingReviews}
          >
            <Loader inverted />
          </Dimmer> */}

          <div className="rating">
            {/* <h2>{Numeral(user.get('rating')).format('0.00')} / 5</h2> */}
            {/* <Rating
              icon="star"
              disabled
              rating={Numeral(user.get('rating')).format('0,0')}
              maxRating={5}
              size="massive"
            /> */}
          </div>
          <div className="comments">
            {/* <Feed>
              {!reviews.isEmpty() ? (
                reviews.map((review, i) => {
                  const user = review.get('user') || Map();

                  return (
                    <Feed.Event key={i}>
                      <Feed.Label>
                        <Img
                          src={user.get('image')}
                          alt={user.get('first_name')}
                        />
                      </Feed.Label>
                      <Feed.Content>
                        <Feed.User>
                          {user.get('first_name')} {user.get('last_name')}
                          <Rating
                            icon="star"
                            rating={review.get('rating')}
                            maxRating={5}
                            disabled
                          />
                        </Feed.User>
                        <Feed.Extra>{review.get('comment')}</Feed.Extra>
                      </Feed.Content>
                    </Feed.Event>
                  );
                })
              ) : (
                <h4>ยังไม่มีการรีวิว</h4>
              )}
            </Feed> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
