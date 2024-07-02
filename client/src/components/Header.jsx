import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { UserContext } from '../context/UserContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    <Box>
      <Flex
        mt='20px'
        mx='20px'
        justifyContent='space-between'
        alignItems='center'
      >
        <Link
          to={'/'}
          style={{
            display: 'flex',
            gap: '4px',
          }}
        >
          <Image src={logo} w='50px' h='50px' />

          <Text
            fontWeight='bold'
            fontSize={{ base: '24px', md: '40px' }}
            textColor='#14b8a6'
            className='great-vibes-regular'
          >
            Bookatrip
          </Text>
        </Link>

        {location.pathname === '/' && (
          <Box display={{ base: 'none', md: 'block' }}>
            <SearchBar />
          </Box>
        )}

        <Link
          to={user ? '/account/profile' : '/login'}
          style={{
            display: 'flex',
            gap: '12px',
            border: '1px solid #d1d5db',
            alignItems: 'center',
            borderRadius: '50px',
            padding: '6px 16px',
            cursor: 'pointer',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
            style={{
              width: '30px',
              height: '30px',
            }}
          >
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
              clipRule='evenodd'
            />
          </svg>

          <Box
            bgColor='#d1d5db'
            textColor='white'
            p='4px'
            borderRadius='50%'
            border='1px solid'
            borderColor='#d1d5db'
            overflow='hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
              style={{
                width: '30px',
                height: '30px',
                position: 'relative',
                top: '6px',
              }}
            >
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                clipRule='evenodd'
              />
            </svg>
          </Box>
          {!!user && <Text>{user.name}</Text>}
        </Link>
      </Flex>

      {location.pathname === '/' && (
        <Box display={{ base: 'block', md: 'none' }} mt='20px'>
          <SearchBar />
        </Box>
      )}
    </Box>
  );
};

export default Header;
