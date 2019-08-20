import React from 'react'

import StoreLayout from 'components/layouts/StoreLayout'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <StoreLayout>
        <div className="container">
          <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        </div>
      </StoreLayout>
    )
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

export default ComponentLoading
