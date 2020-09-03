import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import TabNavigator from './TabNavigation';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen
},
{
  mode: 'modal'
});

export default createAppContainer(TabNavigator);
