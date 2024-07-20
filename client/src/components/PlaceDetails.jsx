import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  SimpleGrid,
  Box,
  Divider,
  Input,
  Select,
} from '@chakra-ui/react';
import { SlLocationPin } from 'react-icons/sl';
import { IoMdArrowDropright, IoMdClose, IoMdPhotos } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import { differenceInCalendarDays } from 'date-fns';
import { API_BASE_URL } from '../config';

const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [placeDetails, setPlaceDetails] = useState({});
  const [bookingDetails, setBookingDetails] = useState({
    place: {},
    name: '',
    contact: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 1,
    userId: '',
    price: 0,
  });
  
  const [bookingPlace, setBookingPlace] = useState(false);

  useEffect(() => {
    if (user) {
      setBookingDetails({ ...bookingDetails, name: user.name });
    }
  }, [user]);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) {
        return;
      }

      const response = await axios.get(`/place/${id}`);

      if (response.data.success === false) {
        toast({
          title: response.data.message,
          status: 'error',
          isClosable: true,
          duration: 2000,
        });
      } else {
        setPlaceDetails(response.data.data);
      }
    };

    fetchPlace();
  }, [id]);

  useEffect(() => {
    setBookingDetails((prevBookingDetails) => ({
      ...prevBookingDetails,
      userId: placeDetails?.userId,
    }));
  }, [placeDetails]);
 
  const photos = placeDetails.photos || [];
  const initialPhotos = photos.slice(0, 3);
  const remainingPhotos = photos.slice(3);

  let numberOfNights = 0;

  if (bookingDetails.checkIn && bookingDetails.checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(bookingDetails.checkOut),
      new Date(bookingDetails.checkIn)
    );
  }

  useEffect(() => {
    setBookingDetails({
      ...bookingDetails,
      price: numberOfNights * placeDetails.pricePerNight,
    });
  }, [numberOfNights]);

  const handleBookPlace = async () => {
    try {
      setBookingPlace(true);

      const response = await axios.post('/bookplace/booking', {
        data: { ...bookingDetails, place: placeDetails },
      });

      const bookingId = response.data.data._id;

      if (response.data.success === true) {
        toast({
          title: response.data.message,
          status: 'success',
          isClosable: true,
          duration: 3000,
        });
      }

      setBookingDetails({
        place: {},
        name: '',
        contact: '',
        checkIn: '',
        checkOut: '',
        price: 0,
        maxGuests: 1,
      });

      setBookingPlace(false);

    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });

      setBookingPlace(false);
    }
  };

  return (
    <Flex p='28px 40px' flexDir='column'>
      <Text fontSize='28px' color='teal' fontWeight='500'>
        {placeDetails.title}
      </Text>

      <Link
        href={'https://maps.google.com/?q=' + placeDetails.address}
        target='_blank'
        textDecoration='underline'
        style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
      >
        <Icon as={SlLocationPin} color='teal' w='20px' h='20px' />

        <Text>{placeDetails.address}</Text>
      </Link>

      {photos.length > 0 && (
        <>
          <Flex flexDir={{ base: 'column', xl: 'row' }} gap='12px' mt='12px'>
            <Flex gap='4px' position='relative'>
              <Image
                src={`${API_BASE_URL}/uploads/${initialPhotos[0]}`}
                objectFit='cover'
                width={{ base: '344px', md: '448px', lg: '600px' }}
                height={{ base: '234px', md: 'auto' }}
                borderRadius='16px'
              />

              <Flex
                flexDir='column'
                gap='4px'
                display={{ base: 'none', md: 'flex' }}
              >
                {[1, 2].map((index) => (
                  <Image
                    key={index}
                    src={`${API_BASE_URL}/uploads/${initialPhotos[index]}`}
                    objectFit='cover'
                    width='333px'
                    height='224px'
                    borderRadius='16px'
                  />
                ))}
              </Flex>

              {remainingPhotos.length > 0 && !showMorePhotos && (
                <Icon
                  as={IoMdPhotos}
                  w='32px'
                  h='32px'
                  position='absolute'
                  bottom='8px'
                  left='8px'
                  color='white'
                  cursor='pointer'
                  onClick={() => setShowMorePhotos(true)}
                />
              )}
            </Flex>

            <Box flex='1'>
              <Flex
                flexDir={{
                  base: 'column',
                  lg: 'row',
                  xl: 'column',
                  '2xl': 'row',
                }}
                gap='12px'
              >
                <Box>
                  <Text fontSize='24px' fontWeight='500' color='teal'>
                    Description
                  </Text>

                  <Text textOverflow='ellipsis' overflow='hidden' noOfLines='4'>
                    {placeDetails.description}
                  </Text>

                  <Flex
                    alignItems='center'
                    onClick={() => setShowDetails(true)}
                    cursor='pointer'
                  >
                    <Text
                      textDecoration='underline'
                      fontWeight='400'
                      color='teal'
                    >
                      Read more details
                    </Text>

                    <Icon
                      as={IoMdArrowDropright}
                      w='24px'
                      h='24px'
                      color='teal'
                    />
                  </Flex>
                </Box>

                <Flex
                  flexDir='column'
                  p='12px'
                  borderRadius='8px'
                  gap='8px'
                  mt={{ base: '20px', '2xl': '0px' }}
                >
                  <Text textAlign='center'>
                    Price:
                    <b style={{ color: 'teal', fontSize: '20px' }}>
                      ${placeDetails.pricePerNight}
                    </b>
                    /per night
                  </Text>

                  <Box
                    p='4px'
                    borderRadius='4px'
                    border='1px solid'
                    borderColor='#d1d5db'
                  >
                    <Flex
                      alignItems={{ base: 'left', md: 'center' }}
                      flexDir={{ base: 'column', md: 'row' }}
                    >
                      <Box bg='white' p='6px' flex='1'>
                        <Text>Check-in:</Text>

                        <Input
                          flex='1'
                          size='md'
                          type='date'
                          value={bookingDetails.checkIn}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              checkIn: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box
                        bg='white'
                        p='6px'
                        flex='1'
                        borderLeft={{ base: '0px', md: '1px solid' }}
                        borderLeftColor={{ base: '#fff', md: '#d1d5db' }}
                      >
                        <Text>Check-out:</Text>

                        <Input
                          flex='1'
                          size='md'
                          type='date'
                          value={bookingDetails.checkOut}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              checkOut: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Flex>
                    <Box bg='white' p='4px'>
                      <Text>Name:</Text>

                      <Input
                        flex='1'
                        size='md'
                        type='text'
                        value={bookingDetails.name}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            name: e.target.value,
                          })
                        }
                      />
                    </Box>

                    <Box bg='white' p='4px'>
                      <Text>Contact number:</Text>

                      <Input
                        flex='1'
                        size='md'
                        type='tel'
                        value={bookingDetails.contact}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            contact: e.target.value,
                          })
                        }
                      />
                    </Box>

                    <Flex p='6px' bg='white' gap='8px' alignItems='center'>
                      <Text>No. of guests:</Text>

                      <Select
                        flex='1'
                        value={bookingDetails.maxGuests}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            maxGuests: e.target.value,
                          })
                        }
                      >
                        {Array.from({ length: placeDetails.maxGuests }).map(
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </Select>
                    </Flex>
                  </Box>

                  <Button
                    colorScheme='teal'
                    onClick={handleBookPlace}
                    gap='4px'
                    isLoading={bookingPlace}
                  >
                    <Text>Reserve </Text>

                    {bookingDetails.price > 0 && (
                      <Text>${bookingDetails.price}</Text>
                    )}
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Box mt='12px'>
            <Text fontSize='24px' fontWeight='500' color='teal'>
              Extra info.
            </Text>
            <Text>{placeDetails.extraInfo}</Text>
          </Box>

          <Modal isOpen={showMorePhotos} size='full'>
            <ModalOverlay />

            <ModalContent p='24px' backgroundColor='#000000c7'>
              <Flex justifyContent='space-between' mb='12px'>
                <Text fontSize='28px' color='whitesmoke'>
                  {placeDetails.title} Photos
                </Text>

                <Button
                  onClick={() => setShowMorePhotos(false)}
                  colorScheme='teal'
                  size='sm'
                  gap='4px'
                >
                  <Icon as={IoMdClose} w='20px' h='20px' />

                  <Text display={{ base: 'none', md: 'block' }}>
                    Close photos
                  </Text>
                </Button>
              </Flex>

              <SimpleGrid
                spacing={5}
                columns={{ base: '1', md: '2', lg: '3', xl: '4' }}
              >
                {placeDetails.photos.map((photo, index) => (
                  <Image
                    key={index}
                    src={`${API_BASE_URL}/uploads/${photo}`}
                    justifySelf='center'
                    objectFit='cover'
                    width={{ base: '300px', md: '500px' }}
                    height={{ base: '220px', lg: '300px' }}
                  />
                ))}
              </SimpleGrid>
            </ModalContent>
          </Modal>

          <Modal isOpen={showDetails}>
            <ModalOverlay />
            <ModalContent p='24px'>
              <Flex justifyContent='space-between' mb='12px'>
                <Text fontSize='28px'>Description</Text>

                <Button
                  onClick={() => setShowDetails(false)}
                  colorScheme='teal'
                  size='sm'
                  gap='4px'
                >
                  <Icon as={IoMdClose} w='20px' h='20px' />
                </Button>
              </Flex>

              <Divider borderColor='teal' borderWidth='1px' />

              <Text mt='12px'>{placeDetails.description}</Text>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
};

export default PlaceDetails;
