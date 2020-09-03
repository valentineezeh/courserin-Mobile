import React from 'react';
import styled from 'styled-components';

const Card = props => (
  <Container style={{ elevation: 10 }}>
    <Cover>
      <Image source={props.image} />
      <Title>{props.title}</Title>
    </Cover>
    <Content>
      <Logo source={props.logo} />
      <Wrapper>
        <Caption>{props.caption}</Caption>
        <Subtitle>{props.subtitle}</Subtitle>
      </Wrapper>
    </Content>
  </Container>
);

export default Card;

const Content = styled.View`
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  height: 80px;
`

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 4px;
`

const Wrapper = styled.View`
  margin-left: 10px;
`

const Container = styled.View`
  background: white;
  ${'' /* min-width: 315px; */}
  ${'' /* width: 30%; */}
  height: 280px;
  border-radius: 14px;
  margin: 20px 5px;
  ${'' /* margin-left: 20px;
  margin-top: 20px; */}
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  width: 170px;
`