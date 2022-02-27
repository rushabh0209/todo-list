import Cookies from 'js-cookie';

export const setCookies = async (key, value, expires) => {
  await Cookies.set(key, value, { expires });
};

export const getCookies = async (key) => {
  return await Cookies.get(key);
};

export const removeCookies = async (key) => {
  await Cookies.remove(key);
};
