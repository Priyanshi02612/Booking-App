import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router';

const BookingPage = ({ booking }) => {
  console.log({booking})
  
  return (
    <Flex>
      <Box>
        <Image />
      </Box>
    </Flex>
  );
};

export default BookingPage;
