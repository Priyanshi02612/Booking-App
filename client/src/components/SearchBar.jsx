import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const SearchBar = () => {
  return (
    <Flex
      border='1px solid'
      borderColor='#d1d5db'
      borderRadius='9999px'
      py='8px'
      mx={{ base: '16px', lg: '0' }}
      px={{ base: '8px', md: '20px' }}
      gap={{ base: '8px', lg: '16px' }}
      alignItems='center'
      justifyContent='center'
      boxShadow='0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    >
      <Text py='12px'>Anywhere</Text>

      <Text
        px={{ base: '8px', md: '12px' }}
        borderLeft='1px'
        borderColor='#d1d5db'
      >
        Any week
      </Text>

      <Text
        px={{ base: '8px', md: '12px' }}
        borderLeft='1px'
        borderColor='#d1d5db'
        textColor='#64748b'
        cursor='pointer'
      >
        Add guests
      </Text>

      <Button
        bgColor='#14b8a6'
        color='white'
        _hover={{ backgroundColor: '#2da195' }}
        borderRadius='50%'
        p='10px'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='size-6'
        >
          <path
            fillRule='evenodd'
            d='M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z'
            clipRule='evenodd'
          />
        </svg>
      </Button>
    </Flex>
  );
};

export default SearchBar;
