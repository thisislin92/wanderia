import {
    Image,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import * as Icons from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const ProfileScreen = () => {
    const navigator = useNavigation();
    const [username, setUsername] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [updateButton, setUpdateButton] = useState(false);

    const handleUpdate = () => {
        updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: imgUrl,
            email: email,
        }).then(() => navigator.navigate("HomeScreen"));
    };

    const handleSignOut = () => {
        console.log("signout");
        signOut(auth).then(() => {
            console.log("User signed out!");
        });
    };

    useLayoutEffect(() => {
        setUsername(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
        setImgUrl(auth.currentUser.photoURL);
    }, []);

    return (
        <SafeAreaView className="flex-1 android:pt-10">
            {/* Header */}
            <View className="h-14 flex-row items-center justify-between p-4">
                <TouchableOpacity
                    className="w-8 h-8 items-center justify-center"
                    onPress={navigator.goBack}
                >
                    <Icons.Feather name="arrow-left" className="text-2xl" />
                </TouchableOpacity>
                <View className="">
                    <Text className="text-xl font-semibold">Profile</Text>
                </View>
                <TouchableOpacity
                    className="w-8 h-8 items-center justify-center bg-red-500 rounded-lg"
                    onPress={handleSignOut}
                >
                    <Icons.Ionicons
                        name="ios-log-out-outline"
                        className="text-2xl text-white"
                    />
                </TouchableOpacity>
            </View>

            <View className="justify-center p-4">
                <View className="flex-row">
                    <View className="h-40 flex items-center justify-center">
                        <Image
                            source={{ uri: auth.currentUser.photoURL }}
                            className="rounded-full h-24 w-24 bg-amber-200 border"
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            placeholder="Enter your username"
                            label="username"
                            value={username}
                            leftIcon={{ type: "feather", name: "at-sign" }}
                            onChangeText={(text) => setUsername(text)}
                        />
                        <Input
                            placeholder="Enter your photo url"
                            label="imgUrl"
                            value={imgUrl}
                            leftIcon={{ type: "antdesign", name: "picture" }}
                            onChangeText={(text) => setImgUrl(text)}
                        />
                    </View>
                </View>
                <Input
                    placeholder="Enter your email"
                    label="Email"
                    value={email}
                    leftIcon={{ type: "material", name: "email" }}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Enter your old password"
                    label="Enter your password"
                    value={password}
                    leftIcon={{ type: "material", name: "lock" }}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <View className="flex-row gap-4 mx-auto">
                    {/* <Button
                        title="Update"
                        onPress={handleUpdate}
                        disabled={
                            password === auth.currentUser.password
                                ? false
                                : true
                        }
                        className="w-48"
                    /> */}
                    <TouchableOpacity
                        className="w-48 h-10 bg-[#4a388e] rounded-lg items-center justify-center"
                        onPress={handleUpdate}
                        disabled={
                            password === auth.currentUser.password
                                ? false
                                : true
                        }
                    >
                        <Text className="text-white">Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
