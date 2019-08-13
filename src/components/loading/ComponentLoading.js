import React from 'react'

import UserLayout from 'components/layouts/UserLayout'

const ComponentLoading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <UserLayout>
        <div className="container">
          <div>Loading...</div>
        </div>
      </UserLayout>
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
