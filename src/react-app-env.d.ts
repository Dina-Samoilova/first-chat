/// <reference types="react-scripts" />
declare module 'react-notifications';
declare var google: any;

interface User {
  id: number,
  name: string,
  email: string,
  picture: string,
  password: string,
  status: string,
}

interface UserGoogle {
  name: string,
  email: string,
  picture: string,
}

interface Message {
  id: number,
  userId: number,
  ["to-userId"]: number,
  ["create-at"]: string | Date,
  message: string,
}

interface Joke {
  value: string,
}
