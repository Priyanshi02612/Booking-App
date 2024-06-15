import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';

import PlaceForm from './PlaceForm';
import axios from 'axios';

const PlacesPage = () => {
  const { action } = useParams();

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const response = await axios.get('/place/');
      console.log({ response });
    };
    fetchAllPlaces();
  }, []);

  return (
    <div>
      {action !== 'new' && (
        <Flex mt='20px' alignItems='center' flexDir='column'>
          <Box>
            <Text>List of all added places</Text>
          </Box>

          <Link
            to={'/account/places/new'}
            style={{
              backgroundColor: '#14b8a6',
              color: 'white',
              borderRadius: '50px',
              padding: '8px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: 'max-content',
            }}
          >
            <Icon as={FaPlus} />
            <Text>Add new place</Text>
          </Link>
        </Flex>
      )}

      {action === 'new' && (
        <div>
          <PlaceForm />
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
