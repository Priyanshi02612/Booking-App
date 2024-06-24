import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { React, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from './UserContext';

export const PlaceContext = createContext();

const PlaceContextProvider = ({ children }) => {
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const { user } = useContext(UserContext);

  const toast = useToast();
  const navigate = useNavigate();

  const [placeFormData, setPlaceFormData] = useState({
    title: '',
    address: '',
    photos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: 0,
    checkOut: 0,
    maxGuests: 1,
    userId: '',
    pricePerNight: 100,
  });

  useEffect(() => {
    if (user) {
      setPlaceFormData({ ...placeFormData, userId: user._id });
    }
  }, [user]);

  const handleAddPerks = (e, perkValue) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPerks([...selectedPerks, perkValue]);
    } else {
      setSelectedPerks(selectedPerks.filter((perk) => perk !== perkValue));
    }
  };

  useEffect(() => {
    setPlaceFormData({ ...placeFormData, perks: selectedPerks });
  }, [selectedPerks]);

  const handlePlaceDataSave = async (id) => {
    try {
      if (id) {
        const response = await axios.put(`/user-place/updateplace`, {
          id,
          placeFormData,
        });
        if (response.status === 200) {
          toast({
            title: response.data.message,
            status: 'success',
            isClosable: true,
            duration: 2000,
          });
        }
      } else {
        const response = await axios.post(
          '/user-place/addplace',
          placeFormData
        );
        if (response.status === 200) {
          toast({
            title: response.data.message,
            status: 'success',
            isClosable: true,
            duration: 2000,
          });
        }
      }

      setPlaceFormData({
        title: '',
        address: '',
        photos: [],
        description: '',
        perks: [],
        extraInfo: '',
        checkIn: 0,
        checkOut: 0,
        maxGuests: 1,
        userId: '',
        pricePerNight: 0,
      });

      setSelectedPerks([]);

      navigate('/account/places');
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const handleUploadPhotoByLink = async (imageLink) => {
    try {
      setUploadingPhoto(true);

      const response = await axios.post('/upload/upload-by-link', {
        imageLink: imageLink,
      });

      const { filename } = response.data;

      setPlaceFormData({
        ...placeFormData,
        photos: [...placeFormData.photos, filename],
      });

      setUploadingPhoto(false);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'warning',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
      const response = await axios.post('/upload/upload-by-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedFiles = response.data.files;

      setPlaceFormData((prevState) => ({
        ...prevState,
        photos: [...prevState.photos, ...uploadedFiles],
      }));
    } catch (error) {
      console.error('Error handling file select:', error);
    }
  };

  const handleDeleteImage = async (filename, placeData) => {
    const response = await axios.delete(`/upload/delete-image`, {
      data: { file: filename, data: placeData },
    });

    setPlaceFormData((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((photo) => photo !== filename),
    }));

    if (response.status === 200) {
      toast({
        title: response.data.message,
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const handleSelectMainPhoto = (link) => {
    setPlaceFormData((prevState) => ({
      ...prevState,
      photos: [link, ...prevState.photos.filter((photo) => photo !== link)],
    }));
  };

  return (
    <PlaceContext.Provider
      value={{
        placeFormData,
        setPlaceFormData,
        setSelectedPerks,
        handleAddPerks,
        handlePlaceDataSave,
        handleUploadPhotoByLink,
        handleFileSelect,
        handleDeleteImage,
        selectedPerks,
        uploadingPhoto,
        handleSelectMainPhoto,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
export default PlaceContextProvider;
