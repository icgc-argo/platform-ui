// @flow
import Cookies from 'js-cookie';
import Router from 'next/router';
import { EGO_JWT_KEY } from 'global/constants';

export default function logOut() {
  Cookies.remove(EGO_JWT_KEY);
  Router.push('/');
}
