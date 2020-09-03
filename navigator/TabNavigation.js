import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import { Ionicons } from '@expo/vector-icons';
import CoursesScreen from '../screens/CoursesScreen';
import ProjectsScreen from '../screens/ProjectsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen,
},
{
  mode: 'modal'
})

const activeColor = "#4775f2";
const inactiveColor = '#b8bece';

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === 'Section') {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Ionicons 
        name="ios-home" 
        size={26} 
        color={
        focused ? activeColor : inactiveColor
        } 
      />
    ) 
  }
}

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
})

CoursesStack.navigationOptions = {
  tabBarLabel: 'Course',
  tabBarIcon: ({ focused }) => (
    <Ionicons 
      name="ios-albums" 
      size={26} 
      color={
      focused ? activeColor : inactiveColor
      } 
    />
  )
}

const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen
})

ProjectsStack.navigationOptions = {
  tabBarLabel: 'Project',
  tabBarIcon: ({ focused }) => (
    <Ionicons 
      name="ios-folder" 
      size={26} 
      color={
      focused ? activeColor : inactiveColor
      } 
    />
  )
}

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectsStack,
});

export default TabNavigator;