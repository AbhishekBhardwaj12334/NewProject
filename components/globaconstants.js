import React from "react";
import { } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export const BaseURL = `https://cilioapimgmt.azure-api.net/mobileqa/`;

export const Linear = () => (
    <LinearGradient
        locations={[0, 0.3, 0.7]}
        colors={["#ffffff", "#1F242822", "#ffffff"]}
        style={{ height: 3, flex: 1 }}
    />
)
export const Line = () => (
    <LinearGradient
        locations={[0, 0.3, 0.7]}
        colors={["#ffffff", "#1F242822", "#ffffff"]}
        style={{ height: 3, marginVertical: 8 }}
    />
)

export const FocusedHeader = () => (
    <LinearGradient
        locations={[0.3, 0.7]}
        colors={["#ffffff", "#1F242822"]}
        style={{ height: 3, flex: 1 }}
    />
)
