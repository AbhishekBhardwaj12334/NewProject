import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const NavigateBackHandler = ({ templateId, step }) => {
    const navigation = useNavigation();
    const details = useSelector(state => state.measuresData.doorWindowData);
    console.log(details)

    const handleBackNavigation = () => {
        switch (templateId) {
            case '01': // Template 1
                switch (step) {
                    case -1:
                        navigation.navigate('Response');
                        break;
                    case 0:
                        navigation.navigate('WhereIsItData');
                        break;
                    case 1:
                        navigation.navigate('TypeData');
                        break;
                    case 2:
                        navigation.navigate('Size');
                        break;
                    case 3:
                        navigation.navigate('AddDetails');
                        break;
                    default:
                        navigation.goBack();
                        break;
                }
                break;

            case '02': // Template 2
                switch (step) {
                    case -1:
                        navigation.navigate('Response');
                        break;
                    case 0:
                        navigation.navigate('WhereIsItData');
                        break;
                    case 1:
                        navigation.navigate('TypeData');
                        break;
                    case 2:
                        navigation.navigate('DoorHandlingData');
                        break;
                    case 3:
                        if (details?.selectedOptions[1]?.optionId == 1) {
                            navigation.navigate('Size');
                        } else {
                            navigation.navigate('NonStandardE&I');
                        }
                        break;
                    case 4:
                        navigation.navigate('AddDetails');
                        break;
                    default:
                        navigation.goBack();
                        break;
                }
                break;

            case '03': // Template 3 with separate logic
                switch (step) {
                    case -1:
                        navigation.navigate('Response');
                        break;
                    case 0:
                        navigation.navigate('WindowType');
                        break;
                    case 1:
                        navigation.navigate('WindowFloor');
                        break;
                    case 2:
                        navigation.navigate('WindowLocation');
                        break;
                    case 3:
                        navigation.navigate('WindowUnitNumber');
                        break;
                    case 4:
                        navigation.navigate('ExistingWindow');
                        break;
                    case 5:
                        navigation.navigate('BuildingExterior');
                        break;
                    case 6:
                        navigation.navigate('ExteriorWindowMeasures');
                        break;
                    case 7:
                        navigation.navigate('InteriorWindow');
                        break;
                    case 8:
                        navigation.navigate('WindowsAddDetails');
                        break;
                    default:
                        navigation.goBack();
                        break;
                }
                break;

            default:
                navigation.goBack(); // fallback if templateId not found
                break;
        }
    };

    return { handleBackNavigation };
};

export default NavigateBackHandler
