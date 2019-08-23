import React from 'react';
import { List } from 'immutable';

import UserLayout from 'components/layouts/UserLayout'
import ProductCard from 'components/cards/ProductCard';
import GMap from 'components/GMap';
import Img from 'components/Img';

import './Event.scss';

class Event extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.loadEvent(id);
  }

  render() {
    const { event } = this.props;

    const products = event.get('products') || List();
    const size = 8;

    // const sections = [
    //   { title: 'Events', path: '/events', link: true },
    //   { title: event.get('name') }
    // ];

    return (
      <UserLayout>
        <div id="event-page">
          <div className="container">
            <div className="overview">
              <div className="column">
                <div className="image">
                  <Img src={event.get('image')} name={event.get('name')} />
                </div>
              </div>

              <div className="column">
                <h3>{event.get('name')}</h3>
                <p>{event.get('description')}</p>
                {/* <Button content="อ่านเพิ่มเติม" />{' '} */}
                {/* <Button content="เพิ่มสินค้าใน Event" /> */}
                <div className="gg-map">
                  <GMap
                    location={event.get('location_name')}
                    center={{
                      lat: parseFloat(event.get('location_lat')),
                      lng: parseFloat(event.get('location_lng'))
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="products">
              <h3>สินค้า</h3>

              <div className="mobile">
                {!products.isEmpty() && products.length > 1 ? (
                  products.slice(0, size)
                    .map((product, i) => {
                      return (
                        <div className="column" key={i}>
                          <ProductCard product={product} user={this.props.user} />
                        </div>
                      );
                    })
                ) : (
                  <p>ไม่มีสินค้า</p>
                )}
              </div>

              <div className="desktop">
                {!products.isEmpty() && products.length > 1 ? (
                  products.slice(0, size)
                    .map((product, i) => {
                      return (
                        <div className="column" key={i}>
                          <ProductCard product={product} user={this.props.user} />
                        </div>
                      );
                    })
                ) : (
                  <p>ไม่มีสินค้า</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Event;
