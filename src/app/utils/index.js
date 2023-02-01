import client from "../apollo";
import { AUTH_TOKEN } from "../constants";

export const handleLogout = async () => {
  localStorage.removeItem(AUTH_TOKEN);
  client.clearStore();
};

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
  };


export const requiredMessage = (fieldName) => `${fieldName} is required.`;

