import React from 'react'
import axios from 'axios'
import Router from './Router';
import { useEffect } from 'react';
import { AuthContextProvider } from './context/auth-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useSettingStore from './context/useSettingStore';

axios.defaults.withCredentials = true;

export default function App() {
  const gTheme = useSettingStore((state) => state.theme);

  useEffect(() => {
    console.log('using useffect. theme is ' + gTheme)
    if (gTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [gTheme])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
          <Router/>
      </AuthContextProvider>
    </LocalizationProvider>
)}