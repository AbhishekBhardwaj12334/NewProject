import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    measuresData1: '',
    loading: false,
    data: null,
    error: null,
    optionArray: {
        whereIsItData: [
            { optionsId: 1, value: 'Front Entry' },
            { optionsId: 2, value: 'Back Entry' },
            { optionsId: 3, value: 'Side Entry' },
            { optionsId: 4, value: 'Garage Entry' },
            { optionsId: 5, value: 'Other' },
        ],
        typeData: [
            { optionsId: 1, value: 'Single Door' },
            { optionsId: 2, value: 'Double Door' },
            { optionsId: 3, value: 'Patio Door' },
            { optionsId: 4, value: 'Patio Hinged' },
            { optionsId: 5, value: 'Interior Door' },
            { optionsId: 6, value: 'Other' },
        ],
        DoorHandlingData: [
            { optionsId: 1, value: 'Right Hand InSwing' },
            { optionsId: 2, value: 'Right Hand OutSwing' },
            { optionsId: 3, value: 'Left Hand InSwing' },
            { optionsId: 4, value: 'Left Hand OutSwing' },
            { optionsId: 5, value: 'Fixed Non-Operational' },
            { optionsId: 6, value: 'Other' },
        ],
        standardSizeData: [
            { optionsId: 1, value: 'Standard Size', frameSize: 'Frame Size', frameH1: '33', frameH2: '1/2', frameW1: '81', frameW2: '3/4', roughH: '34', roughW: '82', standardSize: 'Standard Jamb', text: '32 X 80 Call Size', roughSize: 'Rough Opening', depthS: '4(9/16)', type: 'INswing' },
            { optionsId: 2, value: 'Standard Size', frameSize: 'Frame Size', frameH1: '37', frameH2: '1/2', frameW1: '81', frameW2: '3/4', roughH: '34', roughW: '82', standardSize: 'Standard Jamb', text: '36 X 80 Call Size', roughSize: 'Rough Opening', depthS: '4(9/16)', type: 'INswing' },
            { optionsId: 3, value: 'Standard Size', frameSize: 'Frame Size', frameH1: '37', frameH2: '1/2', frameW1: '81', frameW2: '3/4', roughH: '34', roughW: '82', standardSize: 'Standard Jamb', text: '36 X 80 Call Size', roughSize: 'Rough Opening', depthS: '4(9/16)', type: 'OUTswing' },
            { optionsId: 4, value: 'Standard Size', frameSize: 'Frame Size', frameH1: '37', frameH2: '1/2', frameW1: '81', frameW2: '3/4', roughH: '34', roughW: '82', standardSize: 'Standard Jamb', text: '36 X 80 Call Size', roughSize: 'Rough Opening', depthS: '4(9/16)', type: 'OUTswing' },
            { optionsId: 5, value: 'Non-Standard Size/Special Order' }
        ],
    }
};
const isAnyAddedOptionSelected = (initialOptions, updatedOptions) => {
    const addedOptions = updatedOptions.filter(option => !initialOptions.find(initialOption => initialOption.optionsId === option.optionsId));
    return addedOptions.some(option => option.selected);
};
const userDataSlice3 = createSlice({
    name: 'exteriorOptionsData',
    initialState,
    reducers: {
        updateWhereIsItData(state, action) {
            state.optionArray.whereIsItData = action.payload;
        },
        updateTypeData(state, action) {
            state.optionArray.typeData = action.payload;
        },
        updateDoorHandling(state, action) {
            state.optionArray.DoorHandlingData = action.payload;
        },
        upgradeOptions(state, action) {
            const { type, updatedOptions } = action.payload;
            const initialOptions = state.optionArray[type];

            if (isAnyAddedOptionSelected(initialOptions, updatedOptions)) {
                state.optionArray[type] = initialOptions.concat(updatedOptions.filter(option => !initialOptions.find(initialOption => initialOption.optionsId === option.optionsId) && option.selected));
            } else {
                state.optionArray[type] = initialOptions;
            }
        }
    }
});

export const { updateWhereIsItData, updateTypeData, updateDoorHandling, upgradeOptions } = userDataSlice3.actions;
export default userDataSlice3.reducer;
