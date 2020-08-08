import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, FlatList, Image, Button, Modal, TouchableOpacity, Alert, Platform, TouchableHighlight} from 'react-native';
import flatListData from '../data/flatListData';
import Header from '../data/header';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';
import 'react-native-gesture-handler';


class FlatListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0
        };
    }
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }
    render() {
        const swipesettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null){
                    this.setState({activeRowKey: null});
                }

            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key})
            },
            right: [
                {
                    onPress: () =>{
                        //alert("update");
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index],this);
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deleteingRow = this.state.activeRowKey;
                        Alert.alert (
                            'alert',
                            'apakah kamu yakin ingin menghapus ?', 
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text : 'Yes', onPress: () => {
                                flatListData.splice(this.props.index, 1);
                                this.props.parentFlatList.refreshFlatList(deleteingRow)
                            }},
                        ],
                        {cancelable: true}
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            left: [
                {
                    onPress: () => {
                        Alert.alert (
                            'alert',
                            'apakah kamu yakin ingin menambahkan ?', 
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text : 'Yes', onPress: () => {
                                flatListData.splice(this.props.index, 1);
                                
                            }},
                        ],
                        {cancelable: true}
                        )
                    },
                    text: 'Add', type: 'primary'
                }
            ],
            rowId: this.props.index,
        };  
        return (
            <Swipeout {...swipesettings}>
               <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>    
            <View style={{
                flex:1,
                flexDirection: 'row',
                //backgroundColor: this.props.index % 2 == 0 ? 'blue' : 'green'
                backgroundColor: 'skyblue'
            }}>
                <Image 
                source ={{uri:this.props.item.imageUrl}}
                style={{width:100, height:100, margin:5}}>
                    </Image>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        height: 100
                    }}>
                <Text style={styles.flatListItem}>{this.props.item.name}</Text>           
                <Text style={styles.flatListItem}>{this.props.item.description}</Text>
            </View>
            </View>
            <View style={{
                height: 1,
                backgroundColor: 'black'
            }}>
            </View>
            </View>  
            </Swipeout>
           
        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 20
    }
    
    });


export default class BasicFlatListData extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
        });
        this._onPressAdd=this._onPressAdd.bind(this);
    }
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd (){
        //alert("Berhasil Ditambah");
        this.refs.addModal.showAddModal();
        //this.refs.editModal.showEditModal();
    }
    render(){
        return (
            <View style={{flex:1, marginTop: Platform.OS === 'android' ? 34 : 0 }}>
                <Header />
                <View style={{
                    backgroundColor: 'skyblue',
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'

                }} >
                    <TouchableHighlight
                    style={{marginRight: 10}}
                    underlayColor= 'skyblue'
                    onPress={this._onPressAdd}
                    >
                        <Image
                        style={{width: 35, height: 35}}
                        source={require('../icons/add.png')}
                        />

                        

                    </TouchableHighlight>

                </View>
                <FlatList
                ref={"flatList"}
                data={flatListData}
                renderItem={({item, index}) => {
                    return (
                        <FlatListItem item={item} index={index} parentFlatList={this}>

                        </FlatListItem>
                    );
                }}
                >
                    
                </FlatList> 
                <AddModal ref={'addModal'} parentFlatList={this}>

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>

                </EditModal>
            </View>
        )
    }
}



