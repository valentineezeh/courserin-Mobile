import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform
} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Card from '../components/Card';
import { NotificationIcon } from '../components/Icons';
import Logo from '../components/Logo';
import {
  logosObject,
  cardsObject,
  coursesObject
} from '../helpers/utils';
import CourseCard from '../components/Courses';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';
import ModalLogin from '../components/ModalLogin';

const mapStateToProps = state => ({
  action: state.action,
  name: state.name,
});

const mapDispatchToProps = dispatch => ({
  openMenu: () => dispatch({
    type: 'OPEN_MENU'
  }),
  openLogin: () => dispatch({
    type: 'OPEN_LOGIN'
  })
})


class HomeScreen extends React.Component  {
  static navigationOptions = {
    headerShown: false,
  }

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark -content', true);
    if (Platform.OS == 'android') StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: true
      }).start();

      StatusBar.setBarStyle('light-content', true);
    }
    if (this.props.action === 'closeMenu') {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      StatusBar.setBarStyle('dark -content', true);
    }
  }
  render () {
    return (
      <RootView>
      <Menu />
      <AnimatedContainer style={{ 
        transform: [{
        scale: this.state.scale
      }],
        opacity: this.state.opacity,
       }}>
      <SafeAreaView>
        <ScrollView style={{ height: '100%', width: '100%' }}>
          <TitleBar>
            <TouchableOpacity 
            onPress={this.props.openLogin}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            >
            <Avatar />
            </TouchableOpacity>
            <Title>Welcome Back</Title>
            <Name>{this.props.name}</Name>
            <NotificationIcon
              style={{ position: "absolute", right: 20, top: 5 }}
            />
          </TitleBar>
          <ScrollView 
            style={{
              flexDirection: 'row',
              padding: 20,
              paddingLeft: 12, 
              paddingTop: 30,
              }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
            
            {
              logosObject.map((logo, index) => (
                <Logo 
                  key={index}
                  image={logo.image}
                  text={logo.text}
            />
              ))
            }
          </ScrollView>
          <Subtitle>Continue Learning</Subtitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // style={{ padding: 10 }}
          >
          {
            cardsObject.map((i, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => {
                  this.props.navigation.push('Section', {
                    section: i
                  })
                }}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <Card
                  image={i.image}
                  title={i.title}
                  subtitle={i.subtitle}
                  caption={i.caption}
                  logo={i.logo}
                  content={i.content}
                />
              </TouchableOpacity> 
            ))
          }
          </ScrollView>
          <CourseSubtitle>Popular Courses</CourseSubtitle>
          <CoursesContainer>
          {
            coursesObject.map((i, index) => (
              <CourseCard 
                key={index}
                image={i.image} 
                title={i.title}
                subtitle={i.subtitle}
                teacherImage={i.teacherImage}
                courseOverView={i.courseOverView}
                courseHandler={i.courseHandler}
                logo={i.logo}
          />
            ))
          }
          </CoursesContainer>
        </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <ModalLogin />
      </RootView>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px
`;

const RootView = styled.View`
  background: black;
  flex: 1;
  width: 100%;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`

const Container = styled.View`
flex: 1;
background-color: #f0f3f5;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
`

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`

const CourseSubtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 40px;
  text-transform: uppercase;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container);
