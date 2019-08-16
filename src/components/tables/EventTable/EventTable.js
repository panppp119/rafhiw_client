import React, { Fragment } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom'
import { Map, List } from 'immutable';

import CountdownTimer from 'components/CountdownTimer';
import ProductsTable from 'components/tables/ProductsTable';

import './EventTable.scss';

class EventTable extends React.Component {
  static defaultProps = {
    item: Map(),
    events: List()
  };

  state = {
    num: 0
  };

  setActive(i) {
    if (i === this.state.num) {
      this.setState({ num: 0, index: i });
    } else {
      this.setState({ num: i, index: i });
    }
  }

  render() {
    const { events } = this.props;
    const { num, index } = this.state;

    return (
      <div className="event-table">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>ชื่องาน</Table.HeaderCell>
              <Table.HeaderCell width={4}>เวลา</Table.HeaderCell>
              <Table.HeaderCell width={4} />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {!events.isEmpty() &&
              events.map((event, i) => {
                const products = event.get('products') || List();
                const id = event.get('id')

                return (
                  <Fragment key={i}>
                    <Table.Row>
                      <Table.Cell>
                        <div
                          className="image"
                          style={{
                            backgroundImage: `url(${event.get('image')})`
                          }}
                        />
                        <div className="info">
                          <Link to={`/events/${id}`}><h4>{event.get('name_th')}</h4></Link>
                          <p>{event.get('location_name')}</p>
                          <p>
                            ระหว่างวันที{' '}
                            {Moment(event.get('start_date')).format('MM/DD/YY')}
                            -{Moment(event.get('end_date')).format('MM/DD/YY')}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <CountdownTimer item={event} />
                      </Table.Cell>
                      <Table.Cell>
                        {/* <Button.Group vertical labeled icon>
                          <Button icon="edit" content="แก้ไข" />
                          <Button icon="trash" content="ลบ" />
                          <Button icon="hide" content="ไม่แสดงสินค้า" />
                        </Button.Group> */}
                      </Table.Cell>
                    </Table.Row>
                  </Fragment>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default EventTable;
