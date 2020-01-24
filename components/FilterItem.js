import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  CheckBox,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../constants/icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';
import ColorDemo from '../components/ColorDemo';

const FilterItem = ({
  iconName,
  color,
  smallIcon,
  text,
  subFilterList = null,
  setData,
}) => {
  let isLink = !!subFilterList;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isLink) {
          setData(subFilterList, text, true);
        }
      }}>
      <View
        style={[
          styles.container,
          {
            borderColor: colors.superLightGray,
          },
        ]}>
        <React.Fragment>
          <View style={styles.left}>
            {iconName ? (
              <Icon name={iconName} size={smallIcon ? 12 : 18} />
            ) : (
              <ColorDemo color={color} />
            )}
          </View>
          <View style={styles.middle}>
            <Text style={styles.title}>{text}</Text>
          </View>
          <View style={styles.right}>
            {isLink ? (
              <View>
                <FontAwesome name="angle-right" size={20} />
              </View>
            ) : (
              <CheckBox
                title="Click Here"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="red"
              />
            )}
          </View>
        </React.Fragment>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  left: {
    marginLeft: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    paddingLeft: 20,
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  right: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterItem;
