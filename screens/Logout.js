import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import imageExample from '../assets/image/chrome.png';

export default function Logout() {

    return (
        <View style={styles.container}>
            <View
                style={{ backgroundColor: '#00d6d6', height: 24, marginBottom: 20 }}
            />

            <View style={styles.modal}>
                <Text style={{ alignSelf: 'center', color: 'black', fontSize: 24, paddingBottom: 20 }}>Sure,you want to log out?</Text>
                <View style={styles.buttonWrap}>
                    <Button title='No' color='red' style={styles.Button}></Button>
                    <Button title='Yes' color='#00d6d6'></Button>
                </View>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    buttonWrap: {
        alignItems: 'center',
    },
    Button: {
        borderColor: '#00d6d6',
        borderWidth: 1,
        borderStyle: 'solid',
        color: 'red'
    }
});
