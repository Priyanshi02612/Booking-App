import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import PhotoUploader from '../components/PhotoUploader';
import PerksList from '../components/PerksList';

const PlaceForm = () => {
  const [selectedPerks, setSelectedPerks] = useState([]);
  const toast = useToast();
  // const navigate = useNavigate();

  const [placeFormData, setPlaceFormData] = useState({
    title: '',
    address: '',
    photos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: 0,
    checkOut: 0,
    maxGuests: 1,
  });

  const handleAddPerks = (e, perkValue) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPerks([...selectedPerks, perkValue]);
    } else {
      setSelectedPerks(selectedPerks.filter((perk) => perk !== perkValue));
    }
  };

  useEffect(() => {
    setPlaceFormData({ ...placeFormData, perks: selectedPerks });
  }, [selectedPerks]);

  const handlePlaceDataSave = async () => {
    try {
      const response = await axios.post('/place/addplace', placeFormData);
      if (response.status === 200) {
        toast({
          title: response.data.message,
          status: 'success',
          isClosable: true,
          duration: 2000,
        });
      }
      console.log(placeFormData);

      setPlaceFormData({
        title: '',
        address: '',
        photos: [],
        description: '',
        perks: [],
        extraInfo: '',
        checkIn: 0,
        checkOut: 0,
        maxGuests: 1,
      });

      setSelectedPerks([]);

      // navigate('/account/places');
    } catch (error) {
      console.log('Error while saving data.', error);

      toast({
        title: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const handleUploadPhotoByLink = async (imageLink) => {
    try {
      const response = await axios.post('/upload/upload-by-link', {
        imageLink: imageLink,
      });

      const { filename } = response.data;

      setPlaceFormData({
        ...placeFormData,
        photos: [...placeFormData.photos, filename],
      });
    } catch (error) {
      console.error('Error uploading photo by link:', error);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
      const response = await axios.post('/upload/upload-by-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedFiles = response.data.files;

      setPlaceFormData((prevState) => ({
        ...prevState,
        photos: [...prevState.photos, ...uploadedFiles],
      }));
    } catch (error) {
      console.error('Error handling file select:', error);
    }
  };

  return (
    <Flex
      flexDir='column'
      gap='20px'
      p={{ base: '24px 24px 40px', md: '24px' }}
    >
      <FormControl>
        <FormLabel fontSize='24px'>Title</FormLabel>

        <FormHelperText>
          Title for your place. should be short and catchy as in advertisement.
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

        <PhotoUploader
          placeFormData={placeFormData}
          handleUploadPhotoByLink={handleUploadPhotoByLink}
          handleFileSelect={handleFileSelect}
        />
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

        <PerksList
          selectedPerks={selectedPerks}
          handleAddPerks={handleAddPerks}
        />
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
              value={placeFormData.checkIn === 0 ? '' : placeFormData.checkIn}
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
              value={placeFormData.checkOut === 0 ? '' : placeFormData.checkOut}
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

      <Flex justifyContent={{ base: 'center', md: 'left' }}>
        <Button
          bgColor='#14b8a6'
          color='white'
          px='50px'
          width={{ base: '50%', md: '25%', lg: '15%' }}
          _hover={{ backgroundColor: '#2da195' }}
          onClick={handlePlaceDataSave}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default PlaceForm;
