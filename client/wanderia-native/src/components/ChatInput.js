import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChatInput = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.inputAndMicrophone}>
                    <TouchableOpacity style={styles.emoticonButton}>
                        <Icon name="emoticon-outline" size={20} color="#000" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => onChangeText(text)}
                    />
                </View>
            </View>
        </View>
    );
};

export default ChatInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
