import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../../../utils';


module.exports = StyleSheet.create({
  textinputTitle: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    color: Colors.fontBlack,
    marginVertical: RFPercentage(2.8)
  },
  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(2.8)
  },
  iconSearchContainer: {
    position: 'absolute',
    right: 4
  },
  textInputSearchContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: RFPercentage(2),
    flex: 1
  },
  buttonCreateNewContainer: {
    paddingVertical: RFPercentage(1),
    borderRadius: 20,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFPercentage(2)
  },
  titleApp: {
    fontSize: RFPercentage(3.5),
    color: Colors.fontBlack,
    marginBottom: RFPercentage(1),
    fontWeight: "bold"
  },
  rightContainer: {
    flex: 1,
    marginLeft: RFPercentage(2.5),
    flexDirection: "column"
  },
  textHalo: {
    color: Colors.fontDarkOrange,
    fontWeight: "bold",
    fontSize: RFPercentage(2.2)
  },
  textTaskInfo: {
    fontSize: RFPercentage(1.8),
    color: Colors.white,
    marginTop: RFPercentage(1.2)
  },
  taskInfoContainer:{
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    flexDirection: "row",
    padding: RFPercentage(1.2)
  },
  landscapeContainer:{
    flexDirection: "row",
    paddingHorizontal: RFPercentage(4),
    paddingVertical: RFPercentage(3.5)
  }
})

