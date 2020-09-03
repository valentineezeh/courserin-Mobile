import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';

const initialState = {
  action: '',
  name: '',
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CLOSE_MENU':
      return {
        action: 'closeMenu'
      }
    case 'OPEN_MENU':
      return {
        action: 'openMenu'
      }
    case 'UPDATED_NAME':
      return {
        name:   action.name
      }
    case 'OPEN_CARD':
      return {
        action: 'openCard'
      }
    case 'CLOSE_CARD':
      return {
        action: 'closeCard'
      }
    case 'OPEN_LOGIN':
      return {
        action: 'openLogin'
      }
    case 'CLOSE_LOGIN':
      return {
        action: 'closeLogin'
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

export default App;