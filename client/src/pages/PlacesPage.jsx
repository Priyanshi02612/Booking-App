import { Box, Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import Place from '../components/Place';

const PlacesPage = () => {
  const [placeData, setPlaceData] = useState([]);
  const [fetchingPlaceData, setFetchingPlaceData] = useState(false);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      setFetchingPlaceData(true);

      const response = await axios.get('/place/');
      const fetchedPlaceData = response.data.data;

      setPlaceData(fetchedPlaceData);

      setFetchingPlaceData(false);
    };

    fetchAllPlaces();
  }, []);

  return (
    <div>
      {fetchingPlaceData ? (
        <div>
          <Flex h='74vh' alignItems='center' justifyContent='center'>
            <Spinner size='md' />
          </Flex>
        </div>
      ) : (
        <Flex mt='20px' flexDir='column' padding='24px'>
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
              alignSelf: 'center',
            }}
          >
            <Icon as={FaPlus} />
            <Text>Add new place</Text>
          </Link>

          <Flex gap='20px'>
            {placeData?.map((place, index) => (
              <Link
                to={`/account/places/${place._id}`}
                key={index}
              >
                <Place place={place} />
              </Link>
            ))}
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default PlacesPage;
