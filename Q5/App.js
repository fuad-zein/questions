import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Home
} from './screen';
import { Colors } from './utils';
import * as SQLite from 'expo-sqlite';
import { Loading } from './components';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    const db = SQLite.openDatabase('simpleapp.db')
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key not null, title text, date text, body text,isComplete text);",
        []
      );
        this.setState({
          isLoading:false
        })
    });
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.background
      }}>
        <StatusBar hidden />
        {this.state.isLoading ? <Loading /> :
          <Home />
        }
      </View>
    );
  }

}

export default App;
