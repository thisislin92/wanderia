import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatUser from "./ChatUser";
import { mapMarkers, openMarker } from "../stores/actionCreator";

const BussinessInfo = () => {
    const { bussinessInfo, markerState } = useSelector((state) => state.ux);
    const navigator = useNavigation();
    
    const dispatcher = useDispatch();

    useEffect(() => {
      console.log('masuk bisnis info')
      console.log(bussinessInfo)
    },[])

    return (
      <View className={`${markerState?'h-full':'h-0'}`}>
        { markerState && (
          <TouchableOpacity className="fixed -top-5 z-50 items-center justify-center"
            onPress={() => { dispatcher({ type: "closeMarker" }) }}
          >
          <View className="h-10 w-10 bg-white items-center justify-center rounded-full border-[1px] border-gray-200">
            <Icons.MaterialCommunityIcons
              name="chevron-double-down"
              className="text-3xl text-gray-800 rounded-xl"
            />
          </View>
          </TouchableOpacity>
        )}
        <ScrollView className="px-4">
          <View className="flex-row gap-3 mb-4">
            <Image source={{ uri: bussinessInfo?.imageUrl }} className="w-24 h-32 rounded-xl object-contain"/>
            <View className="gap-1 flex-1">
              <Text className="text-2xl font-semibold">{bussinessInfo?.name}</Text>
              <Text className="text-gray-400">{bussinessInfo?.address}</Text>
              <View className="flex-row gap-x-1">
                {
                  bussinessInfo?.rating && (
                  <View className="flex-row gap-1 items-center">
                    <Text className="text-lg">{bussinessInfo?.rating}</Text>
                    <Icons.MaterialCommunityIcons name="star" className="text-lg"/>
                  </View>
                )}
                {bussinessInfo?.price && (
                  <View className="flex-row gap-1 items-center">
                    <Text className="text-lg">Price:</Text>
                    { bussinessInfo?.price.split("").map((el, index) => (<Icons.FontAwesome5 name="money-bill-wave" className="text-lg" key={index}/>)) }
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="mb-2">
            <TouchableOpacity className="flex-row justify-between" onPress={() => navigator.navigate("HangoutScreen", {bussinessName:bussinessInfo?.name})}>
              <Text className="text-2xl font-semibold mb-1">Hangouts</Text>
              <Icons.Feather name="arrow-right" className="text-xl" />
            </TouchableOpacity>
            <ScrollView horizontal className="flex-row gap-2">
              <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username:'fahmifachrizal'})}>
                <ChatUser username={"fahmifachrizal"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username:bussinessInfo?.name=='Kopi Kosan'?'Argi Bramantya':'Reza Dul Haq'})}>
                <ChatUser username={bussinessInfo?.name=='Kopi Kosan'?'Argi Bramantya':'Reza Dul Haq'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username:bussinessInfo?.name=='Restaurant Garuda (Padang cuisine)'?'Herlina Lim':'Akbar Ridho'})}>
                <ChatUser username={bussinessInfo?.name=='Restaurant Garuda (Padang cuisine)'?'Herlina Lim':'Akbar Ridho'} />
              </TouchableOpacity>
              { bussinessInfo?.name=='Kopi Kosan' &&
                <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username:'Raihan Qowi'})}>
                  <ChatUser username='Raihan Qowi' />
                </TouchableOpacity>
              }
            </ScrollView>
          </View>
          <View>
            <Text className="text-2xl font-semibold mb-1">Events & Promos</Text>
            <ScrollView horizontal className="gap-2">
              <TouchableOpacity>
                <Image source={{ uri: "https://i.postimg.cc/C12p2RCp/discount20.jpg" }} className="w-24 h-24 rounded-xl"/>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
    </View>
  );
};

export default BussinessInfo;
