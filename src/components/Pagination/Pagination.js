import React from 'react'

import './Pagination.scss'

class Pagination extends React.Component {
  render () {
    const { pagination } = this.props

    return (
      <div className="pagination">
        {
          pagination.map((path, i) => {
            if (pagination.length - 1 === i)  {
              return <span key={i}>{path.name}</span>
            }
            else {
              return <span key={i}><a href={path.link}>{path.name}</a> / </span>
            }
          })
        }
      </div>
    )
  }
}

export default Pagination
