import { createRealmContext } from '@realm/react';
import Realm from 'realm';

export const StormResponseSchema = {
    name: 'StormResponse',
    properties: {
        id: 'int',
        details: 'string',
    },
    primaryKey: 'id',
};

export const ExtIntDoorsSchema = {
    name: 'ExtIntDoors',
    properties: {
        id: 'int',
        details: 'string',
    },
    primaryKey: 'id',
};
export const WindowResponseSchema = {
    name: 'WindowResponse',
    properties: {
        id: 'int',
        details: 'string',
    },
    primaryKey: 'id',
};

export const realmConfig = createRealmContext({
    schema: [StormResponseSchema, ExtIntDoorsSchema, WindowResponseSchema],
    schemaVersion: 1,
    // deleteRealmIfMigrationNeeded: true,
});
