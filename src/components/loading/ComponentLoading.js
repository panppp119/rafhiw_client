import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import Loader from 'components/Loader'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <UserLayout>
        <div className="container" style={{ paddingTop: '15%' }}>
          <Loader loading />
        </div>
      </UserLayout>
    )
  }
  // Handle the error state
  else if (error) {
    return (
      <UserLayout>
        <div className="container" style={{ paddingTop: '15%' }}>
          <h3 style={{ color: 'var(--primary)', paddingTop: '16%' }}>ขออภัย, เกิดความผิดพลาดในการโหลดหน้า</h3>;
        </div>
      </UserLayout>
    )
  }
  else {
    return null;
  }
};

export default ComponentLoading
