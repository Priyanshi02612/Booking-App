import { Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserLarge, FaListUl, FaBuilding } from 'react-icons/fa6';

const pages = [
  {
    name: 'My Profile',
    path: '/account/profile',
    subpage: 'profile',
    icon: FaUserLarge,
  },
  {
    name: 'My Bookings',
    path: '/account/bookings',
    subpage: 'bookings',
    icon: FaListUl,
  },
  {
    name: 'My Accommodations',
    path: '/account/places',
    subpage: 'places',
    icon: FaBuilding,
  },
];

const AccountNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState(() => {
    const foundPage = pages.find((page) =>
      location.pathname.startsWith(page.path)
    );
    return foundPage ? foundPage.subpage : 'profile';
  });

  const [tabIndex, setTabIndex] = useState(() => {
    if (location.pathname.includes('/account/places')) {
      return 2;
    } else if (location.pathname === '/account/bookings') {
      return 1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    const foundIndex = pages.findIndex((page) =>
      location.pathname.startsWith(page.path)
    );
    if (foundIndex !== -1) {
      setTabIndex(foundIndex);
      setActivePage(pages[foundIndex].subpage);
    }
  }, [location]);

  const handleChangePage = (path, subpage, index) => {
    navigate(path);
    setTabIndex(index);
    setActivePage(subpage);
  };

  return (
    <Flex
      mx={{ base: '20px', md: '0' }}
      alignItems={{ base: 'normal', md: 'center' }}
      justifyContent={{ base: 'normal', md: 'center' }}
      gap={{ base: '12px', md: '40px' }}
      flexWrap='wrap'
    >
      {pages.map((page, index) => (
        <Link
          key={index}
          onClick={() => handleChangePage(page.path, page.subpage, index)}
          to={page.path}
          style={{
            backgroundColor:
              activePage === page.subpage ? '#14b8a6' : '#eeeeee',
            color: activePage === page.subpage ? 'white' : 'black',
            borderRadius: '50px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Icon as={page.icon} />
          <Text>{page.name}</Text>
        </Link>
      ))}
    </Flex>
  );
};

export default AccountNavbar;
