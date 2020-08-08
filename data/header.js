import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Header(){
    return(
<View style={styles.header}>
<Text style={styles.title}>Menu Makanan</Text>
</View>

    )
}
const styles = StyleSheet.create({
header: {
    height: 80,
    paddingTop: 30,
    backgroundColor: 'black',

},
title: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'vicHand'
}
});