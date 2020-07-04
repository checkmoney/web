import Cookie from 'js-cookie';

export const persistToken = (token: string | null) => {
  if (token) {
    Cookie.set('token', token);
  } else {
    Cookie.remove('token');
  }
};
