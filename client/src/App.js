import React from 'react'
import axios from 'axios'
import Router from './router';
import { AuthContextProvider } from './context/auth-context';

axios.defaults.withCredentials = true;

export default function App() {

  return (

    <AuthContextProvider>
      <Router/>
    </AuthContextProvider>
)}