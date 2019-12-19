/**
 * @author: Nguyen Quoc Trung - email: johniusnguyen22297@gmail.com
 */

import './src/configs/ReactotronConfig';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
