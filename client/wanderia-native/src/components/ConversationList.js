import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";

const ConversationList = ({ id, chatName, enterChat }) => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    Léa
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Hey, how are you?
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default ConversationList;

const styles = StyleSheet.create({});
