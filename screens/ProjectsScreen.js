import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PanResponder,Animated } from 'react-native';
import Project from '../components/Project';
import { projectsObject } from '../helpers/utils';

const getNextCard = index => {
  const nextIndex = index + 1;
  if (nextIndex > projectsObject.length - 1) {
    return 0;
  }
  return nextIndex;
}

const mapStateToProps = state => ({
  action: state.action
})

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0),
  }

  UNSAFE_componentWillMount () {
    this.panResponder = PanResponder.create({
      // enabling the moving of the card
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState
        if (dx === 0 && dy === 0) {
          return false
        } else {
          if (this.props.action === 'openCard') {
            return false
          } 
          return dx > 2 || dx < -2 || dy > 2 || dy < -2
        }
        
      },

      // Creating card scales on response
      onPanResponderGrant: () => {
        // scaling and dragging the second card
        Animated.spring(this.state.scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();

        Animated.spring(this.state.translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        // scaling and dragging the third card
        Animated.spring(this.state.thirdScale, {
          toValue: 0.9,
          useNativeDriver: true, 
        }).start();

        Animated.spring(this.state.thirdTranslateY, {
          toValue: 44,
          useNativeDriver: true, 
        }).start();

        // background animation while card is dragged
        Animated.timing(this.state.opacity, {
          toValue: 1,
          useNativeDriver: true, 
        }).start()
      },

      // The direction to move the card base on event
      onPanResponderMove: Animated.event([
        null,
  {
    dx: this.state.pan.x,
    dy: this.state.pan.y
  },
]
),

  // return the card to the original position on release
  onPanResponderRelease: () => {
    // Get the position of the card in numbers
    const positionY = this.state.pan.y.__getValue()

    // on releasing the card change the opacity back to the initial background
    Animated.timing(this.state.opacity, {
      toValue: 0,
      useNativeDriver: true, 
    }).start()
    
    // if the number is greater than 200 drop the card or take it away from the screen
    if (positionY > 200) {
      Animated.timing(this.state.pan, {
        toValue: {
          x: 0,
          y: 1000
        },
        useNativeDriver: true,
      }).start(() => {
        // repositioning the first card
        this.state.pan.setValue({ x: 0, y: 0 });

        // repositioning the second card to the position of the first
        this.state.scale.setValue(0.9);
        this.state.translateY.setValue(44);

        // repositioning the third card
        this.state.thirdScale.setValue(0.8);
        this.state.thirdTranslateY.setValue(-50)

        // set the index in the cards
        this.setState({ index: getNextCard(this.state.index) });
      })
    } else {
      // return all cards to the original position
      Animated.spring(this.state.pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: true,
      }).start();
      
      Animated.spring(this.state.scale, {
        toValue: 0.9,
        useNativeDriver: true
      }).start()
      
      Animated.spring(this.state.translateY, {
        toValue: 44,
        useNativeDriver: true 
      }).start()

      // changing it back to the second card measurement
      Animated.spring(this.state.thirdScale, {
        toValue: 0.8,
        useNativeDriver: true, 
      }).start();

      Animated.spring(this.state.thirdTranslateY, {
        toValue: -50,
        useNativeDriver: true, 
      }).start();
    } 
  }
    })
  }

  render () {
    return (
    <Container>
    <AnimateMask
      style={{
        opacity: this.state.opacity
      }}
    />
    {/* ============================================= */}
      <Animated.View
        style={{
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y }
          ]
        }}
        { ...this.panResponder.panHandlers }
      >
      
        <Project 
          title={projectsObject[this.state.index].title}
          image={projectsObject[this.state.index].image}
          author={projectsObject[this.state.index].author}
          text={projectsObject[this.state.index].text}
          canOpen={true}
        />
      
      </Animated.View>

      {/* ======================================= */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            { scale: this.state.scale },
            { translateY: this.state.translateY }
          ]
        }}
       >
        <Project 
          title={projectsObject[getNextCard(this.state.index)].title}
          image={projectsObject[getNextCard(this.state.index)].image}
          author={projectsObject[getNextCard(this.state.index)].author}
          text={projectsObject[getNextCard(this.state.index)].text}
        />
      </Animated.View>
      {/* ============================== */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            { scale: this.state.thirdScale },
            { translateY: this.state.thirdTranslateY }
          ]
        }}
       >
      <Project 
          title={projectsObject[getNextCard(this.state.index + 1)].title}
          image={projectsObject[getNextCard(this.state.index + 1)].image}
          author={projectsObject[getNextCard(this.state.index + 1)].author}
          text={projectsObject[getNextCard(this.state.index + 1)].text}
        />
      </Animated.View>
    </Container>
    )
  }
}

export default connect(mapStateToProps, null)(ProjectsScreen);

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3
`

const AnimateMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
  width: 100%
`

const Text = styled.Text`

`