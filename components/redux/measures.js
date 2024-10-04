import { createSlice } from '@reduxjs/toolkit';
const generatedNumbers = new Set();

const generateRandomNumber = () => {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 1000);
    } while (generatedNumbers.has(randomNumber));
    generatedNumbers.add(randomNumber);
    return randomNumber;
};

const initialState = {
    doorWindowData: {
        loading: false,
        data: null,
        error: null,
        selectedTemplate: {},
        selectedOptions: [],
        selectedMeasurements: {},
        additionalDetails: {
            customLabor: {
                itemsCustom: [],
                description: ''
            },
            basicLabor: {
                itemsBasic: [],
                description: ''
            },
            materials: {
                itemsMaterial: [],
                description: ''
            },
            imgUrls: [],
            additionalNotes: '',
            additionalQuestions: [
                { index: 1, isToggled: false, Question: 'Door Bell Operating Correctly?' },
                { index: 1, isToggled: false, Question: 'Alarm Needs Disconnection?' },
                { index: 1, isToggled: false, Question: 'PeepHole in new Hole Needed?' },
                { index: 1, isToggled: false, Question: 'Is work Area Covered?' },
                { index: 1, isToggled: false, Question: 'Reinstall of Storm Door needed on same door?' },
            ],
        },
        addQuestions: [],
        currentQuestion: {},
        selectedDropdowns: [],
        step: -1,
        // selectedResponseDetail: {},
        index: -1,
        exteriorMeasures: {
            exteriorMeasurements: {},
            AddOns: [
                { index: 1, isSelected: false, value: 'Add Header Expander' },
                { index: 2, isSelected: false, value: 'Add Sill Expander' },
            ],
        },
        interiorMeasures: {
            roomName: '',
            interiorMeasurements: {},
            additionalInteriorMeasures: {
                elseNeeded: [],
                interiorFinish: {},
            },
        },
        id: '',
        toggleBtn: false,
    },
    windowResponse: {
        tempResponse: [],
        index: -1,
        isUpdating: false
    },
    allMeasures: {
        selectedResponse: [],
        selectedResponseDetail: {}
    }
};



