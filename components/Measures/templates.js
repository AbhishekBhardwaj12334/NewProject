import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, ImageBackground, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTemplate, clearTemplate, addQuestions, updatedFetchedDetails } from '../redux/measures';
import { useIsFocused } from '@react-navigation/native';
import { questionsExterior, questionsInterior, questionsSecurity } from './questionPage';
import Fonts from '../../src/fonts/fonts';
import { realmConfig } from '../realmConfig';
import { useTranslation } from 'react-i18next';
const { useQuery, useRealm } = realmConfig

const Templates = ({ navigation }) => {
    const realm = useRealm();
    const fetchedDetails = useSelector(state => state.measuresData?.allMeasures?.fetchedDetails);
    const { t } = useTranslation();
    let queryData = useQuery('MeasuresResponse')
    const templatesData = [
        { templateId: '01', value: 'Storm/Security' },
        { templateId: '02', value: 'Exterior/Interior Doors' },
        { templateId: '03', value: 'Windows' },
    ];
    const templateName = useSelector(state => state.measuresData.windowResponse);
    console.log('sjajhsa', JSON.stringify(templateName));
    const Questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    // console.log('Questions', Questions);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // Step 2: Clear template when the screen is focused
    useEffect(() => {
        if (isFocused) {
            dispatch(clearTemplate());
        }
    }, [isFocused, dispatch]);

    useEffect(() => {
        const fetchRealmData = () => {
            if (queryData && queryData.length > 0) {
                try {
                    const fetchedData = queryData.map(item => item.toJSON());
                    const detailsArray = fetchedData.map(item => JSON.parse(item.details));

                    console.log('Fetched Realm Data:', detailsArray);

                    // Directly dispatch updatedFetchedDetails with the new detailsArray
                    dispatch(updatedFetchedDetails(detailsArray));
                    console.log('Data added to the reducer')
                } catch (error) {
                    console.error('Error parsing details:', error);
                }
            } else {
                console.log('No data found in Realm');
            }
        };

        fetchRealmData();
    }, [queryData, dispatch]);


    const handleBack = () => {
        navigation.navigate('JobDetailsPage');
    }


    const renderTemplate = ({ item }) => {
        const handleClick = () => {
            dispatch(selectTemplate({ templateId: item.templateId, value: item.value }));
            switch (item.templateId) {
                case '01':
                    dispatch(addQuestions(questionsSecurity));
                    break;
                case '02':
                    dispatch(addQuestions(questionsExterior));
                    break;
                case '03':
                    dispatch(addQuestions(questionsInterior));
                    break;
                default:
                    console.log('Template not recognized');
            }

            // Navigate to Response screen
            navigation.navigate('Response');
        };

        return (
            <View style={{ margin: 10 }}>
                <TouchableOpacity
                    style={{ paddingVertical: 20, backgroundColor: 'black', borderRadius: 8, paddingHorizontal: 15 }}
                    onPress={handleClick}
                >
                    <Text style={{ fontSize: 16, color: 'white' }}>{item.value}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#4899F1" }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight, paddingHorizontal: 15, paddingBottom: 15 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../../assets/icons/arrowright_.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}

                        />
                    </TouchableOpacity>
                    <Text
                        style={{ flex: 1, fontSize: 26, fontFamily: Fonts.FONTS_MEDIUM, color: '#000' }}
                        numberOfLines={1}
                    >
                        {t("measures")}
                    </Text>
                    {/* <TouchableOpacity style={styles.viewJobBtn}>
                        <Text style={styles.btnText}>View Job</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 8 }}>
                    <FlatList
                        data={templatesData}
                        renderItem={renderTemplate}
                        keyExtractor={(item) => item.templateId.toString()}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default Templates;
const styles = StyleSheet.create({
    viewJobBtn: {
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#498DEF',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        // marginRight: 5
    },
    btnView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 13,
        color: '#498DEF',
        textAlign: 'center',
        fontFamily: Fonts.FONTS_MEDIUM
    },
})