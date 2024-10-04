import React from 'react';
import { View, Text } from 'react-native'; // Import specific components from react-native
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../globaconstants';

const initialState = {
  legalDisclamer: '',
  loading: false,
  data: null, // Define 'data' in the initial state
  error: null, // Define 'error' in the initial state
};

export const fetchUserData1 = createAsyncThunk('legalDisclamer/fetchData', async () => {
  const apiUrl = `${BaseURL}profile/App/legal`;
  const subscriptionKey = "8861dd1b63444e7c8ee5c647c1528149";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 200) {
      return response.data; // Return only the data from the response
    } else {
      throw new Error('Error Fetching Data. Status Code: ' + response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

const userDataSlice1 = createSlice({
  name: 'legalDisclamer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData1.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Assign the payload directly to 'data'
      })
      .addCase(fetchUserData1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error Fetching Data';
        console.log(state);
      });
  },
});

export default userDataSlice1.reducer;
