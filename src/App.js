/**
 * @author: Nguyen Quoc Trung - email: johniusnguyen22297@gmail.com
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './redux/store';

import MainScreen from './screens/Root/MainScreen';
import {commonStyles} from './theme';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={commonStyles.container}>
            <MainScreen />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
