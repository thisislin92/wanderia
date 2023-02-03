import { Provider } from "react-redux";
import store from "./src/stores/store";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <SafeAreaProvider>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={
                            Platform.OS === "ios" ? -64 : 20
                        }
                    >
                        <Stack.Navigator>
                            <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="MapScreen"
                                component={MapScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                        {/* <HomeScreen/> */}
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </Provider>
        </NavigationContainer>
    );
}
