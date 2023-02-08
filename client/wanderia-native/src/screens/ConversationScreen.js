import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import ConversationList from "../components/ConversationList";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { database } from "../../config/firebase";

const ConversationScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = database.collection("chat").onSnapshot((snapshot) =>
    //         setChats(
    //             snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             }))
    //         )
    //     );
    //     return unsubscribe;
    // }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Conversations",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 0, marginRight: 10 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{
                                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 0,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign
                            name="camerao"
                            size={24}
                            color="black"
                            style={{ marginRight: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons
                            name="pencil"
                            size={24}
                            color="black"
                            style={{ marginRight: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView>
                <ConversationList />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ConversationScreen;

const styles = StyleSheet.create({});
