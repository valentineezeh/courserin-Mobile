import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

console.log('screenWidth :>> ', screenWidth);

const getCourseWidth = screenWidth => {
  let cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    console.log('i got here ooo');
    cardWidth = (screenWidth - 60) / 2
  }

  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

class CourseCard extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.adaptLayout)
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    })
  }

  render () {
    return (
      <Container style={{ width: this.state.cardWidth }}>
    <Cover>
      <Image source={this.props.image} />
      <Title>{this.props.title}</Title>
      <Logo source={this.props.logo} />
      <Subtitle>{this.props.subtitle}</Subtitle>
    </Cover>
    <Content>
        <TeacherImg source={this.props.teacherImage} />
        <Wrapper>
        <Caption>{this.props.courseOverView}</Caption>
        <SubCaption>{this.props.courseHandler}</SubCaption>
        </Wrapper>
      </Content>
  </Container>
    )
  }
}

export default CourseCard;

const Content = styled.View`
  flex-direction: row;
  padding-left: 20px;
  align-items: center;
  height: 80px;
`

const Container = styled.View`
  background: white;
  height: 370px;
  border-radius: 14px;
  margin: 10px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

const Cover = styled.View`
  width: 100%;
  height: 270px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%
  position: absolute;
  top: 0;
  left: 0;
`

const Title = styled.Text`
  color: #b8bece;
  font-size: 20px;
  font-weight: bold;
  margin-top: 150px;
  margin-left: 20px;
  width: 170px;
  text-transform: uppercase;
`

const TeacherImg = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 20px;
`

const Wrapper = styled.View`
  margin-left: 10px;
  width: 80%
`

const Caption = styled.Text`
  color: #3c4560;
  font-size: 16px;
  font-weight: 600;
`

const Subtitle = styled.Text`
  color: white;
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 600;
  font-size: 24px;
  width: 170px
`

const SubCaption = styled.Text`
  font-size: 16px;
  color: #b8bece
`

const Logo = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -15px;
`