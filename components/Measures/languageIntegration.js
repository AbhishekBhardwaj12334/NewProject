import i18next, { languageResourcer } from "../../services/i18next"
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import language from "../../services/language.json";
import { realmConfig } from "../realmConfig";
import { useDispatch, useSelector } from "react-redux";
import { addAppLanguage } from "../redux/measures";
const { useRealm } = realmConfig;
const defaultLanguage = "en"
console.log(defaultLanguage)
const LangauageIntegrater = ({ navigation }) => {
    const dispatch = useDispatch();
    const realm = useRealm();
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(true);
    const langaugeAdded = useSelector(state => state.measuresData?.allMeasures?.appLanguage?.languageKey)
    console.log('sajsajhjj', langaugeAdded)
    const [selectedLanguage, setSelectedLanguage] = useState(langaugeAdded ? langaugeAdded : defaultLanguage);

    const languages = Object.keys(language).map((key) => ({
        label: language[key].nativename,
        value: key,
    }));
    console.log(languages)

    const handleLanguage = () => {
        i18next.changeLanguage(selectedLanguage);
        try {
            const existingData = realm.objects('AppLanguage');
            console.log('existingData:', existingData);
            realm.write(() => {
                if (existingData.length > 0) {
                    const currentLanguage = existingData[0];
                    if (currentLanguage.id !== language[selectedLanguage].id) {
                        currentLanguage.id = language[selectedLanguage].id;
                        currentLanguage.nativename = language[selectedLanguage].nativename;
                        currentLanguage.name = language[selectedLanguage].name;
                        currentLanguage.languageKey = selectedLanguage;
                    }
                } else {
                    realm.create('AppLanguage', { // Ensure the schema name matches
                        id: language[selectedLanguage].id,
                        nativename: language[selectedLanguage].nativename,
                        name: language[selectedLanguage].name,
                        languageKey: selectedLanguage,

                    });
                }
            });

            dispatch(addAppLanguage({ ...language[selectedLanguage], languageKey: selectedLanguage }));
            setShowModal(false);
            navigation.navigate('JobDetailsPage');
        } catch (error) {
            console.log('Error saving/updating language in Add Language Schema:', error);
        }
    };

    return (
        <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View style={styles.languageList}>
                <View style={styles.view2}>
                    <Text style={styles.text}>{t("select-language")}</Text>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            itemTextStyle={styles.dropdownItemText}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={languages}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={t("searchPlaceholder")}
                            value={selectedLanguage}
                            onChange={item => {
                                setSelectedLanguage(item.value);
                            }}
                        />
                        {console.log('dshjcdsnc', selectedLanguage)}
                    </View>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => handleLanguage()}
                    >
                        <Text style={styles.text3}> {t("ok")}</Text>
                    </TouchableOpacity>
                </View>
                {console.log('Ajnxjsnjnsd', language[selectedLanguage])}
                {console.log('Ajnxjsnjnsd', selectedLanguage)}
            </View>
        </Modal>
    );

};
const styles = StyleSheet.create({
    languageList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    view2: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: '20%'
    },
    text: {
        fontSize: 18,
        color: 'black'
    },
    dropdownContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    dropdown: {
        width: '100%',
        color: 'black',
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 10,
        borderRadius: 20
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    selectedTextStyle: {
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    placeholderStyle: {
        color: 'black',
        fontFamily: Fonts.FONTS_REGULAR,
        fontSize: 15,
    },
    touchable: {
        flex: 1,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(31, 36, 40, 0.30)',
        alignItems: 'center'
    },
    text3: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black'
    },
})

export default LangauageIntegrater;