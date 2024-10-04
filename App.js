import React from "react";
import { } from 'react-native';
import { Provider } from 'react-redux';
import store from './components/redux/store'
import MainApp from "./components/MainApp";
import AppNavigator from "./navigator/appNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}
export default App;