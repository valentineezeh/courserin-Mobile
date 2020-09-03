import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { 
  TouchableOpacity, 
  StatusBar,
  Linking,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview'

class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render () {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    return (
    <ScrollView>
      <Container>
        <StatusBar hidden />
      <Cover>
        <Image source={section.image} />
        <Wrapper>
          <Logo source={section.logo} />
          <Subtitle>{section.subtitle}</Subtitle>
        </Wrapper>
        <Title>{section.title}</Title>
        <Caption>{section.caption}</Caption>
      </Cover>
      <TouchableOpacity style={{
        position: "absolute",
        top: 30,
        right: 20, 
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={() => {
        this.props.navigation.push('Home')
      }}
      >
        <CloseView>
          <Ionicons 
            name="ios-close"
            size={36}
            color='#4775f2'
            style={{
              marginTop: -2
            }}
            />
        </CloseView>
      </TouchableOpacity>
      <Content>
        <WebView 
         source={{ 
           html: section.content + htmlStyles
           }}
          style={{
          backgroundColor: 'transparent'
          }}
         scalesPageToFit={false}
         scrollEnabled={false}
         ref="webview"
         onNavigationStateChange={e => {
           if (e.url !== 'about:blank') {
             this.refs.webview.stopLoading();
             Linking.openURL(e.url)
           }
         }}
         />
      </Content>
      </Container>
      </ScrollView>
    )
  }
}

export default SectionScreen;

const htmlContent = `
  <h2> Building a react native application </h2>
  <p>This is a shot view of building a react native application. Building this application create great insight to application development. React-Native create a wide range of opportunities for development in creating mobile devices across diverse operating systems. </p> </br>

  <h2>Download Links</h2>
  <p>Fell free to use your own designs and apply your own styling. You can also use my design if you wish to follow exactly what i have. You can access</p>
  <p>This is a <a href="http://designcode.io">link</a></p> 
  <img src="https://i.ibb.co/GshrCG4/cool-background.png" />
`;

const htmlStyles = `
  <style>
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: normal;
      color: #3c4560;
      line-height: 30px;
    }

    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 30px;
    }

    p {
      margin-top: 20px;
    }

    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }

    img {
      width: 100%;
      border-radius: 20px;
      position: relative;
      top: 15;
      font-size: 20px;
    }
  </style>
`

const Content = styled.View`
  height: 1000px;
  ${'' /* width: 100%; */}
  padding: 20px;
`

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`
const Logo = styled.Image`
  width: 24px;
  height: 24px
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  height: 24px;
  margin-left: 5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8)
`

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  flex: 1;
`

const Cover = styled.View`
  height: 375px;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`
