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
<<<<<<< HEAD
      navigation.setOptions({
          headerShown: false,
      });
      setChats([{id:7,name:'Kopi Kosan'},{id:6,name:'Restaurant Garuda (Padang cuisine)'},{id:1,name:'Argi Bramantya'},{id:2,name:'Raihan Qowi'},{id:3,name:'Akbar Ridho'},{id:4,name:'Herlina Lim'},{id:5,name:'Reza Dul Haq'}])
=======
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
>>>>>>> be55d7f6633a4db75fb7cc227ca0fb5f7e80136a
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView>
                {/* map conversation here */}
                <ConversationList />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ConversationScreen;

const styles = StyleSheet.create({});
