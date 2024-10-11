import React from "react";
import { } from 'react-native';
import { Provider } from 'react-redux';
import store from './components/redux/store'
import MainApp from "./components/MainApp";
import { realmConfig } from "./components/realmConfig";

const App = () => {
  const { RealmProvider } = realmConfig
  return (
    <Provider store={store}>
      <RealmProvider>
        <MainApp />
      </RealmProvider>
    </Provider>
  )
}
export default App;