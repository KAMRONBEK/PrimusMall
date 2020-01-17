import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import Colors from '../constants/colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

let {width} = Dimensions.get('window');

const Slider = ({
  images,
  style,
  type = 'default',
  imageStyle,
  animated,
  onPress,
}) => {
  let [indicatorIndex, setIndicatorIndex] = useState(0);
  let [indicatorWidth, setIndicatorWidth] = useState(-1);
  let [indicatorOffset, setIndicatorOffset] = useState(-1);
  let calculatedWidth = type === 'card' ? width - 30 : width;
  let indicatorRadius = type === 'card' ? 6 : 8;
  let banner = React.createRef();
  let value = new Animated.Value(0);
  let interval = animated
    ? setInterval(() => {
        if (!banner || !banner.scrollTo) {
          return;
        }
        let val =
          indicatorIndex + 1 === images.length
            ? 0
            : calculatedWidth * (indicatorIndex + 1);
        banner.scrollTo({
          x: val,
        });
        setIndicatorIndex(
          indicatorIndex + 1 === images.length ? 0 : indicatorIndex + 1,
        );
      }, 3000)
    : {};
  let getImageStyle = () => {
    let cardStyle = {};
    if (type === 'card') {
      cardStyle = {width: width - 30, borderRadius: 30, height: 200};
    }
    return [
      {
        width,
        // height: 180,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
      },
      cardStyle,
      imageStyle,
    ];
  };
  let getIndicatorPosition = () => {
    let translateX = value.interpolate({
      inputRange: [0, calculatedWidth * images.length],
      outputRange: [0, indicatorWidth],
    });
    return translateX;
  };
  let getScrollViewStyle = () => {
    let cardStyle = {};
    if (type === 'card') {
      cardStyle = {
        margin: 15,
        overflow: 'hidden',
        borderRadius: 20,
        top: 0,
        bottom: 0,
      };
    }
    return [
      {
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        overflow: 'hidden',
      },
      cardStyle,
    ];
  };
  let renderIndicators = images => {
    return images.map((e, key) => (
      <View
        {...{key}}
        style={{
          borderRadius: indicatorRadius,
          width: indicatorRadius * 2,
          height: indicatorRadius * 2,
          backgroundColor: Colors.superLightGray,
          opacity: 0.4,
          margin: 5,
        }}
      />
    ));
  };
  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);
  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={ref => (banner = ref)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={getScrollViewStyle()}
        onMomentumScrollEnd={({nativeEvent}) => {
          setIndicatorIndex(
            parseInt(nativeEvent.contentOffset.x / calculatedWidth),
          );
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: value,
              },
            },
          },
        ])}
        pagingEnabled={true}>
        {images &&
          images.map((e, key) => (
            <TouchableWithoutFeedback
              key={key}
              onPress={() => {
                if (type === 'notDefault') {
                  onPress(indicatorIndex);
                  return;
                }
                if (e.link) {
                  Linking.openURL(e.link);
                }
              }}>
              <ImageBackground
                key={key}
                source={{
                  uri: e,
                }}
                style={getImageStyle()}>
                {type === 'default' && (
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: Colors.black,
                      opacity: 0.3,
                    }}
                  />
                )}
              </ImageBackground>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: type === 'card' ? -40 : -30,
        }}>
        <View
          style={{flexDirection: 'row'}}
          onLayout={({nativeEvent}) => {
            if (indicatorWidth === -1) {
              setIndicatorWidth(nativeEvent.layout.width);
            }
            if (indicatorOffset === -1) {
              setIndicatorOffset(nativeEvent.layout.x);
            }
          }}>
          {renderIndicators(images)}
        </View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
          }}>
          <AnimatedSvg
            width={32}
            height={32}
            style={{
              margin: 5,
              marginLeft: indicatorOffset + 5,
              transform: [{translateX: getIndicatorPosition()}],
              position: 'absolute',
            }}>
            <Ellipse
              cx={indicatorRadius}
              cy={indicatorRadius}
              rx={indicatorRadius}
              ry={indicatorRadius}
              fill={Colors.white}
            />
          </AnimatedSvg>
        </View>
      </View>
    </View>
  );
};

export default Slider;
