import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import PhotoUploader from '../components/PhotoUploader';
import PerksList from '../components/PerksList';
import { PlaceContext } from '../context/PlaceContext';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const PlaceForm = () => {
  const { id } = useParams();
  const [fetchingPlaceDataById, setFetchingPlaceDataById] = useState(false);

  const {
    placeFormData,
    setPlaceFormData,
    setSelectedPerks,
    handlePlaceDataSave,
  } = useContext(PlaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceById = () => {
      if (!id) {
        return 0;
      }

      setFetchingPlaceDataById(true);

      setTimeout(async () => {
        const response = await axios.get(`/place/place${id}`);
        const fetchedPlaceData = response.data.data;

        setPlaceFormData(fetchedPlaceData);
        setSelectedPerks(fetchedPlaceData.perks);

        setFetchingPlaceDataById(false);
      }, [500]);
    };

    fetchPlaceById();
  }, [id]);

  return (
    <div>
      {fetchingPlaceDataById ? (
        <Flex h='74vh' alignItems='center' justifyContent='center'>
          <Spinner size='md' />
        </Flex>
      ) : (
        <Flex
          flexDir='column'
          gap='20px'
          p={{ base: '24px 24px 40px', md: '24px' }}
        >
          <FormControl>
            <FormLabel fontSize='24px'>Title</FormLabel>

            <FormHelperText>
              Title for your place. should be short and catchy as in
              advertisement.
            </FormHelperText>

            <Input
              type='text'
              placeholder='title, for example: My lovely apt'
              mt='12px'
              value={placeFormData.title}
              onChange={(e) =>
                setPlaceFormData({ ...placeFormData, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Address</FormLabel>

            <FormHelperText>Address to this place</FormHelperText>

            <Input
              type='text'
              placeholder='address'
              mt='12px'
              value={placeFormData.address}
              onChange={(e) =>
                setPlaceFormData({ ...placeFormData, address: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Photos</FormLabel>

            <FormHelperText>more = better</FormHelperText>

            <PhotoUploader />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Description</FormLabel>

            <FormHelperText>description of the place</FormHelperText>

            <Textarea
              rows='3'
              mt='12px'
              value={placeFormData.description}
              onChange={(e) =>
                setPlaceFormData({
                  ...placeFormData,
                  description: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Perks</FormLabel>

            <FormHelperText>select all the perks of your place</FormHelperText>

            <PerksList />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Extra info</FormLabel>

            <FormHelperText>house rules,etc.</FormHelperText>

            <Textarea
              rows={3}
              mt='12px'
              value={placeFormData.extraInfo}
              onChange={(e) =>
                setPlaceFormData({
                  ...placeFormData,
                  extraInfo: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize='24px'>Check in&out times</FormLabel>

            <FormHelperText>
              add check in and out times, remember to have some time window for
              cleaning the room between guests
            </FormHelperText>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2} mt='12px'>
              <Box>
                <Text fontSize='15px'>Check in time</Text>

                <Input
                  type='number'
                  placeholder='14'
                  value={
                    placeFormData.checkIn === 0 ? '' : placeFormData.checkIn
                  }
                  onChange={(e) =>
                    setPlaceFormData({
                      ...placeFormData,
                      checkIn: parseInt(e.target.value),
                    })
                  }
                />
              </Box>

              <Box>
                <Text fontSize='15px'>Check out time</Text>

                <Input
                  type='number'
                  placeholder='14'
                  value={
                    placeFormData.checkOut === 0 ? '' : placeFormData.checkOut
                  }
                  onChange={(e) =>
                    setPlaceFormData({
                      ...placeFormData,
                      checkOut: parseInt(e.target.value),
                    })
                  }
                />
              </Box>

              <Box>
                <Text fontSize='15px'>Max number of guests</Text>

                <Input
                  type='number'
                  placeholder='0'
                  value={placeFormData.maxGuests}
                  onChange={(e) =>
                    setPlaceFormData({
                      ...placeFormData,
                      maxGuests: parseInt(e.target.value),
                    })
                  }
                />
              </Box>
            </SimpleGrid>
          </FormControl>

          <Flex justifyContent='space-between' gap='20px'>
            <Button
              bgColor='#14b8a6'
              color='white'
              px='50px'
              width={{ base: '35%', lg: '15%' }}
              _hover={{ backgroundColor: '#2da195' }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button
              bgColor='#14b8a6'
              color='white'
              px='50px'
              width={{ base: '35%', lg: '15%' }}
              _hover={{ backgroundColor: '#2da195' }}
              onClick={() => handlePlaceDataSave(id)}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default PlaceForm;
