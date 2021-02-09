import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const index = ({color,size,name})=>{
    return(
        <Icon name={name} size={size} color={color} />
    )
}

export default index;
