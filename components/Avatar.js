import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = (dispatch) => ({
  updatedName: name => dispatch({
    type: 'UPDATED_NAME',
    name,
  })
})

class Avatar extends Component {
  state = {
    photo: 'https://share.getcloudapp.com/12uJgEGK'
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
    .then( response => response.json())
    .then( response => {
      this.setState({
        photo: response.results[0].picture.thumbnail
      })
      // console.log('response.result[0].name.first :>> ', response.results[0].name.first);
      this.props.updatedName(`${response.results[0].name.first} ${response.results[0].name.last}`)
    })
  }
  render() {
    return (
      <Image source={{ uri: this.state.photo }}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`
