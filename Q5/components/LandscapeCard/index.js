import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../Icon';
import { Colors } from '../../utils';

const index = ({
    title,
    isComplete,
    body,
    onEdit,
    onDelete,
    onComplete,
    isLandscape }) => {
    isComplete = isComplete.toLowerCase() == "true";
    return (
        <View style={{
            backgroundColor: Colors.white,
            marginTop: isLandscape?RFPercentage(2.5):RFPercentage(1),
            marginBottom: RFPercentage(0.2),
            padding: RFPercentage(2.5),
            elevation: 1,
            borderRadius: 10,
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                <Text style={{
                    fontSize: RFPercentage(2.7),
                    color: Colors.fontBlack,
                    fontWeight: "bold"
                }}>{title}</Text>
                <TouchableOpacity disabled={isComplete} activeOpacity={0.5} onPress={() => {
                    onComplete();
                }}>
                    <View style={{
                        flexDirection: "row",
                        marginLeft: RFPercentage(2),
                        backgroundColor: isComplete ? Colors.backgroundMerah : Colors.backgroundInactive,
                        paddingHorizontal: RFPercentage(1.5),
                        borderRadius: 5,
                        height: RFPercentage(2.5),
                        alignItems: 'center'
                    }}>
                        <Icon name="check" color={isComplete ? Colors.fontRed : Colors.fontInactive} size={RFPercentage(2)} />
                        <Text style={{
                            fontSize: RFPercentage(1.5),
                            marginLeft: RFPercentage(0.5),
                            color: isComplete ? Colors.fontRed : Colors.fontInactive
                        }}>{isComplete ? "Complete" : "Set as Complete"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: RFPercentage(2),
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "flex-end"
            }}>
                <Text style={{
                    fontSize: RFPercentage(1.8),
                    textTransform: "capitalize",
                    lineHeight: RFPercentage(2.5),
                    color: Colors.fontBlack,
                    width: "80%"
                }}>{body}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            onEdit();
                        }}>
                        <Icon name="pencil" color={Colors.fontBlack} size={RFPercentage(3)} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                        style={{
                            marginLeft: RFPercentage(1.7)
                        }}
                        onPress={() => {
                            onDelete();
                        }}>
                        <Icon name="delete" color={Colors.fontBlack} size={RFPercentage(3)} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default index;
