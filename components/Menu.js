import React from 'react';
import styled from 'styled-components';
import {
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { CancelIcon } from './Icons';
import MenuItem from './MenuItems';
import { menuIconItems } from '../helpers/utils';

const screenWidth = Dimensions.get('window').width;

let cardWidth = screenWidth;

if (screenWidth > 500) {
  cardWidth = 500;
}


const mapStateToProps = state => ({
  action: state.action
})

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch({
    type: 'CLOSE_MENU'
  })
})

const screenHeight = Dimensions.get('window').height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  }

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    // open menu
    if (this.props.action === 'openMenu') {
      Animated.spring(this.state.top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }

    // closes menu
    if (this.props.action === 'closeMenu') {
      Animated.spring(this.state.top, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../assets/background2.jpg')} />
          <Title>Valentine Ezeh</Title>
          <Subtitle>Designer at Design+Code</Subtitle>
        </Cover>
        <TouchableOpacity 
          onPress={this.props.closeMenu}
          style={{
            position: 'absolute',
            top: 120,
            left: '50%',
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <CloseView>
            <CancelIcon />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {
            menuIconItems.map((item, index) => (
              <MenuItem 
                key={index}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            ))
          }
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth};
  align-self: center;
  height: 100%
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600
`

const Subtitle = styled.Text`
  font-size: 14px;
  color: rgba(225,225, 225, 0.5);
  margin-top: 8px;
`
