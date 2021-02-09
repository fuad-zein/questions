import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../../utils';

const index = ({
    onPress,
    noBg,
    text,
    marginLeft,
    marginRight
}) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: noBg?Colors.background:Colors.primaryColor,
            paddingVertical: RFPercentage(1.2),
            paddingHorizontal: RFPercentage(2),
            borderRadius:10,
            marginLeft:marginLeft,
            marginRight:marginRight
        }} activeOpacity={0.5} onPress={()=>{
            onPress();
        }}>
            <Text style={{
                fontSize: RFPercentage(2.2),
                fontWeight: 'bold',
                color: noBg?Colors.primaryColor:Colors.background
            }}>{text}</Text>
        </TouchableOpacity>
    )
}
export default index;
