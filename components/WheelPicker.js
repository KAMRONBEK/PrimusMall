import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Picker from 'react-native-wheel-picker';
import colors from '../constants/colors';
import strings from '../localization/strings';
var PickerItem = Picker.Item;

const hourList = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const dayList = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];
const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WheelPicker = ({type}) => {
  let [dateData, setDateData] = useState({
    selectedDayIndex: 2,
    selectedMonthIndex: 4,
  });
  let [timeData, setTimeData] = useState({
    selectedFromHourIndex: 5,
    selectedToHourIndex: 6,
  });

  let renderSegment = () => {
    switch (type) {
      case 'date':
        return (
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{strings.deliveryDate}</Text>
            <View style={styles.content}>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  selectedValue={dayList[dateData.selectedDayIndex]}
                  itemStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
                  onValueChange={index => {
                    console.warn(dayList[index]);
                    setDateData({...dateData, selectedDayIndex: index});
                  }}>
                  {dayList.map((value, index) => (
                    <PickerItem label={value} value={index} key={index} />
                  ))}
                </Picker>
              </View>
              <Text> - </Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  selectedValue={monthList[dateData.selectedMonthIndex]}
                  itemStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
                  onValueChange={index => {
                    console.warn(monthList[index]);
                    setDateData({...dateData, selectedMonthIndex: index});
                  }}>
                  {monthList.map((value, i) => (
                    <PickerItem label={value} value={i} key={i} />
                  ))}
                </Picker>
              </View>
            </View>
          </ScrollView>
        );
      case 'time':
        return (
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{strings.timeOfDelivery}</Text>
            <View style={styles.content}>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  selectedValue={hourList[timeData.selectedFromHourIndex]}
                  itemStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
                  onValueChange={index =>
                    setTimeData({...timeData, selectedFromHourIndex: index})
                  }>
                  {hourList.map((value, index) => (
                    <PickerItem label={value} value={index} key={index} />
                  ))}
                </Picker>
              </View>
              <Text> - </Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  selectedValue={hourList[timeData.selectedToHourIndex]}
                  itemStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
                  onValueChange={index =>
                    setTimeData({...timeData, selectedToHourIndex: index})
                  }>
                  {hourList.map((value, i) => (
                    <PickerItem label={value} value={i} key={i} />
                  ))}
                </Picker>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>If you see this, you fucked up</Text>
          </View>
        );
    }
  };

  return <>{renderSegment()}</>;
};
const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 20,
    flexDirection: 'column',
  },
  border: {
    position: 'absolute',
    backgroundColor: colors.darkGray,
    height: 40,
    width: 2,
    borderRadius: 1,
    top: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  pickerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderWidth: 1,
    height: Platform.OS === 'android' ? 30 : 30,
    borderColor: colors.red,
    alignItems: 'center',
    // marginVertical: 40,
  },
  picker: {
    width: 75,
    height: Platform.OS === 'android' ? 120 : 50,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    marginVertical: 20,
  },
  dayText: {
    color: colors.accent,
    fontSize: 20,
  },
  indicator: {
    backgroundColor: colors.yellow,
    width: 80,
    height: 3,
    position: 'absolute',
    bottom: 10,
  },
});

export default WheelPicker;
