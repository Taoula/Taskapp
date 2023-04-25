import React from 'react'
import axios from 'axios'
import Router from './Router';
import { AuthContextProvider } from './context/auth-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

axios.defaults.withCredentials = true;

export default function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
          <Router/>
      </AuthContextProvider>
    </LocalizationProvider>
)}