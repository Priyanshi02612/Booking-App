import axios from 'axios';
import { API_BASE_URL } from '../config';

export class UserService {
  static login = async (userLoginData) => {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`,
      userLoginData
    );
    return response.data;
  };

  static register = async (registrationData) => {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      registrationData
    );
    return response.data;
  };
}
