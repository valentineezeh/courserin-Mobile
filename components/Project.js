import React from 'react'
import {
  Animated, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StatusBar, 
  View,
  Text as Txt
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { CancelIcon } from './Icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 83;

const mapStateToProps = (state) => ({
  action: state.action
})

const mapDispatchToProps = (dispatch) => {
  return {
    openCard: () => dispatch({
      type: 'OPEN_CARD'
    }),
    closeCard: () => dispatch({
      type: 'CLOSE_CARD'
    })
  }
}

class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100),
  }

   openCard = () => {
     if (!this.props.canOpen) return;

    Animated.spring(this.state.textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start()

    Animated.spring(this.state.cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.state.cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.state.titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
    this.props.openCard()
  }

  closeCard = () => {
    console.log('see me here oooooo');
    Animated.spring(this.state.cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.state.cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.state.titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.state.textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start()

    StatusBar.setHidden(false);
    this.props.closeCard()
  }

  render() {
    return (
      <TouchableOpacity 
        activeOpacity={1.0} 
        onPress={this.openCard}
        >
        <AnimatedContainer 
        style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
        }}
      >
        <Cover>
          <Image source={this.props.image} />
          <AnimatedTitle 
          style={{
            top: this.state.titleTop
          }}
          >
          {this.props.title}
          </AnimatedTitle>
          <Author>{this.props.author}</Author>
        </Cover>
        <AnimatedText
          style={{ height: this.state.textHeight }}
          >
            {this.props.text}
          </AnimatedText>

          <AnimatedLinearGradient 
            colors={[
              "rgba(255, 255, 255, 0)",
              'rgba(255, 255, 255, 1)'
            ]}
            style={{
              position: 'absolute',
              top: 330,
              width: '100%',
              height: this.state.textHeight
            }}
          />

        <TouchableOpacity 
          onPress={this.closeCard}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <AnimatedCloseView style={{
            opacity: this.state.opacity
          }}>
            <CancelIcon />
          </AnimatedCloseView>
        </TouchableOpacity>

      </AnimatedContainer>
    </TouchableOpacity>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CloseView = styled.View`
  width: 35px;
  height: 35px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Container = styled.View`
  width: 80%;
  height: 400px;
  border-radius: 14px;
  background-color: white;
  box-shadow:  0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
 height: 290px;
 overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title)

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560
`
const AnimatedText = Animated.createAnimatedComponent(Text)