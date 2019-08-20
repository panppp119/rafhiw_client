import React from 'react'

import UserLayout from 'components/layouts/UserLayout'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <UserLayout>
        <div className="container">
          <h3 style={{ textAlign: 'center', color: 'var(--primary)' }}>Loading...</h3>
        </div>
      </UserLayout>
    )
  }
  // Handle the error state
  else if (error) {
    return <h3 style={{ color: 'var(--primary)' }}>ขออภัย, เกิดความผิดพลาดในการโหลดหน้า</h3>;
  }
  else {
    return null;
  }
};

export default ComponentLoading
