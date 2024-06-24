import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { SlLocationPin } from 'react-icons/sl';
import { IoMdClose, IoMdPhotos } from 'react-icons/io';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { id } = useParams();
  const [placeDetails, setPlaceDetails] = useState({});
  const toast = useToast();

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

  const [showMorePhotos, setShowMorePhotos] = useState(false);

  const photos = placeDetails.photos || [];
  const initialPhotos = photos.slice(0, 3);
  const remainingPhotos = photos.slice(3);

  return (
    <Flex p='28px 40px' flexDir='column'>
      <Text fontSize='28px'>{placeDetails.title}</Text>

      <Link
        href={'https://maps.google.com/?q=' + placeDetails.address}
        target='_blank'
        textDecoration='underline'
        style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
      >
        <Icon as={SlLocationPin} />
        <Text>{placeDetails.address}</Text>
      </Link>

      {photos.length > 0 && (
        <>
          <Flex flexDir={{ base: 'column', xl: 'row' }} gap='12px'>
            <Flex gap='4px' position='relative'>
              <Image
                src={`http://localhost:4002/uploads/${initialPhotos[0]}`}
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
                    src={`http://localhost:4002/uploads/${initialPhotos[index]}`}
                    objectFit='cover'
                    width='333px'
                    height='200px'
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

            <Box>hello</Box>
          </Flex>

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
                    src={`http://localhost:4002/uploads/${photo}`}
                    justifySelf='center'
                    objectFit='cover'
                    width={{ base: '300px', md: '500px' }}
                    height={{ base: '220px', lg: '300px' }}
                  />
                ))}
              </SimpleGrid>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
};

export default PlaceDetails;
