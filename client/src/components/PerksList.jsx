import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import {
  FaWifi,
  FaSquareParking,
  FaCat,
  FaTv,
  FaArrowRightToBracket,
  FaRadio,
} from 'react-icons/fa6';
import { PlaceContext } from '../context/PlaceContext';

const perksList = [
  { title: 'Wifi', icon: FaWifi, value: 'wifi' },
  { title: 'Free parking spot', icon: FaSquareParking, value: 'parking' },
  { title: 'Pets', icon: FaCat, value: 'pets' },
  { title: 'TV', icon: FaTv, value: 'tv' },
  { title: 'Radio', icon: FaRadio, value: 'radio' },
  { title: 'Private entrance', icon: FaArrowRightToBracket, value: 'entrance' },
];

const PerksList = () => {
  const { selectedPerks, handleAddPerks } = useContext(PlaceContext);

  return (
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
              name={perk.value}
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
  );
};

export default PerksList;
