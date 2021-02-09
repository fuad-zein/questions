import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../utils/colors';
import Icon from '../Icon';


const index = ({ isLandscape, username, text, fullname, onPress }) => {
    if (isLandscape) {
        return (
            <View style={{
                backgroundColor: Colors.primaryColor,
                height: RFPercentage(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: RFPercentage(3)
            }}>
                <Text style={{
                    color: Colors.white,
                    fontWeight: "bold",
                    fontSize: RFPercentage(3)
                }}>
                    Logo
                </Text>
                <View style={{
                    flexDirection:"row",
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Image style={{
                        width: RFPercentage(5.5),
                        height: RFPercentage(5.5),
                        borderRadius: 100,
                        resizeMode: 'cover'
                    }} source={require('../../assets/images/me.png')} />
                    <Text style={{
                        fontSize:RFPercentage(2.2),
                        color:Colors.white,
                        marginHorizontal:RFPercentage(1.2)
                    }}>{fullname.length>15?fullname.substr(0,15)+" ...":fullname}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>onPress()}>
                        <Icon name="cog-outline" color={colors.white} size={RFPercentage(3)} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    } else {
        return (
            <View style={{
                backgroundColor: Colors.primaryColor,
                height: RFPercentage(14),
                justifyContent: "flex-end",
                paddingBottom: RFPercentage(2),
                paddingHorizontal: RFPercentage(2)
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: RFPercentage(7.5),
                        height: RFPercentage(7.5),
                        borderRadius: 100,
                        resizeMode: 'cover'
                    }} source={require('../../assets/images/me.png')} />
                    <View style={{
                        marginLeft: RFPercentage(2)
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: RFPercentage(2.2)
                        }}>Hello, {username}!</Text>
                        <Text style={{
                            color: colors.fontDarkOrange,
                            fontWeight: "bold",
                            fontSize: RFPercentage(2.7)
                        }}>{text}</Text>
                    </View>
                </View>

            </View>
        )
    }
}

export default index;
