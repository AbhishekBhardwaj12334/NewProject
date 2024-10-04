import React from 'react';
import {} from 'react-native';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../globaconstants';

const initialState = {
  userData: '',
  loading: false,
};

export const fetchUserData = createAsyncThunk('userData/fetchData', async (userId) => {
  const apiUrl = `${BaseURL}profile/user/${userId}/profile`;
  const subscriptionKey = "8861dd1b63444e7c8ee5c647c1528149";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error Fetching Data. Status Code: ' + response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error Fetching Data';
        console.log(state)
      });
  },
});

export default userDataSlice.reducer;
