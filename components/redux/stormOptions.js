import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    measuresData1: '',
    loading: false,
    data: null,
    error: null,
    stormOptionArray: {
        whereIsItData: [
            { optionsId: 1, value: 'Front Entry' },
            { optionsId: 2, value: 'Back Entry' },
            { optionsId: 3, value: 'Side Entry' },
            { optionsId: 4, value: 'Cartor Entry' },
            { optionsId: 5, value: 'Garage Entry' },
            { optionsId: 6, value: 'Patio Door' },
            { optionsId: 7, value: 'Other' },
        ],
        typeData: [
            { optionsId: 1, value: 'Screen Door' },
            { optionsId: 2, value: 'Storm Door' }
        ],
        standardSizeData: [
            { optionsId: 1, value: 'Standard Size', height: '30', width: '80' },
            { optionsId: 2, value: 'Standard Size', height: '36', width: '80' },
            { optionsId: 3, value: 'Non-Standard Size/Special Order' }
        ],
    }
};
// const isAnyAddedOptionSelected = (initialOptions, updatedOptions) => {
//     const addedOptions = updatedOptions.filter(option => !initialOptions.find(initialOption => initialOption.optionsId === option.optionsId));
//     return addedOptions.some(option => option.selected);
// };
const userDataSlice4 = createSlice({
    name: 'stormsecurityOptionsData',
    initialState,
    reducers: {
        updateSSWhereIsItData(state, action) {
            state.stormOptionArray.whereIsItData = action.payload;
        },
        updateSSTypeData(state, action) {
            state.stormOptionArray.typeData = action.payload;
        },
        upgradeOptions(state, action) {
            const { type, updatedOptions } = action.payload;
            const initialOptions = state.stormOptionArray[type];

            if (isAnyAddedOptionSelected(initialOptions, updatedOptions)) {
                state.stormOptionArray[type] = initialOptions.concat(updatedOptions.filter(option => !initialOptions.find(initialOption => initialOption.optionsId === option.optionsId) && option.selected));
            } else {
                state.stormOptionArray[type] = initialOptions;
            }
        }
    },
}
);

export const { updateSSWhereIsItData, updateSSTypeData, upgradeOptions } = userDataSlice4.actions;
export default userDataSlice4.reducer;
