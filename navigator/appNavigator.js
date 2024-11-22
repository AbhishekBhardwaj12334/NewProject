import SplashScreen from '../components/splashscreen'
import LoginPage from '../components/loginpage';
import ForgotpasswordPage from '../components/forgotpassword';
import OTPValidation from '../components/otpvalidationpage';
import ResetPassword from '../components/resetpassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from "./bottomNavigator";
import MyAccount from '../components/myAccount';
import SearchMoreComponent from '../components/searchcomponent1';
import BottomNavigatorAdmin from './bottomNavigatorAdmin';
import TermsAndPrivacy from '../components/terms&privacy';
import BasicSearch from '../components/dashboard/basicSearchAdmin';
import AdminSearch from '../components/dashboard/adminSearch';
import GoComponent from '../components/dashboard/goScreen';
import Templates from '../components/Measures/templates';
import WhereIsIt from '../components/Measures/Exterior/exteriorWhere';
import Type from '../components/Measures/Exterior/exteriorType';
import WhereIsItExterior from '../components/Measures/Exterior/exteriorWhere';
import WhereIsItInterior from '../components/Measures/Interior/interiorWhere';
import TypeExterior from '../components/Measures/Exterior/exteriorType';
import WhereIsItSecurity from '../components/Measures/Storm/Security/securityWhere';
import TypeInterior from '../components/Measures/Interior/interiorType';
import FloorInterior from '../components/Measures/Interior/interiorFloor';
import DoorHandlingExterior from '../components/Measures/Exterior/exteriorDoorHandling';
import Sizes from '../components/Measures/sizes';
import TypeSecurity from '../components/Measures/Storm/Security/securityType';
import NonStandard from '../components/Measures/nonStandardSizes';
import AddDetails from '../components/Measures/addDetails';
import Summary from '../components/Measures/summary';
// import { Dropdown } from 'react-native-element-dropdown';
import Dropdown from '../components/Measures/tset';
import WindowsSummary from '../components/Measures/windowSummary';
import MeasuresAddition from '../components/Measures/measuresAddition';
import SummaryAll from '../components/Measures/summary1';
import TypeWindow from '../components/Measures/Windows/windowType';
import WindowFloor from '../components/Measures/Windows/windowFloorLevel';
import WindowHouseLocation from '../components/Measures/Windows/windowHouseLocation';
import WindowUnitNumber from '../components/Measures/Windows/windowUnitNumber';
import ExistingWindow from '../components/Measures/Windows/existingWindow';
import BuildingExterior from '../components/Measures/Windows/buildingExterior';
import ExteriorWindowMeasures from '../components/Measures/Windows/exteriorWindowMeasures';
import InteriorWindow from '../components/Measures/Windows/interiorWindowMeasures';
import WindowsAddDetails from '../components/Measures/Windows/windowsAdditionalDetails';
import NonStandard1 from '../components/Measures/nonStandardSizes';
import NonStandard2 from '../components/Measures/nonStandardE&I';
import JobDetailsPage from '../components/Measures/jobDetailsScreen';
import LangauageIntegrater from '../components/Measures/languageIntegration';
import SettingsScreen from '../components/settings';
import UserDataPage from '../components/usersDataScreen';
import UserDetails from '../components/userDetailsScreen';
import AddUser from '../components/addUser';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >


        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'SplashScreen' }} />
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'SplashScreen' }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'LoginPage' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotpasswordPage} options={{ title: 'Forgot Password' }} />
        <Stack.Screen name="OTP Page" component={OTPValidation} options={{ title: 'OTPValidation' }} />
        <Stack.Screen name="ResetPassword Page" component={ResetPassword} options={{ title: 'Reset Password' }} />       */}
        {/* <Stack.Screen name="BottomNavigation" component={BottomNavigator}/>        
        <Stack.Screen name="SearchMore" component={SearchMoreComponent} options={{ title: 'Account' }} />
        <Stack.Screen name="MyAccount" component={MyAccount} options={{ title: 'Account' }} />
        <Stack.Screen name="AdminNavigator" component={BottomNavigatorAdmin} option={{title: 'Admin_Navigator'}}/>                  
        <Stack.Screen name="Terms&Privacy" component={TermsAndPrivacy} option={{title: 'Privacy'}}/>                  
        <Stack.Screen name="BasicSearch" component={BasicSearch} option={{title: 'BasicSearch'}}/>                  
        <Stack.Screen name="AdminSearch" component={AdminSearch} option={{title: 'AdminSearch'}}/>                   
        <Stack.Screen name="GoScreen" component={GoComponent} option={{title: 'Go Screen'}}/>                  */}
        <Stack.Screen name="JobDetailsPage" component={JobDetailsPage} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Templates" component={Templates} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Response" component={MeasuresAddition} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WhereIsItData" component={WhereIsItExterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="TypeData" component={TypeExterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="DoorHandlingData" component={DoorHandlingExterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Size" component={Sizes} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="NonStandardStorm" component={NonStandard1} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="NonStandardE&I" component={NonStandard2} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="AddDetails" component={AddDetails} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="InteriorWhere" component={WhereIsItInterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="InteriorFloor" component={FloorInterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="InteriorType" component={TypeInterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Storm/SecurityWhere" component={WhereIsItSecurity} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Storm/SecurityType" component={TypeSecurity} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Summary" component={Summary} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="SummaryAll" component={SummaryAll} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowSummary" component={WindowsSummary} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowType" component={TypeWindow} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowFloor" component={WindowFloor} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowLocation" component={WindowHouseLocation} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowUnitNumber" component={WindowUnitNumber} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="ExistingWindow" component={ExistingWindow} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="BuildingExterior" component={BuildingExterior} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="ExteriorWindowMeasures" component={ExteriorWindowMeasures} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="InteriorWindow" component={InteriorWindow} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="WindowsAddDetails" component={WindowsAddDetails} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="LangauageIntegrater" component={LangauageIntegrater} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="UserDataScreen" component={UserDataPage} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetails} option={{ title: 'Go Screen' }} />
        <Stack.Screen name="AddUserScreen" component={AddUser} option={{ title: 'Go Screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AppNavigator;