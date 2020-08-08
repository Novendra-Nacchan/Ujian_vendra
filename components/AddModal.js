import React, {Component} from 'react';
import {
    View,
    AppRegistry,
    FlatList,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');

export default class AddModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            newFoodName : '',
            newFoodDescription: '',
            newFoodImage: '',
        };
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }

    render(){
        return (
            <Modal 
            ref={"myModal"}
            style={{
                justifyContent: 'center',
                borderRadius: Platform.OS === 'android' ? 30 : 0,
                shadowRadius: 10,
                width: screen.width - 80,
                height: 280,
                backgroundColor: '#fc5c65'
            }}
            position= 'center'
            backdrop={true}
            onClosed={() => [
                // alert('Modal Tertutup Sob')
            ]}
            >
                <Text 
                style={{
                    textAlign: 'center', 
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}
                    >Tambahkan Makanan</Text>
                    <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }}
                    onChangeText={(text) => this.setState({newFoodName: text})} 
                    placeholder= "Tambahkan makanan Baru"
                    value= {this.state.newFoodName}
                    />

                    <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }}
                    onChangeText={(text) => this.setState({newFoodDescription: text})} 
                    placeholder= "Tambahkan Deksripsi"
                    value= {this.state.newFoodDescription}
                    />

                    <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }}
                    onChangeText={(text) => this.setState({newFoodImage: text})} 
                    placeholder= "Tambahkan Gambar"
                    value= {this.state.newFoodImage}
                    />

                    <Button
                    style={{
                        fontSize: 18,
                        color: 'white'
                    }}
                    containerStyle = {{
                        marginTop: 8,
                        padding : 8,
                        height: 40,
                        borderRadius: 6,
                        marginLeft: 70,
                        marginRight: 70,
                        backgroundColor: '#2d98da'
                    }}
                    onPress={() => {
                        if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0){
                            alert("Form Belum Di Input");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newFood = {
                            key: newKey,
                            name: this.state.newFoodName,
                            imageUrl: this.state.newFoodImage,
                            description: this.state.newFoodDescription
                        };
                        flatListData.push(newFood);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        this.refs.myModal.close();
                    }}
                    >
                        Save
                    </Button>
            </Modal>
        )
    }
}

