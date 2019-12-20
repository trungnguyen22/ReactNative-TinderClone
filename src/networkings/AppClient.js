import {Platform} from 'react-native';
import _ from 'lodash';
import AxiosClient from './AxiosClient';
import Person from '../models/Person';

const axiosClient = AxiosClient.shared();

class AppClient {
  static userID = '';
  static userAccessToken = '';
  static defaultParams = {};

  static setup(userID, userAccessToken) {
    AppClient.userID = userID;
    AppClient.userAccessToken = userAccessToken;
    AppClient.defaultParams = {
      accessToken: AppClient.userAccessToken,
      os: Platform.OS,
    };
  }

  static sendAxiosRequest(
    axiosData,
    startRequest = () => {},
    endRequest = () => {},
  ) {
    return new Promise((resolve, reject) => {
      startRequest();
      axiosClient(axiosData)
        .then(
          response => {
            resolve(response);
          },
          error => {
            console.tron.log('An error occurred.', error.message);
            reject(error);
          },
        )
        .finally(endRequest());
    });
  }

  static sendFetchRequest(
    url,
    options = {},
    startRequest = () => {},
    endRequest = () => {},
  ) {
    return new Promise((resolve, reject) => {
      startRequest();
      fetch(url, {...options})
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        })
        .finally(endRequest());
    });
  }

  static getRandomPerson() {
    const axiosData = {method: 'get', randomapi: ''};
    const successCallback = response => {
      if (response.status !== 200) {
        return null;
      }
      const person = Person.toObjectFromJSON(response.data.results[0]);
      return person;
    };
    return this.sendAxiosRequest(axiosData).then(successCallback);
  }
}

export default AppClient;
