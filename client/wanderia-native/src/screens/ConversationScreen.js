import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import ConversationList from "../components/ConversationList";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
// import { database } from "../../config/firebase";
import firebase from "firebase/app";
import {
  collection,
  setCollections,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const ConversationScreen = ({ navigation }) => {
  
  const db = firebase.firestore();

  const [chats, setChats] = useState([]);
  
    useEffect(() => {
      db.collection("chats")
      .get()
      .then((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({ id: doc.id, ...doc.data() });
        });
        setChats(chats);
      }) 

      // const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
      // setChats( snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })) )
      // );
      // return unsubscribe;
    }, []);

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
        <SafeAreaView className='flex-1'>
          <ScrollView>
          <View>
            <View className="drawer">
              
                {chats.map((chat) => (
                  <View key={chat.id}>{chat.name}</View>
                ))}
              
            </View>
          </View>
            <ConversationList />
          </ScrollView>
        </SafeAreaView>
    );
};

export default ConversationScreen;
