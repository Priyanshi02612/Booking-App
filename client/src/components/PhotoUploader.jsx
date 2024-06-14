import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa6';

const PhotoUploader = ({
  placeFormData,
  handleUploadPhotoByLink,
  handleFileSelect,
}) => {
  const [imageLink, setImageLink] = useState('');

  return (
    <Box>
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
            <div key={index}>
              <Image
                src={'http://localhost:4002/uploads/' + link}
                w='250px'
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
    </Box>
  );
};

export default PhotoUploader;
