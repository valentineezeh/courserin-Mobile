import React, { Component } from 'react'
import styled from 'styled-components';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';
import SuccessLoader from './Success';
import Loader from './Loader';

const screenHeight = Dimensions.get('window').height;

const mapStateToProps = state => ({
  action: state.action,
})

const mapDispatchToProps = (dispatch) => {
  return {
    closeLogin: () => dispatch({
      type: 'CLOSE_LOGIN'
    })
  }
}

class ModalLogin extends Component {
  state = {
    email: '',
    password: '',
    iconEmail: require('../assets/icon-email.png'),
    iconPassword: require('../assets/icon-password.png'),
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  }

  componentDidUpdate = () => {
    // To open the modal
    if (this.props.action === 'openLogin') {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.spring(this.state.scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }

    // To close the modal
    if (this.props.action === 'closeLogin') {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0,
          useNativeDriver: false,
        }).start();
  
        Animated.spring(this.state.scale, {
          toValue: 1.3,
          useNativeDriver: false,
        }).start();
      }, 500)

      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500, // this is for half a seconds
        useNativeDriver: false,
      }).start();
    }
  }

  handleLogin = () => {
    const {
      email,
      password
    } = this.state;
    this.setState({
      isLoading: true
    })

    setTimeout(() => {
      this.setState({
        isLoading: false,
        isSuccessful: true
      })
      Alert.alert('Congrats', 'You have successfully log in');

      setTimeout(() => {
        this.props.closeLogin();
        this.setState({ isSuccessful: false })
      }, 1000)
    }, 2000)
  }

  focusEmail = () => {
    this.setState({
      iconPassword: require('../assets/icon-password.png'),
      iconEmail: require('../assets/icon-email-animated.gif'),
    })
  }

  focusPassword = () => {
    this.setState({
      iconEmail: require('../assets/icon-email.png'),
      iconPassword: require('../assets/icon-password-animated.gif'),
    })
  }

  tapBackground = () => {
    Keyboard.dismiss()
    this.props.closeLogin()
  }

  render() {
    const {
      iconEmail,
      iconPassword,
      isSuccessful,
      isLoading
    } = this.state;
    return (
      <AnimatedContainer
        style={{
          top: this.state.top
        }}
      >
      <TouchableWithoutFeedback 
        onPress={this.tapBackground}
        >
        <BlurView 
          tint='default'
          intensity={100}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        />
      </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
          >
          <Logo source={require('../assets/logo-dc.png')} />
          <Text>Start Learning. Access Pro Content</Text>
          <TextInput 
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={
              email => this.setState({ email })
            }
            onFocus={this.focusEmail}
          />
          <TextInput 
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={
              password => this.setState({ password })
            }
            onFocus={this.focusPassword}
          />
          <IconEmail 
            source={iconEmail} 
          />
          <IconPassword
            source={iconPassword}
            />
        <TouchableOpacity 
          onPress={this.handleLogin}
          >
          <Button>
            <ButtonText>Log In</ButtonText>
          </Button>
        </TouchableOpacity>
        </AnimatedModal>
        <SuccessLoader 
          isActive={isSuccessful}
        />
        <Loader 
          isActive={isLoading}
        />
      </AnimatedContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`

const IconEmail = styled.Image`
  position: absolute;
  top: 179px;
  left: 31px;
  width: 24px;
  height: 16px;
`

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.75);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0,0,0, 0.15);
  align-items: center;
`

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
  text-transform: uppercase;
`
