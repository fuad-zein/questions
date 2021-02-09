import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../Icon';
import { Colors } from '../../utils';

const index = ({
    isActive,
    onPress,
    name,
    isCreate
}) => {
    if (isCreate) {
        return (
            <TouchableOpacity style={{
                paddingVertical: RFPercentage(0.4),
                paddingHorizontal:RFPercentage(0.4),
                borderRadius:20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.primaryColor
            }} onPress={() => {
                onPress();
            }}>
                <Icon name="plus" color={Colors.white} size={RFPercentage(10)} />
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style={{
            paddingVertical: RFPercentage(2),
            alignItems: 'center',
            justifyContent: 'center',
        }} onPress={() => {
            onPress();
        }} disabled={isActive}>
            <Icon name={name} color={isActive ? Colors.primaryColor : Colors.fontInactive} size={RFPercentage(5)} />
        </TouchableOpacity>
    )
}

export default index;
