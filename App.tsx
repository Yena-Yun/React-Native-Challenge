import {
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Date, Icon, Const } from 'utils';
import { COLOR } from 'styles/color';
import { useWeather } from 'hooks/useWeather';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

console.log('SCREEN_WIDTH: ' + SCREEN_WIDTH);

export default function App() {
  const [
    { clouds, temp, tempMin, tempMax, weather, weatherIcon, rain, snow, wind },
    isLoading,
    error,
  ] = useWeather();
  const [tempColor, setTempColor] = useState(styles.initialTemp);

  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

  const handleMomentumScrollBegin = () => {
    setTempColor(styles.updatedTemp);
  };

  const handleMomentumScrollEnd = () => {
    setTempColor(styles.initialTemp);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {Icon.BARS_ICON}
        <Text style={styles.city}>{Const.CITY_NAME}</Text>
        {Icon.SEARCH_ICON}
      </View>
      <View style={styles.dates}>
        <Text style={styles.day}>{Date.DAY}</Text>
        <Text>
          {Date.MONTH}&nbsp;
          {Date.DATE}일
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        fadingEdgeLength={300}
        horizontal
        // 스크롤 후 손가락 떼고 나서 살짝 추가로 m밀릴 때 이벤트 발생
        // onMomentumScrollBegin={handleMomentumScrollBegin}
        // onMomentumScrollEnd={handleMomentumScrollEnd}
        // 정확히 스크롤을 하고 있는 동안(= 스크롤 시작 후 손가락을 대고 있을 동안) 이벤트 발생
        onScrollBeginDrag={handleMomentumScrollBegin}
        onScrollEndDrag={handleMomentumScrollEnd}
        pagingEnabled
        // persistentScrollbar // false이면 스크롤 안 할 때도 스크롤바가 계속 떠 있고 true면 스크롤할 때만 잠깐 보임
        showsHorizontalScrollIndicator={false} // false하면 스크롤 여부에 상관없이 스크롤바 아예 안 보임
        // snapToEnd={false}
        // snapToInterval={4}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
      >
        <View style={styles.main}>
          <Text style={styles.temp}>{temp}°</Text>
          <View style={styles.weatherWrap}>
            <Text style={styles.weather}>{weather}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherIconUrl }}
            />
          </View>
        </View>
        <View style={styles.main}>
          {/* 스크롤하는 동안 잠깐 글자색 바뀜 (black -> pink) */}
          <Text style={[tempColor, styles.temp]}>{temp}°</Text>
          <View style={styles.weatherWrap}>
            <Text style={styles.weather}>{weather}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherIconUrl }}
            />
          </View>
        </View>
        <View style={styles.main}>
          <Text style={styles.temp}>{temp}°</Text>
          <View style={styles.weatherWrap}>
            <Text style={styles.weather}>{weather}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherIconUrl }}
            />
          </View>
        </View>
        <View style={styles.main}>
          <Text style={styles.temp}>{temp}°</Text>
          <View style={styles.weatherWrap}>
            <Text style={styles.weather}>{weather}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherIconUrl }}
            />
          </View>
        </View>
        <View style={styles.main}>
          <Text style={styles.temp}>{temp}°</Text>
          <View style={styles.weatherWrap}>
            <Text style={styles.weather}>{weather}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherIconUrl }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.detailWrap}>
        <View style={styles.detailRow}>
          <Text>최고 {tempMax}°</Text>
          <Text>
            {rain
              ? `강수량 ${rain}`
              : snow
              ? `강우량 ${snow}`
              : clouds
              ? `흐림 ${clouds}%`
              : '맑음'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text>최저 {tempMin}°</Text>
          <Text>바람속도 {wind} km/h</Text>
        </View>
      </View>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    padding: 4,
  },
  city: {
    fontSize: 18,
    fontWeight: '700',
  },
  dates: {
    flex: 1.2,
    margin: 24,
    borderBottomWidth: 3,
  },
  day: {
    fontSize: 20,
    fontWeight: '700',
  },
  main: {
    flex: 10,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    padding: 24,
    margin: 4,
    borderBottomWidth: 3,
  },
  temp: {
    fontSize: 100,
    fontWeight: '700',
  },
  initialTemp: {
    color: 'black',
  },
  updatedTemp: {
    color: 'pink',
  },
  weatherWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    fontSize: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 8,
  },
  detailWrap: {
    flex: 2,
    margin: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
