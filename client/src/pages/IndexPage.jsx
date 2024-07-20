import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import SinglePlace from '../components/SinglePlace';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [fetchingAllPlaces, setFetchingAllPlaces] = useState(false);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      setFetchingAllPlaces(true);

      const response = await axios.get(`${API_BASE_URL}/place/`);
      setAllPlaces([...response.data.data]);

      setFetchingAllPlaces(false);
    };

    fetchAllPlaces();
  }, []);

  return (
    <div>
      {fetchingAllPlaces ? (
        <div>
          <Flex h='74vh' alignItems='center' justifyContent='center'>
            <Spinner size='md' />
          </Flex>
        </div>
      ) : (
        <SimpleGrid
          spacing={{ base: '7', md: '3', lg: '5', xl: '2', '2xl': '5' }}
          columns={{ base: '1', md: '3', lg: '4', xl: '5', '2xl': '8' }}
          margin={{ base: '28px', lg: '28px 36px' }}
        >
          {allPlaces.map((place, index) => (
            <Link
              to={`/place/${place._id}`}
              key={index}
              style={{ justifySelf: 'center' }}
            >
              <SinglePlace place={place} />
            </Link>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default IndexPage;
