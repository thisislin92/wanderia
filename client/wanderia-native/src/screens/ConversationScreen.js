import { View, SafeAreaView, ScrollView, TouchableOpacity, Text } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import ConversationList from "../components/ConversationList";
import * as Icons from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ConversationScreen = ({ navigation }) => {
const [chats, setChats] = useState([]);
const navigator = useNavigation();
  
    useEffect(() => {
      // const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
      // setChats( snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })) )
      // );
      // return unsubscribe;
    }, []);

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      });
      setChats([{id:7,name:'Kopi Kosan'},{id:6,name:'Restaurant Garuda (Padang cuisine)'},{id:1,name:'Argi Bramantya'},{id:2,name:'Raihan Qowi'},{id:3,name:'Akbar Ridho'},{id:4,name:'Herlina Lim'},{id:5,name:'Reza Dul Haq'}])
    }, [navigation]);

    return (
      <View className='pt-10 flex-1 gap-0'>
        {/* Header */}
        <View className=' h-14 flex-row items-center justify-between p-4'>
          <TouchableOpacity className='w-8 h-8 items-center justify-center' onPress={navigator.goBack}>
            <Icons.Feather name='arrow-left' className='text-2xl'/>
          </TouchableOpacity>
          <View className=''>
            <Text className='text-xl font-semibold'>Conversations</Text>
          </View>
          <View className='w-8 h-8'>
            {/* Hollow space to make space-between */}
          </View>
        </View>

        <SafeAreaView className='flex-1 bg-white'>
          <ScrollView>
            <View>
              <View className="drawer">
                
                  {
                    chats.map((chat) => (
                      <ConversationList key={chat.id} username={chat.name}/>
                    ))
                  }
                
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
};

export default ConversationScreen;