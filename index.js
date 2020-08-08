/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import Home from './components/home';

AppRegistry.registerComponent(appName, () => Home);
