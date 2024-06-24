import { Box, Image, Text, Card, Stack, CardBody } from '@chakra-ui/react';
import React from 'react';

const UsersPlace = ({ place }) => {
  const photos = place.photos.map(
    (photo) => 'http://localhost:4002/uploads/' + photo
  );

  return (
    <Card maxW='sm'>
      <CardBody justifyContent='center' mt='0' boxShadow='md'>
        <Image
          src={photos[0]}
          boxShadow='md'
          w='100%'
          height='150px'
          borderRadius='8px'
          objectFit='cover'
        />

        <Stack mt='6' spacing='3' width='300px' height='200px'>
          <Text fontSize='24px' fontWeight='bold'>
            {place.title}
          </Text>
          <Box
            fontSize='14px'
            w='100%'
            overflow='hidden'
            textOverflow='ellipsis'
            noOfLines='6'
          >
            {place.description}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UsersPlace;
