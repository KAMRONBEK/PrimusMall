import React, {useReducer, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {reducer, SET} from '../utils/state';
import Icons from '../constants/icons';
import api from '../api/api';
import {withNavigation} from 'react-navigation';
import colors from '../constants/colors';

const CategoryItem = ({item, navigation}) => {
  const [state, dispatch] = useReducer(reducer, {
    childs: item.children,
    expanded: false,
  });
  let parentPress = () => {
    if (!state.childs || state.childs.length <= 0) {
      navigation.navigate('Catalog', {
        childs: [],
        index: -1,
        item,
      });
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({type: SET, name: 'expanded', value: !state.expanded});
    // api.main.getCategoryChilds(item.id).then(res => {
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //   dispatch({ type: SET, name: 'childs', value: res.data.data });
    // });
  };
  let childPress = index => {
    navigation.navigate('Catalog', {
      childs: state.childs,
      index,
      item,
    });
  };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.container} onPress={parentPress}>
        <Text style={styles.name}>{item.name}</Text>
        {state.childs && state.childs.length > 0 ? (
          <Icons
            style={{alignSelf: 'center'}}
            size={20}
            name={state.expanded ? 'angle-up' : 'angle-down'}
          />
        ) : null}
      </TouchableOpacity>
      {state.expanded && (
        <View>
          {state.childs ? (
            state.childs.map((e, i) => {
              return (
                <TouchableOpacity key={e.id} onPress={() => childPress(i)}>
                  <Text key={e.id} style={[styles.name, {fontSize: 16}]}>
                    {e.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width - 80,
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    textTransform: 'uppercase',
    padding: 15,
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default withNavigation(CategoryItem);
