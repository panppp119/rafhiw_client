import React from 'react'

import StoreLayout from 'components/layouts/StoreLayout'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <StoreLayout>
        <div className="container">
          <h3 style={{ textAlign: 'center', color: 'var(--primary)'  }}>Loading...</h3>
        </div>
      </StoreLayout>
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
