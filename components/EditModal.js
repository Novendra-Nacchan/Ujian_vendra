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

export default class EditModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            foodName : '',
            foodDescription: '',
            foodImage: ''
        };
    }

    showEditModal = (editingFood, flatListItem) => {
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.description,
            foodImage: editingFood.imageUrl,
            flatListItem: flatListItem
        });
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
                    >Edit Makanan</Text>
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
                    onChangeText={(text) => this.setState({foodName: text})} 
                    placeholder= "Edit makanan Baru"
                    value= {this.state.foodName}
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
                    onChangeText={(text) => this.setState({foodDescription: text})} 
                    placeholder= "Edit Deksripsi"
                    value= {this.state.foodDescription}
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
                    onChangeText={(text) => this.setState({foodImage: text})} 
                    placeholder= "Edit Image"
                    value= {this.state.foodImage}
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
                        if(this.state.foodName.length == 0 || this.state.foodDescription.length == 0){
                            alert("Form Belum Di Input");
                            return;
                        }

                        // const newKey = this.generateKey(24);
                        // const newFood = {
                        //     key: newKey,
                        //     name: this.state.foodName,
                        //     imageUrl: "https://www.masakapahariini.com/wp-content/uploads/2018/04/cara-membuat-nasi-goreng-seafood-780x440.jpg",
                        //     description: this.state.foodDescription
                        // };
                        // flatListData.push(newFood);
                        // this.props.parentFlatList.refreshFlatList(newKey);
                        var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0) {
                            return;
                        }
                        flatListData[foundIndex].name = this.state.foodName;
                        flatListData[foundIndex].description = this.state.foodDescription;
                        flatListData[foundIndex].imageUrl = this.state.foodImage;
                        this.refs.myModal.close();
                    }}
                    >
                        Save
                    </Button>
            </Modal>
        )
    }
}

