import React from 'react'

import StoreLayout from 'components/layouts/StoreLayout'
import Loader from 'components/Loader'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <StoreLayout>
        <div className="container" style={{ paddingTop: '15%' }}>
          <Loader loading />
        </div>
      </StoreLayout>
    )
  }
  // Handle the error state
  else if (error) {
    return (
      <StoreLayout>
        <div className="container" style={{ paddingTop: '15%' }}>
          <h3 style={{ color: 'var(--primary)', paddingTop: '16%' }}>ขออภัย, เกิดความผิดพลาดในการโหลดหน้า</h3>;
        </div>
      </StoreLayout>
    )
  }
  else {
    return null;
  }
};

export default ComponentLoading
