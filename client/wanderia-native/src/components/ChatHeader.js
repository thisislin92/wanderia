import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.profileAndOptions}>
                <TouchableOpacity style={styles.profile}>
                    <Image style={styles.image} source={{ uri: picture }} />
                    <View style={styles.usernameAndOnlineStatus}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.onlineStatus}>{onlineStatus}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.option}>
                        <Icon name="phone" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Icon name="ellipsis-v" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChatHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 60,
        paddingBottom: 30,
    },
    backButton: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    profileAndOptions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        flex: 4,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 50,
    },
    usernameAndOnlineStatus: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },
    onlineStatus: {
        fontSize: 15,
        color: "green",
    },
    options: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    option: {
        paddingHorizontal: 10,
    },
});
