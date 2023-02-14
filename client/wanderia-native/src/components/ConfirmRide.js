import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setStartNavigation } from "../stores/slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ConfirmRide = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-grow bg-white`}>
            <View className="mx-auto">
                <Text style={tw`text-center py-5 text-xl top-20`}>
                    Confirm Wander
                </Text>
            </View>
            <View
                style={tw`flex flex-row justify-evenly items-center bg-white my-auto`}
            >
                <TouchableOpacity
                    className="bg-[#4a388e] w-36 py-3 px-4 rounded-full flex flex-row items-center justify-between"
                    onPress={() => {
                        dispatch(setStartNavigation(true));
                        navigation.navigate("BussinessInfo");
                    }}
                >
                    <Icon
                        name="car"
                        type="font-awesome"
                        color="white"
                        size={16}
                    />
                    <Text style={tw`text-center text-white`}>Wander Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-slate-500 w-36 py-3 px-4 rounded-full flex flex-row items-center justify-center"
                    onPress={() => {
                        dispatch(setStartNavigation(false));
                        navigation.navigate("NavigateCard");
                    }}
                >
                    <Text style={tw`text-center text-white`}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ConfirmRide;

const styles = StyleSheet.create({});
