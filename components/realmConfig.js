import { createRealmContext } from '@realm/react';
import Realm from 'realm';
export const MeasuresResponseSchema = {
    name: 'MeasuresResponse',
    properties: {
        id: 'int',
        template: 'string',
        details: 'string',
    },
    primaryKey: 'id',
};
export const AppLanguageSchema = {
    name: 'AppLanguage',
    properties: {
        id: 'int',
        nativename: 'string',
        name: 'string',
        languageKey: 'string'
    },
};
export const UserDataSchema = {
    name: 'UserData',
    properties: {
        id: 'int',
        name: 'string',
        age: 'string',
        address1: 'string',
        address2: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 'string',
        phoneNumbers: 'string',
        email: 'string',
        image: 'Image'
    },
};
export const ImageSchema = {
    name: 'Image',
    properties: {
        uri: 'string',
        type: 'string',
        name: 'string',
    },
};

export const realmConfig = createRealmContext({
    schema: [MeasuresResponseSchema, AppLanguageSchema, UserDataSchema, ImageSchema],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
});
