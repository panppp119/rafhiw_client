import React from 'react';
import { List } from 'immutable';

import UserLayout from 'components/layouts/UserLayout'
import ProductCard from 'components/cards/ProductCard';
import DateConvert from 'components/converts/DateConvert';
import Pagination from 'components/Pagination'
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
    const size = 10;

    const pagination = [
      { link: '/', name: 'หน้าแรก' },
      { link: '/events', name: 'งานลดราคา' },
      { link: `/e/${event.get('id')}`, name: event.get('name') },
    ]

    return (
      <UserLayout>
        <div id="event-page">
          <div className="container">
            <div className="desktop">
              <Pagination pagination={pagination} />
            </div>

            <div className="overview">
              <div className="column">
                <div className="image">
                  <Img src={event.get('image')} name={event.get('name')} />
                </div>
              </div>

              <div className="column event-detail">
                <h3>{event.get('name')}</h3>
                <p className="date">
                  <DateConvert date={event.get('start_date')} /> -{' '}
                  <DateConvert date={event.get('end_date')} />
                </p>
                <p>{event.get('description')}</p>
                {/* <Button content="อ่านเพิ่มเติม" />{' '} */}
                {/* <Button content="เพิ่มสินค้าใน Event" /> */}
                <div className="gg-map">
                  <GMap
                    location={event.getIn(['location', 'name'])}
                    center={{
                      lat: parseFloat(event.getIn(['location', 'lat'])),
                      lng: parseFloat(event.getIn(['location', 'lng']))
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="products">
              <h3>สินค้า</h3>

              <div className="mobile">
                {!products.isEmpty() ?
                  products.slice(0, size).map((product, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={product} />
                      </div>
                    );
                  }
                ) : (
                  <p>ไม่มีสินค้า</p>
                )}
              </div>

              <div className="desktop">
                {!products.isEmpty() ?
                  products.slice(0, size).map((product, i) => {
                    return (
                      <div className="column" key={i}>
                        <ProductCard product={product} />
                      </div>
                    );
                  }
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
