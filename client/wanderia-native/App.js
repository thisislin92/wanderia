import { Provider } from 'react-redux';
import store from './src/stores/store';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import EatsScreen from './src/screens/EatsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown:false}}/>
            <Stack.Screen name="EatsScreen" component={EatsScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
          {/* <HomeScreen/> */}
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}
