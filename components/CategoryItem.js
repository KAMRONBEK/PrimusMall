import React, {useReducer, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  View,
  ActivityIndicator,
} from 'react-native';
import {reducer, SET} from '../utils/state';
import Icons from '../constants/icons';
import api from '../api/api';
import {withNavigation} from 'react-navigation';

const CategoryItem = ({item, navigation}) => {
  const [state, dispatch] = useReducer(reducer, {childs: [], expanded: false});
  let prentPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({type: SET, name: 'expanded', value: !state.expanded});
    if (state.childs && state.childs.length > 0) {
      return;
    }
    api.main.getCategoryChilds(item.id).then(res => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch({type: SET, name: 'childs', value: res.data.data});
    });
  };
  let childPress = index => {
    navigation.navigate('Catalog', {
      childs: state.childs,
      index,
    });
  };
  return (
    <Fragment>
      <TouchableOpacity style={styles.container} onPress={prentPress}>
        <Text style={styles.name}>{item.name}</Text>
        <Icons
          style={{alignSelf: 'center'}}
          size={20}
          name={state.expanded ? 'angle-up' : 'angle-down'}
        />
      </TouchableOpacity>
      {state.expanded && (
        <View>
          {state.childs ? (
            state.childs.map((e, i) => {
              return (
                <TouchableOpacity onPress={() => childPress(i)}>
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
    </Fragment>
  );
};

const styles = StyleSheet.create({
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
