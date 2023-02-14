import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";

const EatsScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView className="flex-1">
            <View style={{ flex: 1 }}>
                <ChatHeader
                    onPress={() => {}}
                    username={"username"}
                    bio={"bio"}
                    picture={"https://picsum.photos/200/300"}
                    onlineStatus={"online"}
                />
                <ChatList />
            </View>
        </SafeAreaView>
    );
};

export default EatsScreen;

const styles = StyleSheet.create({});