const userDataSlice2 = createSlice({
    name: 'measuresData',
    initialState,
    reducers: {
        updateDoorWindowData(state, action) {
            state.doorWindowData = action.payload;
        },
        selectTemplate(state, action) {
            const { templateId, value } = action.payload;
            state.doorWindowData.selectedTemplate = { templateId, value };
        },
        setOption(state, action) {
            const { step, questionId, optionId, optionValue, question } = action.payload;
            const concatenatedId = `${questionId}${optionId}`;
            const answerId = concatenatedId;

            const existingIndex = state.doorWindowData.selectedOptions.findIndex(option => option.step === step && option.questionId === questionId);

            if (existingIndex !== -1) {
                state.doorWindowData.selectedOptions[existingIndex] = { ...state.doorWindowData.selectedOptions[existingIndex], optionId, optionValue, answerId, step };
            } else {
                state.doorWindowData.selectedOptions.push({ questionId, question, answerId, optionValue, optionId, step });
            }
        },
        setMeasurements(state, action) {
            // { console.log('sjgsdjk', action.payload) }
            const { frameHeight1, frameHeight2, frameWidth1, frameWidth2, roughHeight1, roughHeight2, roughWidth1, roughWidth2, jambDepth, Width, Height, Depth, RoughWidth, RoughHeight } = action.payload;
            if (state.doorWindowData.selectedTemplate.templateId == '01') {
                state.doorWindowData.selectedMeasurements = {
                    frameHeight1, frameHeight2, frameWidth1, frameWidth2, jambDepth, Width, Height, Depth
                };
            } else if (state.doorWindowData.selectedTemplate.templateId == '02') {
                state.doorWindowData.selectedMeasurements = {
                    frameHeight1, frameHeight2, frameWidth1, frameWidth2, roughHeight1, roughHeight2, roughWidth1, roughWidth2, jambDepth, Width, Height, Depth, RoughWidth, RoughHeight
                };
            }
        },
        clearTemplate(state) {
            state.doorWindowData.selectedTemplate = {};
            state.doorWindowData.selectedOptions = [];
            state.doorWindowData.selectedMeasurements = {};
            state.doorWindowData.additionalDetails = {
                customLabor: {
                    itemsCustom: [],
                    description: ''
                },
                basicLabor: {
                    itemsBasic: [],
                    description: ''
                },
                materials: {
                    itemsMaterial: [],
                    description: ''
                },
                imgUrls: [],
                additionalNotes: '',
                additionalQuestions: [
                    { index: 1, isToggled: false, Question: 'Door Bell Operating Correctly?' },
                    { index: 2, isToggled: false, Question: 'Alarm Needs Disconnection?' },
                    { index: 3, isToggled: false, Question: 'PeepHole in new Hole Needed?' },
                    { index: 4, isToggled: false, Question: 'Is work Area Covered?' },
                    { index: 5, isToggled: false, Question: 'Reinstall of Storm Door needed on same door?' },
                ]
            };
            state.doorWindowData.exteriorMeasures.AddOns = [
                { index: 1, isSelected: false, value: 'Add Header Expander' },
                { index: 2, isSelected: false, value: 'Add Sill Expander' },
            ]
            state.doorWindowData.exteriorMeasures.exteriorMeasurements = {}
            state.doorWindowData.interiorMeasures.interiorMeasurements = {}
            state.doorWindowData.interiorMeasures.roomName = ''
            state.doorWindowData.additionalDetails.additionalDetails = ''
            state.doorWindowData.interiorMeasures.additionalInteriorMeasures.elseNeeded = [],
                state.doorWindowData.interiorMeasures.additionalInteriorMeasures.interiorFinish = {},
                state.doorWindowData.step = -1;
            state.doorWindowData.toggleBtn = false;
            state.windowResponse.tempResponse = []
            state.windowResponse.index = -1;
            state.windowResponse.isUpdating = false;
        },
        addQuestions(state, action) {
            state.doorWindowData.addQuestions = action.payload.map(({ questionId, value }) => ({ questionId, questionValue: value }));
        },
        addedQuestion(state, action) {
            const { questionId, value } = action.payload;
            state.doorWindowData.screensQuestion = { questionId, value };
        },
        addCustomLaborItem(state, action) {
            const { itemsCustom, description } = action.payload;
            state.doorWindowData.additionalDetails.customLabor.itemsCustom = itemsCustom;
            state.doorWindowData.additionalDetails.customLabor.description = description;
        },
        addBasicLaborItem(state, action) {
            const { itemsBasic, description } = action.payload;
            state.doorWindowData.additionalDetails.basicLabor.itemsBasic = itemsBasic;
            state.doorWindowData.additionalDetails.basicLabor.description = description;
        },
        addMaterialItem(state, action) {
            const { itemsMaterial, description } = action.payload;
            state.doorWindowData.additionalDetails.materials.itemsMaterial = itemsMaterial;
            state.doorWindowData.additionalDetails.materials.description = description;
        },
        addElseNeeded(state, action) {
            state.doorWindowData.interiorMeasures.additionalInteriorMeasures.elseNeeded = action.payload;
        },
        addInteriorFinish(state, action) {
            state.doorWindowData.interiorMeasures.additionalInteriorMeasures.interiorFinish = action.payload;
        },
        addAdditionalNotes(state, action) {
            state.doorWindowData.additionalDetails.additionalNotes = action.payload;
        },

        addImage(state, action) {
            const { uri, name, path, width, type, height, size } = action.payload;
            if (!state.doorWindowData.additionalDetails.imgUrls.some(img => img.uri === uri)) {
                state.doorWindowData.additionalDetails.imgUrls.push({ uri, name, path, width, type, height, size });
            }
        },
        removeImage(state, action) {
            state.doorWindowData.additionalDetails.imgUrls = state.doorWindowData.additionalDetails.imgUrls.filter((_, index) => index !== action.payload);
        },
        updateImageName(state, action) {
            const { uri, newName } = action.payload;
            state.doorWindowData.additionalDetails.imgUrls = state.doorWindowData.additionalDetails.imgUrls.map(img => (img.uri === uri ? { ...img, name: newName } : img));
        },
        setStep(state, action) {
            state.doorWindowData.step = action.payload;
        },
        addResponse(state) {
            const response = {
                id: generateRandomNumber(),
                selectedTemplate: state.doorWindowData.selectedTemplate,
                selectedOptions: state.doorWindowData.selectedOptions,
                selectedMeasurements: state.doorWindowData.selectedMeasurements,
                customLabor: state.doorWindowData.customLabor,
                basicLabor: state.doorWindowData.basicLabor,
                materials: state.doorWindowData.materials,
                imgUrls: state.doorWindowData.imgUrls,
            };
            state.allMeasures.selectedResponse.push(response);
        },
        updateResponseAtIndex(state, action) {
            const { index, updatedResponse } = action.payload;

            if (index >= 0 && index < state.allMeasures.selectedResponse.length) {
                const originalResponse = state.allMeasures.selectedResponse[index];
                const response = {
                    id: originalResponse.id,
                    selectedTemplate: updatedResponse.selectedTemplate || originalResponse.selectedTemplate,
                    selectedOptions: updatedResponse.selectedOptions || originalResponse.selectedOptions,
                    selectedMeasurements: updatedResponse.selectedMeasurements || originalResponse.selectedMeasurements,
                    customLabor: updatedResponse.customLabor || originalResponse.customLabor,
                    basicLabor: updatedResponse.basicLabor || originalResponse.basicLabor,
                    materials: updatedResponse.materials || originalResponse.materials,
                    imgUrls: updatedResponse.imgUrls || originalResponse.imgUrls,
                };
                state.allMeasures.selectedResponse[index] = response;
            }
        },
        setSelectedResponseDetail(state, action) {
            state.allMeasures.selectedResponseDetail = action.payload;
        },
        setIndex(state, action) {
            state.doorWindowData.index = action.payload;
        },
        setToggleBtn(state, action) {
            state.doorWindowData.toggleBtn = action.payload;
        },
        removeResponseAtIndex(state, action) {
            const { index } = action.payload;
            if (index >= 0 && index < state.windowResponse.tempResponse.length) {
                state.windowResponse.tempResponse = [
                    ...state.windowResponse.tempResponse.slice(0, index),
                    ...state.windowResponse.tempResponse.slice(index + 1)
                ];
                if (state.doorWindowData.index === index) {
                    state.doorWindowData.index = -1;
                } else if (state.doorWindowData.index > index) {
                    state.doorWindowData.index -= 1;
                }
            }
        },
        updateOptionArray(state, action) {
            const { name, updatedOptions } = action.payload;
            const index = state.doorWindowData.optionArray.findIndex(item => item.name === name);
            if (index !== -1) {
                state.doorWindowData.optionArray[index].options = updatedOptions;
            }
        },
        setExteriorMeasures(state, action) {
            // console.log("setExteriorMeasures", JSON.stringify(action.payload))
            const { Width, Height, Depth, unitHeight1, unitHeight2, unitWidth1, unitWidth2, finishedDepth } = action.payload;
            state.doorWindowData.exteriorMeasures.exteriorMeasurements = {
                Width, Height, Depth, unitHeight1, unitHeight2, unitWidth1, unitWidth2, finishedDepth
            };
        },
        setInteriorMeasures(state, action) {
            const { Width, Height, Depth, unitHeight1, unitHeight2, unitWidth1, unitWidth2, finishedDepth } = action.payload;
            state.doorWindowData.interiorMeasures.interiorMeasurements = {
                Width, Height, Depth, unitHeight1, unitHeight2, unitWidth1, unitWidth2, finishedDepth
            }
        },
        addRoomName(state, action) {
            state.doorWindowData.interiorMeasures.roomName = action.payload;
        },
        updateAddOnSelected: (state, action) => {
            const { index, isSelected } = action.payload;
            state.doorWindowData.exteriorMeasures.AddOns[index].isSelected = isSelected;
        },
        updateAdditionalQuestions: (state, action) => {
            const { index, isToggled } = action.payload;
            state.doorWindowData.additionalDetails.additionalQuestions[index].isToggled = isToggled;
        },
        addTempResponse(state, action) {
            const { tempIndexResponse } = action.payload
            state.windowResponse.tempResponse.push(tempIndexResponse);
            // state.windowResponse.tempResponse = tempIndexResponse;
        },
        updateTempResponse(state, action) {
            const { tempIndexResponse, index } = action.payload;
            if (state.windowResponse?.tempResponse?.length > index) {
                state.windowResponse.tempResponse[index] = tempIndexResponse;
            } else {
                console.warn('Empty Array');
            }
        },
        changeIsUpdating(state, action) {
            state.windowResponse.isUpdating = action.payload;
        },
        setResponseIndex(state, action) {
            state.windowResponse.index = action.payload;
        },
        clearTempWindow(state) {
            state.doorWindowData.selectedOptions.splice(1, 5);
            state.doorWindowData.exteriorMeasures = {
                exteriorMeasurements: {},
                AddOns: [
                    { index: 1, isSelected: false, value: 'Add Header Expander' },
                    { index: 2, isSelected: false, value: 'Add Sill Expander' },
                ]
            }
            state.doorWindowData.interiorMeasures = {
                interiorMeasurements: {},
                roomName: '',
                additionalInteriorMeasures: {
                    elseNeeded: [],
                    interiorFinish: {}
                }
            }
            state.doorWindowData.additionalDetails = {
                customLabor: {
                    itemsCustom: [],
                    description: ''
                },
                basicLabor: {
                    itemsBasic: [],
                    description: ''
                },
                materials: {
                    itemsMaterial: [],
                    description: ''
                },
                imgUrls: [],
                additionalNotes: ''
            };
        },
        clearDetails(state) {
            state.doorWindowData.selectedOptions = [];
            state.doorWindowData.selectedMeasurements = {};
            state.doorWindowData.exteriorMeasures = {
                exteriorMeasurements: {},
                AddOns: [
                    { index: 1, isSelected: false, value: 'Add Header Expander' },
                    { index: 2, isSelected: false, value: 'Add Sill Expander' },
                ]
            }
            state.doorWindowData.interiorMeasures = {
                interiorMeasurements: {},
                roomName: '',
                additionalInteriorMeasures: {
                    elseNeeded: [],
                    interiorFinish: {}
                }
            }
            state.doorWindowData.additionalDetails = {
                customLabor: {
                    itemsCustom: [],
                    description: ''
                },
                basicLabor: {
                    itemsBasic: [],
                    description: ''
                },
                materials: {
                    itemsMaterial: [],
                    description: ''
                },
                imgUrls: [],
                additionalNotes: ''
            };
        },
    }
});

export const { updateDoorWindowData, selectTemplate, clearTemplate, setOption, addQuestions, addedQuestion, setMeasurements, addBasicLaborItem, addCustomLaborItem, addMaterialItem, addImage, removeImage, updateImageName, setStep, addResponse, setSelectedResponseDetail, updateResponseAtIndex, setIndex, updateLocationDetails, removeResponseAtIndex, updateOptionArray, setToggleBtn, setExteriorMeasures, setInteriorMeasures, addRoomName, addElseNeeded, addInteriorFinish, addAdditionalNotes, updateAddOnSelected, addTempResponse, updateTempResponse, setResponseIndex, changeIsUpdating, clearTempWindow, clearDetails, addDetails, updateAdditionalQuestions } = userDataSlice2.actions;
export default userDataSlice2.reducer;
