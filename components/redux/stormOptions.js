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
    },

    userDataArray: {
        usersData: [
            {
                id: 1,
                name: "John",
                age: 30,
                address1: "123 Main St",
                address2: "Anytown",
                city: "Anytown",
                state: "CA",
                zipCode: 12345,
                country: "USA",
                phoneNumbers: "+91 8877646465",
                email: "john@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 2,
                name: "Alice",
                age: 28,
                address1: "456 Elm St",
                address2: "Othertown",
                city: "Othertown",
                state: "NY",
                zipCode: 67890,
                country: "USA",
                phoneNumbers: "+1 2345678901",
                email: "alice@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 3,
                name: "Bob",
                age: null,
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: null,
                country: "",
                phoneNumbers: "+1 3456789012",
                email: "bob@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 4,
                name: "Charlie",
                age: 35,
                address1: "789 Oak St",
                address2: "Sometown",
                city: "Sometown",
                state: "TX",
                zipCode: 11223,
                country: "USA",
                phoneNumbers: "+91 9958013493",
                email: "charlie@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 5,
                name: "Diana",
                age: 25,
                address1: "101 Pine St",
                address2: "Newcity",
                city: "Newcity",
                state: "FL",
                zipCode: 33445,
                country: "USA",
                phoneNumbers: "+1 4567890123",
                email: "diana@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 6,
                name: "Ethan",
                age: 40,
                address1: "202 Maple St",
                address2: "Oldtown",
                city: "Oldtown",
                state: "WA",
                zipCode: 55667,
                country: "USA",
                phoneNumbers: "+1 5678901234",
                email: "ethan@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 7,
                name: "Fiona",
                age: 32,
                address1: "",
                address2: "Anycity",
                city: "Anycity",
                state: "",
                zipCode: null,
                country: "USA",
                phoneNumbers: "+1 6789012345",
                email: "fiona@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 8,
                name: "George",
                age: 29,
                address1: "303 Birch St",
                address2: "Yourtown",
                city: "Yourtown",
                state: "OR",
                zipCode: 77889,
                country: "USA",
                phoneNumbers: "+1 7890123456",
                email: "george@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 9,
                name: "Hannah",
                age: null,
                address1: "",
                address2: "Theircity",
                city: "Theircity",
                state: "",
                zipCode: null,
                country: "",
                phoneNumbers: "+1 8901234567",
                email: "hannah@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            },
            {
                id: 10,
                name: "Ian",
                age: 45,
                address1: "404 Cedar St",
                address2: "Hometown",
                city: "Hometown",
                state: "IL",
                zipCode: 99887,
                country: "USA",
                phoneNumbers: "+1 9012345678",
                email: "ian@example.com",
                image: {
                    uri: '',
                    type: '',
                    name: '',
                }
            }
        ]
    }
};

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
