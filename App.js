import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PaginationDot from 'react-native-animated-pagination-dot';

export default function App() {
  const [page, setPage] = useState(0);

  const bars = <Icon name='bars' size={30} color='#000000' />;
  const search = <Icon name='search' size={30} color='#000000' />;

  return (
    <View style={{ flex: 1, backgroundColor: '#e9be0a' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 24,
        }}
      >
        {bars}
        <Text style={{ fontSize: 18, fontWeight: 700 }}>HAMBURG</Text>
        {search}
      </View>
      <View style={{ flex: 1.2, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Monday</Text>
        <Text style={{ fontSize: 16 }}>04 September</Text>
      </View>
      <View style={{ flex: 3.5, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 100, fontWeight: 700 }}>27도</Text>
        <Text style={{ fontSize: 16 }}>Sunny</Text>
      </View>
      <View style={{ flex: 2, margin: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: 700 }}>21도</Text>
          <Text style={{ fontWeight: 700 }}>0% 강수량</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>8도</Text>
          <Text>3 km/h 바람</Text>
        </View>
      </View>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <PaginationDot activeDotColor={'black'} curPage={page} maxPage={4} />
      </View>
      <StatusBar barStyle='dark-content' backgroundColor='#e9be0a' />
    </View>
  );
}
