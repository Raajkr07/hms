import React from 'react';
import UserMedicineDonationPage from '../pages/MedicineDonation';

const UserMedicineDonationPageWrapper = ({ selectedMode }) => {
  return <UserMedicineDonationPage initialMode={selectedMode} />;
};

export default UserMedicineDonationPageWrapper;