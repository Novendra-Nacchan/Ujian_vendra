import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BasicFlatListData from  './BasicFlatListData'

const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25}}>
            <View style={{alignItems: 'center'}}>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(BasicFlatListData)}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            padding: 10,
                            margin: 5,
                            marginBottom: 15,
                            backgroundColor: '#2980b9',
                            borderRadius: 15,
                            color : 'white',
                            textAlign: 'center',
                            width: 300,
                        }}>
                            Menu Makanan Spesial Nasi
                        </Text>
                    </View>
            </TouchableOpacity>
        </View>
    );
}

const Stack = createStackNavigator();

const Home = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="BasicFlatListData" component={BasicFlatListData} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default Home;