import React from 'react';
import { } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './userDataSlice';
import userDataSlice1 from './terms&privacy1';
import userDataSlice2 from './measures';
import userDataSlice3 from './ext&intOption';
import userDataSlice4 from './stormOptions'
import userDataSlice5 from './windowOptions'

const store = configureStore({
  reducer: {
    userData: userDataSlice,
    legalDisclamer: userDataSlice1,
    measuresData: userDataSlice2,
    exteriorOptionsData: userDataSlice3,
    stormsecurityOptionsData: userDataSlice4,
    windowOptionsData: userDataSlice5
  },
});

export default store;