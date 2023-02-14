import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';


const ConversationList = ({ username }) => {
  const [messages, setMessages] = useState([])
  
  useLayoutEffect(()=>{
    const collectionRef = collection(database, 'bussiness1')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs[1].data())
      setMessages(snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      })))
    })
    return () => unsubscribe()
  },[])

  const navigator = useNavigation();
    return (
      <TouchableOpacity onPress={()=>navigator.navigate('ChatScreen',{username})}>
        <ListItem className="border-gray-200 border-b-[1px]">
            <Avatar rounded source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg", }}/>
            {/* <Text>{JSON.stringify(messages.length)}</Text> */}
            <ListItem.Content>
                <ListItem.Title className='text-xl font-semibold'>{username}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{messages[0]?.text}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
};

export default ConversationList;

const styles = StyleSheet.create({});
