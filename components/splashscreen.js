import React, { useEffect, useState } from "react";
import { View, Image } from 'react-native';
import { realmConfig } from "./realmConfig";
import { useDispatch, useSelector } from "react-redux";
import { addAppLanguage } from "./redux/measures";
import i18next from "i18next";
const { useRealm } = realmConfig;

const SplashScreen = ({ navigation }) => {
  const realm = useRealm();
  const dispatch = useDispatch();
  const [showLanguageIntegrator, setShowLanguageIntegrator] = useState(false);
  const appLanguage = useSelector(state => state.measuresData?.allMeasures?.appLanguage)

  useEffect(() => {
    const appLanguageSchema = realm.objects('AppLanguage');
    console.log(appLanguageSchema)
    if (appLanguageSchema.length === 0) {
      setShowLanguageIntegrator(true);
    } else {
      const languageValue = appLanguageSchema[0];
      console.log('shcdjsjncsd', languageValue)
      dispatch(addAppLanguage(languageValue));
      i18next.changeLanguage(languageValue.languageKey);
    }

    const timeout = setTimeout(() => {
      if (showLanguageIntegrator) {
        navigation.navigate('LangauageIntegrater');
      } else {
        navigation.navigate('JobDetailsPage');
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigation, dispatch, showLanguageIntegrator, realm]); // Add dependencies to useEffect

  return (
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/images/SplashScreen1.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
    </View>
  );
}

export default SplashScreen;