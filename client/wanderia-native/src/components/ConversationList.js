import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ConversationList = ({ username }) => {
  const navigator = useNavigation();
    return (
      <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username})}>
        <ListItem className="border-gray-200 border-b-[1px]">
            <Avatar rounded source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg", }}/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>{username}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">Hey, how are you? </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
};

export default ConversationList;

const styles = StyleSheet.create({});
