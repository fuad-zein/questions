import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../../utils';

const index = ({
    isTextarea,
    placeholder,
    onChangeText,
    value
}) => {
    if (isTextarea) {
        return (
            <TextInput placeholder={placeholder}
                value={value}
                style={{
                    borderColor: Colors.backgroundModal,
                    borderWidth: 0.4,
                    borderRadius: 5,
                    height: RFPercentage(15),
                    textAlignVertical: 'top',
                    paddingHorizontal: RFPercentage(1.2),
                    paddingVertical: RFPercentage(1.2)
                }}
                multiline
                onChangeText={(txt) => {
                    onChangeText(txt);
                }} />
        )
    }
    return (
        <TextInput placeholder={placeholder}
            value={value}
            style={{
                borderColor: Colors.backgroundModal,
                borderWidth: 0.4,
                borderRadius: 5,
                paddingHorizontal: RFPercentage(1.2),
                paddingVertical: RFPercentage(1.2)
            }} onChangeText={(txt) => {
                onChangeText(txt);
            }} />
    )
}

export default index;
