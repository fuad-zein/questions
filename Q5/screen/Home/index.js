import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, DeviceEventEmitter, Dimensions, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import {
  BottomIcon,
  Button,
  Header,
  Icon,
  Loading,
  TextInputModal
} from '../../components';
import {
  addOrientationChangeListener,
  removeOrientationChangeListener,
  getOrientationAsync
} from 'expo-screen-orientation';
import { RFPercentage } from 'react-native-responsive-fontsize';
import *  as ExpoCalendar from 'expo-calendar';
import { Colors } from '../../utils';
import { Calendar } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import { LandscapeCard } from '../../components';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';
import s from './style';
import Helper from './Helpers';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: true,
      isLoading: true,
      isModalVisible: false,
      header: {
        img: "me.png"
      },
      username: "ucup",
      fullname: "Ilyas abdurahman yusuf",
      task: {
        count: 0,
        data: [],
        calendar: {},
        calendarStrip: []
      },
      date: moment().format("YYYY-MM-DD"),
      TextInputCari: '',
      modalDate: '',
      modalTitle: '',
      modalBody: '',
      modalId: '',
      modalIsComplete: '',
      isToday: true,
      ModalSearch: false
    };
  }
  refresh() {
    const db = SQLite.openDatabase('simpleapp.db');
    db.transaction(tx => {
      tx.executeSql(
        "select * from tasks",
        [],
        (_, { rows: { _array } }) => this.setState({
          task: {
            count: 0,
            data: [],
            calendar: this.renderTasksCalender(_array, false),
            calendarStrip: this.renderTasksCalender(_array, true)
          },
          modalBody: '',
          modalTitle: '',
          modalId: '',
          modalDate: '',
          modalAction: 'create',
          modalIsComplete: '',
          ModalSearch: false,
          isToday: true
        }),
        (err) => console.log(err)
      );

      let currdate = moment().format("YYYY-MM-DD").toString();
      // console.log(currdate);
      tx.executeSql(
        "select * from tasks where date = ?",
        [currdate],
        (_, { rows: { _array } }) => this.setState({
          task: {
            count: _array.length,
            data: _array,
            calendar: this.state.task.calendar,
            calendarStrip: this.state.task.calendarStrip
          },
          isLoading: false
        }),
        (err) => console.log(err)
      );
    })
  }
  async componentDidMount() {
    this.refresh()
    getOrientationAsync().then((data) => {
      let isLandscape;
      if (data == 1) {
        isLandscape = false;
      } else {
        isLandscape = true;
      }
      this.setState({
        isLandscape: isLandscape,
        isLoading: false,
      })
    })
    addOrientationChangeListener((listener) => {
      let isLandscape;
      if (listener.orientationInfo.orientation == 1) {
        isLandscape = false;
      } else {
        isLandscape = true;
      }
      this.setState({
        isLandscape: isLandscape
      })
    })
    // const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        {this.state.isLoading ? <></> :
          <Header
            isLandscape={this.state.isLandscape}
            text={this.state.task.count + " Task for Today"}
            username={this.state.username}
            fullname={this.state.fullname}
            onPress={() => { alert('settings') }}
          />
        }
        {this.renderModalSearch(this.state.ModalSearch)}
        {this.renderModal(this.state.isModalVisible)}
        {this.renderScreen()}
      </View>
    );
  }
  renderScreen() {
    if (this.state.isLoading) {
      return (

        <Loading />

      )
    }
    if (this.state.isLandscape) {
      return (
        <ScrollView nestedScrollEnabled={false}>
          <View style={s.landscapeContainer}>
            <View style={{
              width: "40%",
            }}>
              <View style={s.taskInfoContainer}>
                <Image source={require('../../assets/images/Group.png')} />
                <View style={{
                  flex: 1,
                  marginLeft: RFPercentage(2)
                }}>
                  <Text style={s.textHalo}>Hallo, {this.state.username}!</Text>
                  <Text style={s.textTaskInfo}>You have {this.state.task.count} task{this.state.task.count > 1 && 's'} left for today, Already completed Task today?</Text>
                </View>
              </View>
              <Calendar
                markedDates={this.state.task.calendar}
                markingType="multi-dot"
                displayLoadingIndicator
                onDayPress={(day) => {
                  const db = SQLite.openDatabase('simpleapp.db');
                  db.transaction(tx => {
                    tx.executeSql(
                      "select * from tasks where date = ?",
                      [day.dateString],
                      (_, { rows: { _array } }) => this.setState({
                        task: {
                          count: this.state.task.count,
                          data: _array,
                          calendar: this.state.task.calendar,
                          calendarStrip: this.state.task.calendarStrip
                        },
                        isLoading: false,
                        isToday: day.dateString == moment().format("YYYY-MM-DD").toString() ? true : false,
                        date: day.dateString
                      }),
                      (err) => console.log(err)
                    );
                  })
                }}
              />
            </View>
            <View style={s.rightContainer}>
              <Text style={s.titleApp}>Task {this.state.isToday ? "for Today" : "on " + moment(this.state.date).format("ddd, DD MMM YY")}</Text>
              <View style={{ flexDirection: 'row', width: "100%" }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                  this.setState({ isModalVisible: true })
                }}>
                  <View style={s.buttonCreateNewContainer}>
                    <Icon name="plus" size={RFPercentage(2)} color={Colors.white} />
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Create New</Text>
                  </View>
                </TouchableOpacity>
                <View style={s.textInputSearchContainer}>
                  <TextInput placeholder="Cari" style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.primaryColor,
                    width: "100%",
                    textAlign: this.state.TextInputCari.length > 0 ? "left" : "center",
                    color: Colors.primaryColor,
                    paddingHorizontal: RFPercentage(1.2),
                    fontSize: RFPercentage(2)
                  }}
                    placeholderTextColor={Colors.primaryColor}
                    onChangeText={(txt) => {
                      this.setState({
                        TextInputCari: txt
                      })
                    }}
                    onSubmitEditing={() => {
                      const db = SQLite.openDatabase('simpleapp.db');
                      db.transaction(tx => {
                        tx.executeSql(
                          "select * from tasks where title like '%" + this.state.TextInputCari + "%' or body like '%" + this.state.TextInputCari + "%'",
                          [],
                          (_, { rows: { _array } }) => this.setState({
                            task: {
                              count: this.state.task.count,
                              data: _array,
                              calendar: this.state.task.calendar,
                              calendarStrip: this.state.task.calendarStrip
                            },
                            modalBody: '',
                            modalTitle: '',
                            modalId: '',
                            modalDate: '',
                            modalAction: 'create',
                            modalIsComplete: '',
                            isLoading: false,
                            TextInputCari: ''
                          }),
                          (err) => console.log(err)
                        );
                      })
                    }}
                    returnKeyType="search"
                  />
                  <View style={s.iconSearchContainer}>
                    <Icon name="magnify" size={RFPercentage(2)} color={Colors.primaryColor} />
                  </View>
                </View>
              </View>
              <ScrollView nestedScrollEnabled={true} style={{
                marginBottom: RFPercentage(0.2),
              }}>
                {this.renderLandscapeCard(this.state.task.data)}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{
          paddingHorizontal: RFPercentage(2),
          paddingTop: RFPercentage(2),
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1
        }}>
          <View style={{
            height: Dimensions.get('window').height / 4
          }}>
            <CalendarStrip
              scrollable
              calendarAnimation={{ type: 'parallel', duration: 5 }}
              style={{ height: Dimensions.get('window').height / 5, paddingTop: 20, paddingBottom: 10 }}
              dateNameStyle={{
                color: Colors.fontBlack,
                fontSize: RFPercentage(1.3),
                textTransform: "capitalize",
                fontWeight: "bold"
              }}
              dateNumberStyle={{
                color: Colors.fontBlack,
                fontSize: RFPercentage(2),
                textTransform: "capitalize",
                fontWeight: "bold"
              }}
              calendarHeaderStyle={{
                color: Colors.primaryColor,
                fontSize: RFPercentage(2.5),
                textTransform: "capitalize",
                fontWeight: "bold",
                alignSelf: 'flex-start'
              }}
              headerText={moment().format('ddd, DD MMM YY')}
              markedDates={this.state.task.calendarStrip}
              highlightDateNumberStyle={{
                color: Colors.primaryColor,
                fontSize: RFPercentage(2.2)
              }}
              highlightDateNameStyle={{
                color: Colors.primaryColor,
                fontWeight: "bold",
                textTransform: "capitalize"
              }}
              highlightDateContainerStyle={{
                backgroundColor: Colors.backgroundMerah,
                borderRadius: 5,
              }}
              selectedDate={moment(this.state.date)}
              onDateSelected={(day) => {
                let dayString = moment(day).format("YYYY-MM-DD").toString()
                const db = SQLite.openDatabase('simpleapp.db');
                db.transaction(tx => {
                  tx.executeSql(
                    "select * from tasks where date = ?",
                    [dayString],
                    (_, { rows: { _array } }) => this.setState({
                      task: {
                        count: this.state.task.count,
                        data: _array,
                        calendar: this.state.task.calendar,
                        calendarStrip: this.state.task.calendarStrip
                      },
                      isLoading: false,
                      isToday: day.dateString == moment().format("YYYY-MM-DD").toString() ? true : false,
                      date: day.dateString
                    }),
                    (err) => console.log(err)
                  );
                })
              }}
            />
          </View>
          <View style={{
            borderTopWidth: 1,
            borderColor: Colors.primaryColor,
            flex: 1
          }}>
            <Text style={s.textinputTitle}>Task List</Text>
            <ScrollView>
              {this.renderLandscapeCard(this.state.task.data)}
            </ScrollView>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: 'center',
            paddingBottom: RFPercentage(2)
          }}>
            <BottomIcon name="order-bool-descending" isActive={!this.state.ModalSearch} onPress={() => {

            }} />
            <BottomIcon isCreate onPress={() => {
              this.setState({
                isModalVisible: true
              })
            }} />
            <BottomIcon name="magnify" isActive={this.state.ModalSearch} onPress={() => {
              this.setState({
                ModalSearch: true
              })
            }} />
          </View>
        </View>
      )
    }
  }
  renderLandscapeCard(tasks) {
    if (tasks.length < 1) {
      return (
        <View style={{
          paddingTop: this.state.isLandscape ? "15%" : "5%",
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: RFPercentage(2.2),
            fontWeight: 'bold',
            marginBottom: RFPercentage(2.2),
            color: Colors.fontBlack
          }}>Tidak ada task</Text>
          <Icon name="sleep" size={RFPercentage(5)} color={Colors.fontBlack} />
        </View>
      )
    }
    return tasks.map((data, i) => {
      return (
        <LandscapeCard
          key={i}
          body={data.body}
          isComplete={data.isComplete}
          isLandscape={this.state.isLandscape}
          title={data.title}
          onDelete={() => {
            Alert.alert('Hapus Task', 'Apakah anda ingin menghapus task ini?', [{
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Ya",
              onPress: async () => {
                Helper.dBHelpers('delete', data.id)
                setTimeout(() => {
                  this.refresh()
                }, 200);

              }
            }]);
          }}
          onEdit={() => {
            this.setState({
              isModalVisible: true,
              modalBody: data.body,
              modalDate: data.date,
              modalId: data.id,
              modalIsComplete: data.isComplete,
              modalTitle: data.title,
              modalAction: 'update'
            })
          }}
          onComplete={() => {
            Alert.alert('Complete task?', 'Apakah task anda sudah selesai?', [{
              text: "Belum",
              style: "cancel"
            },
            {
              text: "Sudah",
              onPress: async () => {
                Helper.dBHelpers('update', { title: data.title, body: data.body, date: data.date, id: data.id, isComplete: 'true' })
                setTimeout(() => {
                  this.refresh()
                }, 200);
              }
            }]);
          }}
        />
      )
    })
  }
  renderModal(visible) {
    return (
      <Modal
        visible={visible}
        transparent
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.backgroundModal,
          paddingTop: this.state.isLandscape ? RFPercentage(10) : 0
        }}>
          <View style={{
            width: this.state.isLandscape ? Dimensions.get("window").width / 1.3 : Dimensions.get("window").width / 1.1,
            backgroundColor: Colors.background,
            padding: RFPercentage(2),
            borderRadius: 15
          }}>
            <ScrollView>
              <Text style={{
                fontSize: RFPercentage(2.8),
                fontWeight: 'bold',
                color: Colors.fontBlack,
              }}>New Task</Text>
              <Text style={s.textinputTitle}>Title</Text>
              <TextInputModal
                value={this.state.modalTitle}
                isTextarea={false}
                onChangeText={(txt) => {
                  this.setState({
                    modalTitle: txt
                  })
                }}
                placeholder="Fill title"
              />
              <Text style={s.textinputTitle}>Description</Text>
              <TextInputModal
                isTextarea={true}
                value={this.state.modalBody}
                onChangeText={(txt) => {
                  this.setState({
                    modalBody: txt
                  })
                }}
                placeholder="Fill description"
              />
              <Text style={s.textinputTitle}>Choose Date
                {this.state.modalDate.length > 0 && ' ('}
                {this.state.modalDate.length > 0 && moment(this.state.modalDate).format('D MMM YYYY')}
                {this.state.modalDate.length > 0 && ')'}</Text>
              <Calendar
                onDayPress={(txt) => {
                  this.setState({ modalDate: txt.dateString })
                }}
                markedDates={{
                  [this.state.modalDate]: {
                    color: Colors.backgroundMerah
                  }
                }
                }
                markingType='period'
              />
              <View style={s.buttonModalContainer}>
                <Button noBg
                  onPress={() => {
                    this.setState({
                      isModalVisible: false
                    })
                  }}
                  text="Cancel"
                  marginRight={RFPercentage(2.8)}
                />
                <Button noBg={false}
                  onPress={async () => {
                    if (this.state.modalTitle.length > 0 && this.state.modalBody.length > 0 && this.state.modalDate.length > 0 &&
                      this.state.modalAction == 'create') {
                      await Helper.dBHelpers('insert', { title: this.state.modalTitle, body: this.state.modalBody, date: this.state.modalDate })
                      this.setState({
                        isModalVisible: false,
                        // isLoading: true
                      })
                      this.refresh()
                    }
                    else if (this.state.modalTitle.length > 0 && this.state.modalBody.length > 0 && this.state.modalDate.length > 0 &&
                      this.state.modalAction == 'update') {
                      await Helper.dBHelpers('update', { title: this.state.modalTitle, body: this.state.modalBody, date: this.state.modalDate, id: this.state.modalId, isComplete: this.state.modalIsComplete })
                      this.setState({
                        isModalVisible: false,
                        // isLoading: true
                      })
                      this.refresh()
                    } else {
                      Alert.alert('Info', 'Tolong isi data dengan benar');
                    }
                  }}
                  text={this.state.modalAction == 'create'?"Create Task":"Update Task"}
                  marginLeft={RFPercentage(2.8)}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  renderTasksCalender(data, strip) {
    let jsonData = {};
    let CalendarStrip = [];
    data.map((item) => {
      let Bool = item.isComplete == 'true';
      let dotStyle = {
        color: !Bool ? Colors.fontRed : Colors.primaryColor,
        key: '' + item.id
      }
      let dotStyle_ = {
        color: !Bool ? Colors.fontRed : Colors.primaryColor,
      }
      if (jsonData.hasOwnProperty(item.date)) {
        if (jsonData[item.date].dots.length !== 4) {
          jsonData[item.date].dots.push(dotStyle)
        }
      } else {
        jsonData = { ...jsonData, [item.date]: { dots: [dotStyle] } }
      }

      if (CalendarStrip.length > 0) {
        CalendarStrip.map((cal, i) => {
          if (cal.date == item.date) {
            if (cal.dots.length !== 4) {
              cal.dots.push(dotStyle_)
            }
          }
          else {
            CalendarStrip.push({ date: item.date, dots: [dotStyle_] })
          }
        })
      } else {
        CalendarStrip.push({ date: item.date, dots: [dotStyle_] })
      }

    })
    if (strip) {
      return CalendarStrip;
    }
    return jsonData;

  }
  renderModalSearch(visible) {
    return (
      <Modal transparent visible={visible}>
        <KeyboardAvoidingView style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: Colors.backgroundModal,
          paddingHorizontal: RFPercentage(2),
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <TextInput style={{
              backgroundColor: Colors.white,
              flex: 1,
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
              color: Colors.fontBlack,
              paddingVertical: RFPercentage(2),
              paddingHorizontal: RFPercentage(4),
              borderRadius: 100,
            }}
              placeholder="Cari"
              autoFocus
              onChangeText={(txt)=>{
                this.setState({
                  TextInputCari:txt
                })
              }}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: "100%",
            marginTop: RFPercentage(2.5)
          }}>
            <Button text="Cancel" noBg marginRight={RFPercentage(2)} onPress={() => {
              this.setState({
                ModalSearch: false
              })
            }} />
            <Button text="Search" marginRight={RFPercentage(2)} onPress={() => {
              const db = SQLite.openDatabase('simpleapp.db');
              db.transaction(tx => {
                tx.executeSql(
                  "select * from tasks where title like '%" + this.state.TextInputCari + "%' or body like '%" + this.state.TextInputCari + "%'",
                  [],
                  (_, { rows: { _array } }) => this.setState({
                    task: {
                      count: this.state.task.count,
                      data: _array,
                      calendar: this.state.task.calendar,
                      calendarStrip: this.state.task.calendarStrip
                    },
                    modalBody: '',
                    modalTitle: '',
                    modalId: '',
                    modalDate: '',
                    modalAction: 'create',
                    modalIsComplete: '',
                    isLoading: false,
                    TextInputCari: '',
                    ModalSearch:false
                  }),
                  (err) => console.log(err)
                );
              })
            }} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

export default index;
