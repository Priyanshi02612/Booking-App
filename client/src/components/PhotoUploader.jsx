import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { FaUpload, FaTrash, FaStar, FaRegStar } from 'react-icons/fa6';
import { PlaceContext } from '../context/PlaceContext';

const PhotoUploader = () => {
  const {
    placeFormData,
    handleUploadPhotoByLink,
    handleFileSelect,
    handleDeleteImage,
    uploadingPhoto,
    handleSelectMainPhoto,
  } = useContext(PlaceContext);

  const [imageLink, setImageLink] = useState('');

  return (
    <Box>
      <Flex
        gap={{ base: '8px', md: '2px' }}
        alignItems={{ base: 'normal', md: 'center' }}
        mt='12px'
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Input
          type='text'
          placeholder='Add using a link ...jpg'
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />

        <Button
          colorScheme='teal'
          px='50px'
          isLoading={uploadingPhoto}
          onClick={() => {
            handleUploadPhotoByLink(imageLink);
            setImageLink('');
          }}
        >
          Add photo
        </Button>
      </Flex>

      <Flex gap='8px' flexWrap='wrap' mt='20px' alignItems='center'>
        {placeFormData.photos.length > 0 &&
          placeFormData.photos.map((link, index) => (
            <Box key={index} position='relative'>
              <Image
                src={'http://localhost:4002/uploads/' + link}
                w='160px'
                h='150px'
                borderRadius='8px'
                boxShadow='md'
                objectFit='cover'
              />

              <Icon
                as={placeFormData.photos[0] === link ? FaStar : FaRegStar}
                color='white'
                p='4px'
                w='20px'
                h='20px'
                backgroundColor='black'
                borderRadius='4px'
                opacity='0.8'
                cursor='pointer'
                position='absolute'
                bottom='4px'
                left='4px'
                onClick={() => handleSelectMainPhoto(link)}
              />

              <Icon
                as={FaTrash}
                color='white'
                p='4px'
                w='20px'
                h='20px'
                backgroundColor='black'
                borderRadius='4px'
                opacity='0.8'
                cursor='pointer'
                position='absolute'
                bottom='4px'
                right='4px'
                onClick={() => handleDeleteImage(link, placeFormData)}
              />
            </Box>
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
    </Box>
  );
};

export default PhotoUploader;
