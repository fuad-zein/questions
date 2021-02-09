import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, TouchableWithoutFeedback } from 'react-native';
import { LandscapeCard } from '../../../components';
import * as SQLite from 'expo-sqlite';

class helper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderLandscapeCard(tasks) {
        return tasks.map((data, i) => {
            return (
                <LandscapeCard
                    key={i}
                    body={data.body}
                    isComplete={data.isComplete}
                    title={data.title}
                    onDelete={() => {
                        // DeviceEventEmitter.emit("taskDelete", data);
                    }}
                    onEdit={() => {
                        // DeviceEventEmitter.emit("taskEdit", data);
                    }}
                    onComplete={() => {
                        // DeviceEventEmitter.emit("taskComplete", data);
                    }}
                />

            )
        })
    }
    dBHelpers(action, data, customSql) {
        const db = SQLite.openDatabase('simpleapp.db');
        var data_=[];
        if (action == 'insert') {
            db.transaction(tx => {
                tx.executeSql(
                    "insert into tasks (title, date, body, isComplete) values (?, ?, ?,?)",
                    [data.title, data.date, data.body, 'false'],
                    console.log("Data berhasil ditambahkan"),
                    (err) => console.log(err)
                );
            })
        }
        else if (action == 'update') {
            db.transaction(tx => {
                tx.executeSql(
                    "update tasks set title=?,date=?,body=?,isComplete=? where id = ?",
                    [data.title, data.date, data.body, data.isComplete, data.id],
                    console.log("Data berhasil diupdate"),
                    (err) => console.log(err)
                );
            })
        }
        else if (action == 'delete') {
            db.transaction(tx => {
                tx.executeSql(
                    "delete from tasks where id = ?",
                    [data],
                    console.log("Data berhasil dihapus"),
                    (err) => console.log(err)
                );
            })
        }
        
    }
}
const Helper = new helper();
export default Helper;
