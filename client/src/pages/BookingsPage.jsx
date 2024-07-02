import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Box, Text } from '@chakra-ui/react';
import BookingPage from './BookingPage';

const BookingsPage = () => {
  const { user } = useContext(UserContext);
  const [bookingsData, setBookingsData] = useState();

  useEffect(() => {
    const fetchBookingsData = async () => {
      const response = await axios.get('/bookplace/my-bookings', {
        userId: user?._id,
      });
      setBookingsData(response.data.data);
      console.log({ response });
    };

    fetchBookingsData();
  }, []);

  console.log({ bookingsData });

  return (
    <Box>
      {bookingsData?.map((booking, index) => (
        <BookingPage booking={booking} key={index} />
      ))}
    </Box>
  );
};

export default BookingsPage;
