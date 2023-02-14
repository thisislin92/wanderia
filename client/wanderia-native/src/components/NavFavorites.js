import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { setDestination } from "../stores/slices/navSlice";

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Ragunan, Jakarta Selatan",
        data:{
          location:{
            lat: -6.3021233,
            lng: 106.8197709
          },
          description:'Jl Harsono RM No Jakarta Selatan'
        }
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Hacktiv8",
        destination: "Pondok Indah, Jakarta Selatan",
        data:{
          location:{
            lat: -6.260561,
            lng: 106.7815494
          },
          description:'Jl Pondok Indah Arteri No 7 Jakarta Selatan'
        }
    },
];

const NavFavorites = () => {
  const dispatcher = useDispatch()
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
            )}
            renderItem={({ item: { location, destination, icon, data } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}
                  onPress={()=>dispatcher( setDestination(data) )}
                >
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>
                            {location}
                        </Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavFavorites;

const styles = StyleSheet.create({});
