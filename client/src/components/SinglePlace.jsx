import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

const SinglePlace = ({ place }) => {
  return (
    <Flex
      flexDirection='column'
      gap='8px'
      justifySelf='center'
      width='fit-content'
    >
      <Image
        src={'http://localhost:4002/uploads/' + place.photos[0]}
        w={{ base: '300px', md: '212px', lg: '250px' }}
        h='200px'
        borderRadius='12px'
      />

      <Flex alignItems='center' justifyContent='space-between' px='4px'>
        <Text
          w={{ base: '140px', lg: '130px', '2xl': '180px' }}
          overflow='hidden'
          textOverflow='ellipsis'
          style={{ textWrap: 'nowrap' }}
          fontWeight='bold'
        >
          {place.title}
        </Text>

        <Flex gap='2px' alignItems='center'>
          <Icon as={FaStar} w='12px' h='12px' />

          <Text fontSize='14px'>0.5</Text>
        </Flex>
      </Flex>

      <Text
        px='4px'
        w='200px'
        overflow='hidden'
        textOverflow='ellipsis'
        color='gray'
        fontSize='14px'
        style={{ textWrap: 'nowrap' }}
      >
        {place.address}
      </Text>

      <Flex px='4px' gap='4px' alignItems='center'>
        <Text bg='lightgray' borderRadius='4px' p='2px 4px' fontWeight='600'>
          ${place.pricePerNight}
        </Text>
        <Text>per night</Text>
      </Flex>
    </Flex>
  );
};

export default SinglePlace;
