import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    measuresData1: '',
    loading: false,
    data: null,
    error: null,
    windowOptionsArray: {
        typeOfWindow: [
            { optionsId: 1, value: 'Vinyl Windows' },
            { optionsId: 2, value: 'Aluminium Windows' },
            { optionsId: 3, value: 'Fiberglass and Composite Windows' },
            { optionsId: 4, value: 'Wood Windows' },
            { optionsId: 5, value: 'Cladded Wood Framed Windows' },
        ],
        floorLevelData: [
            { optionsId: 1, value: '1st Floor' },
            { optionsId: 2, value: '2nd Floor' },
            { optionsId: 3, value: '3rd Floor' },
            { optionsId: 4, value: 'Other' },
        ],
        houseLocationData: [
            { optionsId: 1, value: 'Front' },
            { optionsId: 2, value: 'Right Side' },
            { optionsId: 3, value: 'Back' },
            { optionsId: 4, value: 'Left Side' },
            { optionsId: 5, value: 'Garage' },
            { optionsId: 6, value: 'Other' },
        ],
        windowUnitNumber: [
            { optionsId: 1, value: '1' },
            { optionsId: 2, value: '2' },
            { optionsId: 3, value: '3' },
            { optionsId: 4, value: '4' },
            { optionsId: 5, value: 'Other' },
        ],
        replacingExistingWindow: [
            { optionsId: 1, value: 'Wood Sash' },
            { optionsId: 2, value: 'Aluminium Framed' },
            { optionsId: 3, value: 'Vinyl' },
            { optionsId: 4, value: 'Full Wood Frame' },
            { optionsId: 5, value: 'Aluminium Cladded Wood Framed' },
            { optionsId: 6, value: 'Not Removing a Window' },
        ],
        buildingExterior: [
            { optionsId: 1, value: 'Vinyl Siding' },
            { optionsId: 2, value: 'Exterior Wood Trimmed' },
            { optionsId: 3, value: 'Stucco' },
            { optionsId: 4, value: 'Wood Sash Replacement' },
            { optionsId: 5, value: 'Brick' },
            { optionsId: 6, value: 'Other' },
        ],

    }
};

const userDataSlice5 = createSlice({
    name: 'windowOptionsData',
    initialState,
    reducers: {
    }
});

export const { updateWhereIsItData, updateTypeData, updateDoorHandling, upgradeOptions } = userDataSlice5.actions;
export default userDataSlice5.reducer;
