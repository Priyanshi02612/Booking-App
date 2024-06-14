import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaPlus,
  FaUpload,
  FaWifi,
  FaSquareParking,
  FaCat,
  FaTv,
  FaArrowRightToBracket,
  FaRadio,
} from 'react-icons/fa6';

const perksList = [
  { title: 'Wifi', icon: FaWifi, value: 'wifi' },
  { title: 'Free parking spot', icon: FaSquareParking, value: 'parking' },
  { title: 'Pets', icon: FaCat, value: 'pets' },
  { title: 'TV', icon: FaTv, value: 'tv' },
  { title: 'Radio', icon: FaRadio, value: 'radio' },
  { title: 'Private entrance', icon: FaArrowRightToBracket, value: 'entrance' },
];

const PlacesPage = () => {
  const { action } = useParams();

  const [placeFormData, setPlaceFormData] = useState({
    title: '',
    address: '',
    photos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: 0,
    checkOut: 0,
    maxGuests: 0,
  });
  const [imageLink, setImageLink] = useState('');
  const [selectedPerks, setSelectedPerks] = useState([]);

  const handlePlaceDataSave = () => {
    setPlaceFormData({
      title: '',
      address: '',
      photos: [],
      description: '',
      perks: [],
      extraInfo: '',
      checkIn: 0,
      checkOut: 0,
      maxGuests: 0,
    });

    setSelectedPerks([]);

    console.log({ placeFormData });
  };

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

  const handleUploadPhotoByLink = async () => {
    try {
      const response = await axios.post('/upload-by-link', {
        imageLink: imageLink,
      });

      const { filename } = response.data;

      setPlaceFormData({
        ...placeFormData,
        photos: [...placeFormData.photos, filename],
      });
      setImageLink('');
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

      const response = await axios.post('/upload', formData, {
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
    <div>
      {action !== 'new' && (
        <Flex mt='20px' justifyContent='center'>
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
        <Flex flexDir='column' gap='20px' p='24px'>
          <FormControl>
            <FormLabel>Title</FormLabel>

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
            <FormLabel>Address</FormLabel>

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
            <FormLabel>Photos</FormLabel>

            <FormHelperText>more = better</FormHelperText>

            <Flex gap='2px' alignItems='center' mt='12px'>
              <Input
                type='text'
                placeholder='Add using a link ...jpg'
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />

              <Button
                bgColor='#14b8a6'
                color='white'
                px='50px'
                _hover={{ backgroundColor: '#2da195' }}
                onClick={handleUploadPhotoByLink}
              >
                Add photo
              </Button>
            </Flex>

            <Flex gap='8px' flexWrap='wrap' mt='20px' alignItems='center'>
              {placeFormData.photos.length > 0 &&
                placeFormData.photos.map((link, index) => (
                  <div key={index}>
                    <Image
                      src={'http://localhost:4002/uploads/' + link}
                      w='150px'
                      h='150px'
                      borderRadius='8px'
                      objectFit='cover'
                    />
                  </div>
                ))}

              <Flex
                gap='8px'
                alignItems='center'
                fontWeight='normal'
                backgroundColor='#f3f3f3'
                borderRadius='8px'
                padding='8px 16px'
                cursor='pointer'
                height='fit-content'
                onClick={() => document.getElementById('fileInput').click()}
              >
                <Input
                  type='file'
                  display='none'
                  name='photo'
                  id='fileInput'
                  onChange={(e) => handleFileSelect(e)}
                  multiple
                />

                <Icon as={FaUpload} />

                <Text fontSize='14px'>Upload</Text>
              </Flex>
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>

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
            <FormLabel>Perks</FormLabel>

            <FormHelperText>select all the perks of your place</FormHelperText>

            <CheckboxGroup colorScheme='teal'>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2} mt='12px'>
                {perksList.map((perk, index) => (
                  <Box
                    key={index}
                    border='1px solid #d1d5db'
                    borderRadius='8px'
                    padding={{ base: '8px 16px ', md: '8px 24px' }}
                    _hover={{ backgroundColor: '#f3f3f3' }}
                  >
                    <Checkbox
                      value={perk.value}
                      isChecked={selectedPerks.includes(perk.value)}
                      onChange={(e) => handleAddPerks(e, perk.value)}
                    >
                      <Flex gap='8px' alignItems='center'>
                        <Icon as={perk.icon} />

                        <Text>{perk.title}</Text>
                      </Flex>
                    </Checkbox>
                  </Box>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Extra info</FormLabel>

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
            <FormLabel>Check in&out times</FormLabel>

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
                  value={
                    placeFormData.maxGuests === 0 ? '' : placeFormData.maxGuests
                  }
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

          <Button
            bgColor='#14b8a6'
            color='white'
            px='50px'
            width='15%'
            _hover={{ backgroundColor: '#2da195' }}
            onClick={handlePlaceDataSave}
          >
            Save
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default PlacesPage;
